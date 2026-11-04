import fs from 'fs/promises';
import { Dirent, Stats } from 'fs';
import path from 'path';
import { ScanContext, ScanEntryKind } from '../interfaces/scanner.interfaces';

/**
 * Directory names that never hold plugin definitions. 'theme' and 'cache' are deliberately absent:
 * they are plugin type roots (theme_*, cachestore_*, cachelock_*) whose plugins may declare services.
 */
export const DEFAULT_IGNORED_DIRS = [
    'node_modules', 'vendor', '.git', 'tests', 'fixtures',
    'localcache', 'pix', 'lang', 'install'
];

/**
 * Converts a glob-like path pattern to a cross-platform regular expression.
 *
 * @param {string} pattern - Path pattern (e.g. 'star/db/services.php').
 * @returns {RegExp} Compiled regular expression.
 */
function patternToRegex(pattern: string): RegExp {
    const normalized = pattern.replace(/\\/g, '/');
    const escaped = normalized
        .replace(/[.+^${}()|[\]]/g, '\\$&')
        .replace(/\*/g, '.*');
    return new RegExp(`(?:^|/)${escaped}$`);
}

/**
 * Checks if a relative or absolute path matches any of the compiled regex patterns.
 *
 * @param {string} targetPath - Path to test.
 * @param {RegExp[]} regexes - Array of compiled patterns.
 * @returns {boolean} True if any pattern matches.
 */
function matchesAnyPattern(targetPath: string, regexes: RegExp[]): boolean {
    const normalized = targetPath.replace(/\\/g, '/');
    return regexes.some(rx => rx.test(normalized));
}

/**
 * Reads directory entries safely, returning an empty array on error.
 *
 * @param {string} dir - Directory path to read.
 * @returns {Promise<Dirent[]>} Array of directory entries.
 */
async function readDirectoryEntries(dir: string): Promise<Dirent[]> {
    try {
        return await fs.readdir(dir, { withFileTypes: true });
    } catch {
        return [];
    }
}

/**
 * Checks if a candidate file matches the relative or absolute path patterns.
 *
 * @param {string} fullPath - Absolute path to file.
 * @param {string} basePath - Base directory path.
 * @param {RegExp[]} regexes - Compiled matching regular expressions.
 * @returns {boolean} True if matching.
 */
function isCandidateMatch(fullPath: string, basePath: string, regexes: RegExp[]): boolean {
    const relPath = path.relative(basePath, fullPath);
    return matchesAnyPattern(relPath, regexes) || matchesAnyPattern(fullPath, regexes);
}

/**
 * Checks if file exists and has size greater than zero.
 *
 * @param {string} fullPath - File path to inspect.
 * @returns {Promise<boolean>} True if non-empty.
 */
async function isNonEmptyFile(fullPath: string): Promise<boolean> {
    try {
        const stat = await fs.stat(fullPath);
        return stat.size > 0;
    } catch {
        return false;
    }
}

/**
 * Verifies file match and size, collecting non-empty matching files.
 *
 * @param {string} fullPath - Full file path.
 * @param {ScanContext} context - Scan state.
 */
async function verifyAndCollectFile(fullPath: string, context: ScanContext): Promise<void> {
    if (!isCandidateMatch(fullPath, context.basePath, context.regexes)) {
        return;
    }
    if (await isNonEmptyFile(fullPath)) {
        context.collected.push(fullPath);
    }
}

/**
 * Resolves the canonical location of a directory, or null when it cannot be resolved.
 *
 * @param {string} dir - Directory path, possibly reached through symlinks.
 * @returns {Promise<string | null>} Real path or null.
 */
async function resolveRealPath(dir: string): Promise<string | null> {
    try {
        return await fs.realpath(dir);
    } catch {
        return null;
    }
}

/**
 * Marks a directory as visited by its real path.
 * Returns false when it was already walked (symlink cycle or a second link to the same tree).
 *
 * @param {string} dir - Directory about to be walked.
 * @param {ScanContext} context - Scan state.
 * @returns {Promise<boolean>} True if the directory must be walked.
 */
