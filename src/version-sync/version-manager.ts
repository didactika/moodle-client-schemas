import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Reads local schema files from the directory and extracts version strings.
 *
 * @param {string} [schemasDir='./schemas/v'] - Path to schemas directory.
 * @returns {Promise<string[]>} Array of local version strings.
 */
export async function getLocalVersions(schemasDir: string = './schemas/v'): Promise<string[]> {
    const files = await fs.readdir(schemasDir);
    const jsonFiles = files.filter((file: string) => /\.json$/i.test(file));
    return jsonFiles.map((file: string) => file.replace(/\.json$/i, ''));
}

/**
 * Fetches remote git tags from the official Moodle GitHub repository.
 *
 * @returns {Promise<string[]>} Array of raw remote tag version strings.
 */
export async function getRemoteVersions(): Promise<string[]> {
    const command = 'git ls-remote --tags --refs https://github.com/moodle/moodle.git "refs/tags/v*"';
    const { stdout } = await execAsync(command);

    return stdout
        .trim()
        .split('\n')
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => line.split('\t')[1])
        .map((tag: string) => tag.replace('refs/tags/v', ''));
}

/**
 * Normalizes version strings to 'Major.Minor' format, removing non-versions and duplicates.
 *
 * @param {string[]} versions - Array of raw version strings.
 * @returns {string[]} Cleaned, unique 'Major.Minor' version strings.
 */
export function cleanRemoteVersions(versions: string[]): string[] {
    const matches = versions.map((version) => version.match(/^(\d+\.\d+)/)?.[1]);
    const validVersions = matches.filter(Boolean) as string[];
    return [...new Set(validVersions)];
}

/**
 * Identifies versions present in remote list that are missing locally.
 *
 * @param {string[]} localVersions - Local version strings.
 * @param {string[]} remoteVersions - Remote version strings.
 * @returns {string[]} Missing version strings.
 */
export function getMissingLocalVersions(localVersions: string[], remoteVersions: string[]): string[] {
    return remoteVersions.filter((version) => !localVersions.includes(version));
}