import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { execFile } from 'child_process';
import { ExtractionRuntime } from '../interfaces/runtime.interfaces';
import { resolveVersion } from '../resolver/version-resolver';
import { isVersionGreaterOrEqual } from '../utils/version-utils';
import { getPhpBinary } from './php-runtime';
import { resolveAdapterScript } from './script-locator';

const COPY_EXCLUDED_DIRS = new Set(['.git', 'node_modules']);
const NORMALIZE_TIMEOUT_MS = 10 * 60 * 1000;

/**
 * Determines whether the codebase predates Moodle 4.0 and needs PHP 8 syntax normalization.
 *
 * @param {string} moodlePath - Original Moodle root.
 * @returns {Promise<boolean>} True if the codebase is a legacy (< 4.0) release.
 */
export async function requiresLegacyNormalization(moodlePath: string): Promise<boolean> {
    try {
        const release = await resolveVersion(moodlePath);
        return !isVersionGreaterOrEqual(release, '4.0');
    } catch {
        return false;
    }
}

/**
 * Decides whether a path should be copied into the disposable working tree.
 *
 * @param {string} source - Source path being copied.
 * @returns {boolean} True if the path must be copied.
 */
function shouldCopyPath(source: string): boolean {
    return !COPY_EXCLUDED_DIRS.has(path.basename(source));
}

/**
 * Runs normalize-cli.php against a disposable copy of the codebase.
 *
 * @param {string} copyRoot - Disposable Moodle copy.
 * @returns {Promise<void>}
 */
async function runNormalizer(copyRoot: string): Promise<void> {
    const binary = await getPhpBinary();
    const script = resolveAdapterScript('normalize-cli.php');
    await new Promise<void>((resolve, reject) => {
        execFile(binary, [script, '--moodle-root', copyRoot], { timeout: NORMALIZE_TIMEOUT_MS }, (error) => {
            if (error) {
                reject(new Error(`Legacy syntax normalization failed: ${error.message}`));
                return;
            }
            resolve();
        });
    });
}

/**
 * Copies a legacy codebase into the working directory and normalizes the copy for PHP 8.
 * The original Moodle directory is never modified.
 *
 * @param {string} moodlePath - Original Moodle root.
 * @param {string} workDir - Run working directory.
 * @returns {Promise<string>} Path to the normalized copy.
 */
async function createNormalizedCopy(moodlePath: string, workDir: string): Promise<string> {
    const copyRoot = path.join(workDir, 'moodle');
    // dereference: a copied symlink would still point at the original plugin, and normalizing
    // through it would rewrite files outside the disposable copy.
    await fs.cp(moodlePath, copyRoot, { recursive: true, dereference: true, filter: shouldCopyPath });
    await runNormalizer(copyRoot);
    return copyRoot;
}

/**
 * Resolves the Moodle root handed to the PHP sandbox.
 *
 * @param {string} moodlePath - Original Moodle root.
 * @param {string} workDir - Run working directory.
 * @returns {Promise<string>} Original root, or a normalized disposable copy for legacy codebases.
 */
async function resolveSandboxRoot(moodlePath: string, workDir: string): Promise<string> {
    if (await requiresLegacyNormalization(moodlePath)) {
        return createNormalizedCopy(moodlePath, workDir);
    }
    return moodlePath;
}

/**
 * Prepares an isolated, ephemeral runtime for one extraction run.
 *
 * @example
 * ```ts
 * const runtime = await prepareExtractionRuntime('/var/www/moodle');
 * try {
 *     // invoke the PHP sandbox with runtime.moodleRoot and runtime.dataroot
 * } finally {
 *     await disposeExtractionRuntime(runtime);
 * }
 * ```
 *
 * @param {string} moodlePath - Original Moodle root.
 * @returns {Promise<ExtractionRuntime>} Prepared runtime.
 */
export async function prepareExtractionRuntime(moodlePath: string): Promise<ExtractionRuntime> {
    const workDir = await fs.mkdtemp(path.join(os.tmpdir(), 'moodle-client-schemas-'));
    const dataroot = path.join(workDir, 'dataroot');
    try {
        await fs.mkdir(dataroot, { recursive: true });
        const moodleRoot = await resolveSandboxRoot(moodlePath, workDir);
        return { moodleRoot, dataroot, workDir };
    } catch (err) {
        await fs.rm(workDir, { recursive: true, force: true });
        throw err;
    }
}

/**
 * Removes every artifact created for an extraction run.
 *
 * @param {ExtractionRuntime | null} runtime - Runtime to dispose.
 * @returns {Promise<void>}
 */
export async function disposeExtractionRuntime(runtime: ExtractionRuntime | null): Promise<void> {
    if (!runtime) {
        return;
    }
    await fs.rm(runtime.workDir, { recursive: true, force: true });
}
