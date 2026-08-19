import {
    getLocalVersions,
    getRemoteVersions,
    cleanRemoteVersions,
    getMissingLocalVersions
} from './version-manager';
import { cloneMoodleVersionsInBatch } from './moodle-downloader';
import { extractWebServices } from '../webservice-extractor/index';

/**
 * Identifies remote Moodle versions that do not exist locally.
 *
 * @returns {Promise<string[]>} List of missing version strings (e.g. ['4.5']).
 */
export async function detectMissingVersions(): Promise<string[]> {
    const local = await getLocalVersions();
    const remoteRaw = await getRemoteVersions();
    const remoteClean = cleanRemoteVersions(remoteRaw);
    return getMissingLocalVersions(local, remoteClean);
}

/**
 * Sorts version strings in ascending numerical order (e.g. '3.8', '4.4', '4.5', '4.10').
 *
 * @param {string[]} versions - Array of version strings.
 * @returns {string[]} Sorted array of version strings.
 */
export function sortVersionsAscending(versions: string[]): string[] {
    return [...versions].sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
}

/**
 * Executes extraction for a single downloaded Moodle version.
 *
 * @param {string} version - Moodle version string.
 * @param {string} moodlePath - Local path where the version was cloned.
 * @returns {Promise<void>}
 */
async function extractVersion(version: string, moodlePath: string): Promise<void> {
    await extractWebServices({
        version,
        moodlePath,
        outputPath: `./schemas/v/${version}.json`
    });
}

/**
 * Runs the synchronization pipeline: detects, sorts, downloads, and extracts missing versions sequentially.
 *
 * @returns {Promise<string[]>} The list of successfully processed versions in ascending order.
 */
export async function runSyncPipeline(): Promise<string[]> {
    const missingVersions = await detectMissingVersions();
    if (missingVersions.length === 0) {
        return [];
    }

    const sortedVersions = sortVersionsAscending(missingVersions);
    const clonedPaths = await cloneMoodleVersionsInBatch(sortedVersions);

    for (let i = 0; i < sortedVersions.length; i++) {
        await extractVersion(sortedVersions[i], clonedPaths[i]);
    }

    return sortedVersions;
}
