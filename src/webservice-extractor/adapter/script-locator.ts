import fs from 'fs';
import path from 'path';

/**
 * Searches candidate locations and returns the first existing path.
 *
 * @param {string[]} candidates - Array of possible filesystem paths.
 * @returns {string | null} First existing path or null.
 */
function findExistingPath(candidates: string[]): string | null {
    for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }
    return null;
}

/**
 * Resolves the absolute path of a PHP adapter script across source and dist builds.
 *
 * @example
 * ```ts
 * resolveAdapterScript('batch-cli-executor.php');
 * ```
 *
 * @param {string} scriptName - Script file name inside src/php-adapter.
 * @returns {string} Absolute path to the script.
 */
export function resolveAdapterScript(scriptName: string): string {
    const fallback = path.resolve(__dirname, '../src/php-adapter', scriptName);
    const candidates = [
        fallback,
        path.resolve(__dirname, '../../php-adapter', scriptName),
        path.resolve(__dirname, './src/php-adapter', scriptName),
        path.resolve(__dirname, 'php-adapter', scriptName)
    ];
    return findExistingPath(candidates) ?? fallback;
}