async function claimDirectory(dir: string, context: ScanContext): Promise<boolean> {
    const realPath = await resolveRealPath(dir);
    if (!realPath || context.visitedDirs.has(realPath)) {
        return false;
    }
    context.visitedDirs.add(realPath);
    return true;
}

/**
 * Processes a directory entry recursively if not ignored.
 *
 * @param {string} fullPath - Directory path.
 * @param {string} entryName - Directory name.
 * @param {ScanContext} context - Scan state.
 */
async function processDirEntry(fullPath: string, entryName: string, context: ScanContext): Promise<void> {
    if (!context.ignoredSet.has(entryName)) {
        await scanDirectory(fullPath, context);
    }
}

/**
 * Reads the target type of a symbolic link, or null when the link is dangling.
 *
 * @param {string} fullPath - Symlink path.
 * @returns {Promise<Stats | null>} Target stats or null.
 */
async function statLinkTarget(fullPath: string): Promise<Stats | null> {
    try {
        return await fs.stat(fullPath);
    } catch {
        return null;
    }
}

/**
 * Classifies filesystem stats as a directory, a regular file, or something else.
 *
 * @param {Pick<Stats, 'isDirectory' | 'isFile'>} stats - Dirent or Stats object.
 * @returns {ScanEntryKind} Entry kind.
 */
function classifyStats(stats: Pick<Stats, 'isDirectory' | 'isFile'>): ScanEntryKind {
    if (stats.isDirectory()) {
        return 'directory';
    }
    return stats.isFile() ? 'file' : 'other';
}

/**
 * Resolves what an entry points to, following symbolic links
 * (e.g. a plugin symlinked from a development checkout). Dangling links resolve to 'other'.
 *
 * @param {Dirent} entry - Dirent entry.
 * @param {string} fullPath - Entry path.
 * @returns {Promise<ScanEntryKind>} Entry kind.
 */
async function resolveEntryKind(entry: Dirent, fullPath: string): Promise<ScanEntryKind> {
    if (!entry.isSymbolicLink()) {
        return classifyStats(entry);
    }
    const target = await statLinkTarget(fullPath);
    return target ? classifyStats(target) : 'other';
}

const ENTRY_HANDLERS: Record<ScanEntryKind, (fullPath: string, entryName: string, context: ScanContext) => Promise<void>> = {
    directory: processDirEntry,
    file: (fullPath, _entryName, context) => verifyAndCollectFile(fullPath, context),
    other: async () => undefined
};

/**
 * Dispatches file or directory processing for a single Dirent, following symbolic links.
 *
 * @param {Dirent} entry - Dirent entry.
 * @param {string} currentDir - Current directory.
 * @param {ScanContext} context - Scan state.
 */
async function processEntry(entry: Dirent, currentDir: string, context: ScanContext): Promise<void> {
    const fullPath = path.join(currentDir, entry.name);
    const kind = await resolveEntryKind(entry, fullPath);
    await ENTRY_HANDLERS[kind](fullPath, entry.name, context);
}

/**
 * Recursively scans directory and collects matching non-empty file paths.
 * Each directory is walked once by real path, so symlink cycles terminate.
 *
 * @param {string} currentDir - Current directory path.
 * @param {ScanContext} context - Scan state.
 */
async function scanDirectory(currentDir: string, context: ScanContext): Promise<void> {
    if (!(await claimDirectory(currentDir, context))) {
        return;
    }
    const entries = await readDirectoryEntries(currentDir);
    for (const entry of entries) {
        await processEntry(entry, currentDir, context);
    }
}

/**
 * Scans for non-empty files in filesystem matching path pattern while ignoring specified directories.
 * Symbolic links are followed (with cycle protection) and results keep their path under basePath.
 * Pure cross-platform Node.js implementation compatible with Windows, macOS, Linux, and WSL2.
 *
 * @param {string} basePath - Base directory path to scan.
 * @param {string[]} pathPatterns - Array of path patterns.
 * @param {string[]} [ignoredDirs=DEFAULT_IGNORED_DIRS] - Directories to prune from search.
 * @returns {Promise<string[]>} List of discovered file paths.
 */
