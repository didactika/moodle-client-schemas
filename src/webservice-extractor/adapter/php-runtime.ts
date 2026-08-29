import { execFile } from 'child_process';
import fs from 'fs/promises';

let customPhpBinary: string | null = null;
let temporaryRuntimeDir: string | null = null;

/**
 * Checks if system PHP CLI is executable.
 *
 * @returns {Promise<boolean>} True if system php is available.
 */
export function isSystemPhpAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
        execFile('php', ['-v'], {}, (error) => {
            resolve(!error);
        });
    });
}

/**
 * Sets a custom PHP binary path manually.
 *
 * @param {string | null} binaryPath - Custom binary path.
 */
export function setPhpBinaryPath(binaryPath: string | null): void {
    customPhpBinary = binaryPath;
}

/**
 * Resolves the active PHP binary to use.
 *
 * @returns {Promise<string>} PHP executable path or name.
 */
export async function getPhpBinary(): Promise<string> {
    if (customPhpBinary) {
        return customPhpBinary;
    }
    const systemOk = await isSystemPhpAvailable();
    if (systemOk) {
        return 'php';
    }
    throw new Error('PHP binary not found on system. Please install PHP CLI (>= 7.4).');
}

/**
 * Cleans up temporary downloaded PHP runtime if one was provisioned.
 *
 * @returns {Promise<void>}
 */
export async function cleanupPhpRuntime(): Promise<void> {
    if (temporaryRuntimeDir) {
        try {
            await fs.rm(temporaryRuntimeDir, { recursive: true, force: true });
        } catch {
            // Ignore cleanup errors
        }
        temporaryRuntimeDir = null;
        customPhpBinary = null;
    }
}
