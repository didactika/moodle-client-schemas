import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import pLimit from 'p-limit';

const execAsync = promisify(exec);
const DEFAULT_CONCURRENCY = 2;

/**
 * Clones a specific version of Moodle repository to a local directory.
 *
 * @param {string} version - The version string (e.g. '4.5').
 * @returns {Promise<string>} The path where the version repository was cloned.
 */
export async function cloneMoodleVersion(version: string): Promise<string> {
    const expectedPath = `./src/tmp/moodle/v/${version}`;

    const parentDir = path.dirname(expectedPath);
    if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
    }

    await execAsync(
        `git clone --depth 1 --branch v${version}.0 https://github.com/moodle/moodle.git ${expectedPath}`
    );

    return expectedPath;
}

/**
 * Clones multiple versions in batch with concurrency control.
 *
 * @param {string[]} versions - Array of version strings (e.g. ['4.5', '4.4']).
 * @param {number} [concurrency=DEFAULT_CONCURRENCY] - Maximum concurrent clone operations.
 * @returns {Promise<string[]>} Array of paths where the repositories were cloned.
 */
export async function cloneMoodleVersionsInBatch(
    versions: string[],
    concurrency: number = DEFAULT_CONCURRENCY
): Promise<string[]> {
    const limit = pLimit(concurrency);
    const promises = versions.map((version) => {
        return limit(() => cloneMoodleVersion(version));
    });

    return Promise.all(promises);
}