import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Parses the stdout from git ls-tree to extract the blob hash.
 * Output format: `<mode> <type> <hash>\t<file>`.
 *
 * @param {string} output - Output from git ls-tree command.
 * @returns {string | null} Extracted hash string or null if not matched.
 */
function parseLsTreeOutput(output: string): string | null {
    const trimmed = output.trim();
    if (!trimmed) {
        return null;
    }
    const parts = trimmed.split(/\s+/);
    return parts.length >= 3 ? parts[2] : null;
}

/**
 * Executes git ls-tree to retrieve the blob SHA-1 hash for a given relative path.
 *
 * @param {string} relativeFilePath - Relative path to the file from repository root.
 * @param {string} repoPath - Root path of the git repository.
 * @returns {Promise<string | null>} The 40-character blob SHA-1 or null if not found.
 */
export async function getGitBlobHash(
    relativeFilePath: string,
    repoPath: string
): Promise<string | null> {
    try {
        const command = `git ls-tree HEAD "${relativeFilePath}"`;
        const { stdout } = await execAsync(command, { cwd: repoPath });
        return parseLsTreeOutput(stdout);
    } catch {
        return null;
    }
}
