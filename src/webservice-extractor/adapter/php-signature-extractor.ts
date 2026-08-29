import path from 'path';
import { execFile } from 'child_process';
import { WebserviceSignature, SignatureExtractionPayload } from '../interfaces/signature.interfaces';
import { getPhpBinary } from './php-runtime';

const CLI_EXECUTOR_PATH = path.resolve(__dirname, '../../php-adapter/cli-executor.php');

/**
 * Builds safe CLI argument list for the PHP runner without shell interpolation.
 *
 * @example
 * ```ts
 * const args = buildCliArgs({
 *     moodlePath: '/var/www/moodle',
 *     classFile: 'user/classes/external.php',
 *     classname: 'core_user_external',
 *     methodname: 'get_users'
 * });
 * ```
 *
 * @param {SignatureExtractionPayload} payload - Service metadata payload.
 * @returns {string[]} CLI arguments array.
 */
export function buildCliArgs(payload: SignatureExtractionPayload): string[] {
    return [
        CLI_EXECUTOR_PATH,
        '--moodle-root',
        payload.moodlePath,
        '--file',
        payload.classFile,
        '--class',
        payload.classname,
        '--method',
        payload.methodname
    ];
}

/**
 * Parses raw JSON output from the PHP CLI adapter into a typed WebserviceSignature.
 *
 * @example
 * ```ts
 * const signature = parsePhpOutput('{"parameters":null,"returns":null}');
 * ```
 *
 * @param {string} stdout - Raw JSON string from PHP runner stdout.
 * @returns {WebserviceSignature} Parsed signature object.
 * @throws {Error} If stdout contains invalid JSON.
 */
export function parsePhpOutput(stdout: string): WebserviceSignature {
    try {
        return JSON.parse(stdout.trim()) as WebserviceSignature;
    } catch {
        throw new Error(`Failed to parse PHP adapter JSON output: ${stdout}`);
    }
}

interface JsonErrorPayload {
    error?: string;
    file?: string;
    line?: number;
}

/**
 * Appends source file and line location to error message if present.
 *
 * @param {string} msg - Base error message.
 * @param {string} [file] - Source file path.
 * @param {number} [line] - Source line number.
 * @returns {string} Enriched error string.
 */
function appendErrorLocation(msg: string, file?: string, line?: number): string {
    if (file && line) {
        return `${msg} in ${file}:${line}`;
    }
    return msg;
}

/**
 * Formats structured error payload with source file and line if available.
 *
 * @param {JsonErrorPayload} parsed - Parsed error object.
 * @returns {string | null} Formatted message.
 */
function formatJsonError(parsed: JsonErrorPayload): string | null {
    if (!parsed.error) {
        return null;
    }
    return appendErrorLocation(parsed.error, parsed.file, parsed.line);
}

/**
 * Safely extracts error description from structured JSON stderr output.
 *
 * @param {string} stderr - Raw stderr string.
 * @returns {string | null} Extracted error message or null.
 */
function extractJsonErrorMessage(stderr: string): string | null {
    try {
        const parsed = JSON.parse(stderr) as JsonErrorPayload;
        return formatJsonError(parsed);
    } catch {
        return null;
    }
}

/**
 * Extracts formatted error string from stderr payload.
 *
 * @param {string} stderr - Raw stderr content.
 * @returns {string} Clean error string.
 */
function formatStderrError(stderr: string): string {
    const jsonMsg = extractJsonErrorMessage(stderr);
    return jsonMsg ? jsonMsg : stderr.trim();
}

/**
 * Extracts base error message from raw error object.
 *
 * @param {{ stderr?: string; message?: string }} err - Raw error object.
 * @returns {string} Clean base error.
 */
function extractRawErrorMessage(err: { stderr?: string; message?: string }): string {
    if (err.stderr) {
        return formatStderrError(err.stderr);
    }
    return err.message ? err.message.trim() : 'Unknown error';
}

/**
 * Formats a clean error message from PHP adapter execution failure.
 *
 * @param {unknown} error - Raw execution error.
 * @returns {string} Formatted error message.
 */
function formatPhpError(error: unknown): string {
    const err = error as { code?: string | number; stderr?: string; message?: string };
    if (err.code === 'ETIMEDOUT') {
        return 'Execution timed out';
    }
    return extractRawErrorMessage(err);
}

/**
 * Handles error rejection in child process execution.
 *
 * @param {Error} error - Process execution error.
 * @param {string} stderr - Raw standard error string.
 * @param {(err: Error) => void} reject - Promise reject function.
 */
function handleProcessError(
    error: Error,
    stderr: string,
    reject: (err: Error) => void
): void {
    const enriched = error as Error & { stderr?: string };
    enriched.stderr = stderr;
    reject(enriched);
}

/**
 * Executes PHP CLI command asynchronously and returns standard output string.
 *
 * @param {string[]} args - Process arguments.
 * @param {number} timeoutMs - Execution timeout.
 * @returns {Promise<string>} Output string from stdout.
 */
async function executePhpCli(args: string[], timeoutMs: number): Promise<string> {
    const binary = await getPhpBinary();
    return new Promise((resolve, reject) => {
        execFile(binary, args, { timeout: timeoutMs, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
            if (error) {
                handleProcessError(error, stderr, reject);
                return;
            }
            resolve(stdout);
        });
    });
}

/**
 * Executes the ephemeral PHP mock runner to extract parameters and returns schemas.
 *
 * @example
 * ```ts
 * const signature = await extractWebserviceSignature({
 *     moodlePath: '/var/www/moodle',
 *     classFile: 'user/classes/external.php',
 *     classname: 'core_user_external',
 *     methodname: 'get_users'
 * });
 * ```
 *
 * @param {SignatureExtractionPayload} payload - Service metadata payload.
 * @param {number} [timeoutMs=5000] - Max execution timeout in ms.
 * @returns {Promise<WebserviceSignature>} Extracted structured signature.
 * @throws {Error} When PHP runner fails or times out.
 */
export async function extractWebserviceSignature(
    payload: SignatureExtractionPayload,
    timeoutMs = 5000
): Promise<WebserviceSignature> {
    const args = buildCliArgs(payload);

    try {
        const stdout = await executePhpCli(args, timeoutMs);
        return parsePhpOutput(stdout);
    } catch (error: unknown) {
        const details = formatPhpError(error);
        throw new Error(`PHP Signature Extraction failed: ${details}`);
    }
}
