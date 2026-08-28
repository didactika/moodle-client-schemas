import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);
const IGNORED_DIRS = [
    'node_modules', 'vendor', '.git', 'tests', 'fixtures',
    'cache', 'localcache', 'pix', 'theme', 'lang', 'install'
];

/**
 * Builds the find command with directory pruning and non-empty file filters.
 *
 * @param {string} basePath - Base directory to start searching from.
 * @param {string[]} pathPatterns - Array of path glob patterns.
 * @param {string[]} ignoredDirs - List of directory names to prune.
 * @returns {string} Formatted find command string.
 */
function buildFindCommand(
    basePath: string,
    pathPatterns: string[],
    ignoredDirs: string[]
): string {
    const pruneCondition = ignoredDirs.length > 0
        ? `-type d \\( ${ignoredDirs.map(dir => `-name "${dir}"`).join(' -o ')} \\) -prune -o `
        : '';

    const pathConditions = pathPatterns
        .map(pathPattern => `-path "${pathPattern}"`)
        .join(' -o ');

    return `find ${basePath} ${pruneCondition}-type f \\( ${pathConditions} \\) ! -empty -print`;
}

/**
 * Executes the shell command asynchronously and filters non-empty lines.
 *
 * @param {string} command - Shell command string to execute.
 * @returns {Promise<string[]>} Array of found non-empty file paths.
 */
async function executeCommand(command: string): Promise<string[]> {
    try {
        const { stdout } = await execAsync(command);
        return stdout.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error('Error during file scanning phase:', error);
        return [];
    }
}

/**
 * Scans for non-empty files in filesystem matching path pattern while ignoring specified directories.
 *
 * @param {string} basePath - Base directory path to scan.
 * @param {string[]} pathPatterns - Array of path patterns.
 * @param {string[]} [ignoredDirs=IGNORED_DIRS] - Directories to prune from search.
 * @returns {Promise<string[]>} List of discovered file paths.
 */
export async function findFiles(
    basePath: string,
    pathPatterns: string[],
    ignoredDirs: string[] = IGNORED_DIRS
): Promise<string[]> {
    const command = buildFindCommand(basePath, pathPatterns, ignoredDirs);
    return executeCommand(command);
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
