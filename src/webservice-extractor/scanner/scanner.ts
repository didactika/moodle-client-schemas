import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);
const IGNORED_DIRS = [
    'backup', 'cache', 'calendar', 'cohort', 'comment', 'competency',
    'completion', 'group', 'install', 'iplookup', 'login', 'my',
    'notes', 'privacy', 'tag', 'lang', 'pix', 'theme', 'vendor',
    'node_modules', 'tests'
];

/**
 * Builds the find command with directory pruning and non-empty file filters.
 *
 * @param {string} basePath - Base directory to start searching from.
 * @param {string} pathPattern - Relative path pattern to match (e.g. '&#42;/db/services.php').
 * @param {string[]} ignoredDirs - List of directory names to prune.
 * @returns {string} Formatted find command string.
 */
function buildFindCommand(basePath: string, pathPattern: string, ignoredDirs: string[]): string {
    const pruneCondition = ignoredDirs.length > 0
        ? `-type d \\( ${ignoredDirs.map(dir => `-name "${dir}"`).join(' -o ')} \\) -prune -o `
        : '';

    return `find ${basePath} ${pruneCondition}-type f -path "${pathPattern}" ! -empty -print`;
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
 * @param {string} [pathPattern='&#42;/db/services.php'] - Search path pattern (defaults to services.php).
 * @param {string[]} [ignoredDirs=IGNORED_DIRS] - Directories to prune from search.
 * @returns {Promise<string[]>} List of discovered file paths.
 */
export async function findFiles(
    basePath: string,
    pathPattern: string = '*/db/services.php',
    ignoredDirs: string[] = IGNORED_DIRS
): Promise<string[]> {
    const command = buildFindCommand(basePath, pathPattern, ignoredDirs);
    return executeCommand(command);
}