export async function findFiles(
    basePath: string,
    pathPatterns: string[],
    ignoredDirs: string[] = DEFAULT_IGNORED_DIRS
): Promise<string[]> {
    const context: ScanContext = {
        basePath,
        regexes: pathPatterns.map(patternToRegex),
        ignoredSet: new Set(ignoredDirs),
        visitedDirs: new Set<string>(),
        collected: []
    };
    await scanDirectory(basePath, context);
    return context.collected;
}

/**
 * Discovers the first matching file for a relative target pattern across the base directory.
 *
 * @example
 * ```ts
 * await findFirstFile('/var/www/moodle', 'version.php');
 * ```
 *
 * @param {string} basePath - Directory to start search from.
 * @param {string} relativeTarget - Relative target file or path.
 * @returns {Promise<string | null>} First matched file path or null.
 */
export async function findFirstFile(
    basePath: string,
    relativeTarget: string
): Promise<string | null> {
    const patterns = [`*${relativeTarget}`, `*/${relativeTarget}`, `*/*/${relativeTarget}`];
    const results = await findFiles(basePath, patterns);
    if (results.length > 0) {
        return results[0];
    }
    return null;
}

/**
 * Finds the start character index of a function definition by name.
 *
 * @param {string} source - PHP source code.
 * @param {string} functionName - Target function name.
 * @returns {number} Start index or -1 if not found.
 */
function findFunctionStartIndex(source: string, functionName: string): number {
    const regex = new RegExp(`\\bfunction\\s+${functionName}\\s*\\(`, 'i');
    const match = regex.exec(source);
    return match ? match.index : -1;
}

/**
 * Computes the updated nesting brace depth for a single character.
 *
 * @param {string} char - Character to evaluate.
 * @param {number} depth - Current nesting depth.
 * @returns {number} Updated nesting depth.
 */
function updateBraceDepth(char: string, depth: number): number {
    if (char === '{') {
        return depth + 1;
    }
    if (char === '}') {
        return depth - 1;
    }
    return depth;
}

/**
 * Scans characters sequentially to identify matching closing brace index.
 *
 * @param {string} source - Source text.
 * @param {number} startIndex - Starting open brace index.
 * @returns {number} Closing brace index or -1 if unclosed.
 */
function findClosingIndex(source: string, startIndex: number): number {
    let depth = 0;
    for (let i = startIndex; i < source.length; i++) {
        depth = updateBraceDepth(source[i], depth);
        if (depth === 0) {
            return i;
        }
    }
    return -1;
}

/**
 * Extracts the function block string between its definition and terminating closing brace.
 *
 * @param {string} source - PHP source text.
 * @param {number} startIndex - Function keyword start index.
 * @returns {string | null} Function block or null if incomplete.
 */
function extractFunctionBlock(source: string, startIndex: number): string | null {
    const openIndex = source.indexOf('{', startIndex);
    if (openIndex === -1) {
        return null;
    }
    const closeIndex = findClosingIndex(source, openIndex);
    return closeIndex !== -1 ? source.slice(startIndex, closeIndex + 1) : null;
}

/**
 * Textually slices a PHP function from a large file and wraps it in standalone PHP tags.
 *
 * Prevents memory exhaustion when parsing massive legacy files (e.g. `lib/moodlelib.php`).
 *
 * @example
 * ```ts
 * const rawSnippet = await fs.readFile('lib/moodlelib.php', 'utf-8');
 * const trimmed = trimPhpFunction(rawSnippet, 'get_plugin_types');
 * // returns '<?php\nfunction get_plugin_types(...) { ... }\n'
 * ```
 *
 * @param {string} sourceCode - Raw PHP source code.
 * @param {string} functionName - Name of the PHP function to extract.
 * @returns {string | null} Sliced and wrapped PHP function code, or null if not found.
 */
export function trimPhpFunction(sourceCode: string, functionName: string): string | null {
    const startIndex = findFunctionStartIndex(sourceCode, functionName);
    if (startIndex === -1) {
        return null;
    }
    const block = extractFunctionBlock(sourceCode, startIndex);
    return block ? `<?php\n${block}\n` : null;
}
