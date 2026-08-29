import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import {
    WebserviceSignature,
    SignatureExtractionPayload,
    JsonErrorPayload,
    WebServiceReturnSchema,
    WebServiceParametersSchema
} from '../interfaces/signature.interfaces';
import { getPhpBinary } from './php-runtime';

/**
 * Evaluates candidate file paths and returns the first existing path.
 *
 * @param {string[]} candidates - Array of candidate file paths.
 * @returns {string | null} First existing path or null.
 */
function findExistingCandidate(candidates: string[]): string | null {
    for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }
    return null;
}

/**
 * Resolves the absolute path to cli-executor.php across development and compiled dist/ bundles.
 *
 * @returns {string} Absolute path to cli-executor.php.
 */
export function getCliExecutorPath(): string {
    const candidates = [
        path.resolve(__dirname, '../src/php-adapter/cli-executor.php'),
        path.resolve(__dirname, '../../php-adapter/cli-executor.php'),
        path.resolve(__dirname, './src/php-adapter/cli-executor.php'),
        path.resolve(__dirname, 'php-adapter/cli-executor.php')
    ];
    const found = findExistingCandidate(candidates);
    return found ?? path.resolve(__dirname, '../src/php-adapter/cli-executor.php');
}

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
        getCliExecutorPath(),
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
 * Normalizes description across object keys.
 *
 * @param {Record<string, unknown>} rawKeys - Raw keys dictionary.
 * @returns {Record<string, WebServiceReturnSchema>} Normalized keys dictionary.
 */
function normalizeKeys(rawKeys: Record<string, unknown>): Record<string, WebServiceReturnSchema> {
    const normalized: Record<string, WebServiceReturnSchema> = {};
    for (const [key, value] of Object.entries(rawKeys)) {
        const child = normalizeSchemaNode(value);
        if (child) {
            normalized[key] = child;
        }
    }
    return normalized;
}

/**
 * Normalizes description on an object node.
 *
 * @param {Record<string, unknown>} raw - Raw object node.
 * @param {string | undefined} desc - Description text.
 * @returns {WebServiceReturnSchema} Normalized object schema.
 */
function normalizeObjectNode(
    raw: Record<string, unknown>,
    desc?: string
): WebServiceReturnSchema {
    const keys = normalizeKeys((raw.keys as Record<string, unknown>) ?? {});
    return {
        ...raw,
        kind: raw.kind === 'parameters' ? 'parameters' : 'object',
        description: desc,
        desc,
        keys
    } as WebServiceReturnSchema;
}

/**
 * Normalizes description on an array node.
 *
 * @param {Record<string, unknown>} raw - Raw array node.
 * @param {string | undefined} desc - Description text.
 * @returns {WebServiceReturnSchema} Normalized array schema.
 */
function normalizeArrayNode(
    raw: Record<string, unknown>,
    desc?: string
): WebServiceReturnSchema {
    const content = normalizeSchemaNode(raw.content);
    return {
        ...raw,
        kind: 'array',
        description: desc,
        desc,
        content: content ?? ({} as WebServiceReturnSchema)
    } as WebServiceReturnSchema;
}

/**
 * Extracts description or desc string from a raw node.
 *
 * @param {Record<string, unknown>} raw - Raw node.
 * @returns {string | undefined} Extracted description.
 */
function extractNodeDescription(raw: Record<string, unknown>): string | undefined {
    if (typeof raw.description === 'string') {
        return raw.description;
    }
    return typeof raw.desc === 'string' ? raw.desc : undefined;
}

/**
 * Checks if a raw node represents an associative object.
 *
 * @param {Record<string, unknown>} raw - Raw node.
 * @returns {boolean} True if object node.
 */
function isObjectNode(raw: Record<string, unknown>): boolean {
    return Boolean(raw.keys && typeof raw.keys === 'object');
}

/**
 * Normalizes a primitive leaf value node.
 *
 * @param {Record<string, unknown>} raw - Raw value node.
 * @param {string | undefined} desc - Description string.
 * @returns {WebServiceReturnSchema} Normalized value schema.
 */
function normalizeValueNode(raw: Record<string, unknown>, desc?: string): WebServiceReturnSchema {
    const rawType = typeof raw.type === 'string' ? raw.type : '';
    return {
        ...raw,
        kind: 'value',
        description: desc,
        desc,
        type: rawType
    } as WebServiceReturnSchema;
}

/**
 * Normalizes an object, array, or value node into a typed WebServiceReturnSchema.
 *
 * @param {Record<string, unknown>} raw - Raw node.
 * @param {string | undefined} desc - Description string.
 * @returns {WebServiceReturnSchema} Normalized schema.
 */
function normalizeComplexNode(raw: Record<string, unknown>, desc?: string): WebServiceReturnSchema {
    if (isObjectNode(raw)) {
        return normalizeObjectNode(raw, desc);
    }
    if (raw.content) {
        return normalizeArrayNode(raw, desc);
    }
    return normalizeValueNode(raw, desc);
}

/**
 * Type guard checking if node is a non-null object record.
 *
 * @param {unknown} node - Candidate node.
 * @returns {node is Record<string, unknown>} True if valid object.
 */
function isRecord(node: unknown): node is Record<string, unknown> {
    return Boolean(node && typeof node === 'object');
}

/**
 * Recursively normalizes a schema node, ensuring description is populated from desc.
 *
 * @param {unknown} node - Raw node from PHP JSON output.
 * @returns {WebServiceReturnSchema | null} Normalized schema node or null.
 */
export function normalizeSchemaNode(node: unknown): WebServiceReturnSchema | null {
    if (!isRecord(node)) {
        return null;
    }
    const desc = extractNodeDescription(node);
    return normalizeComplexNode(node, desc);
}

/**
 * Normalizes a complete WebserviceSignature from raw PHP output.
 *
 * @param {WebserviceSignature} raw - Parsed raw signature.
 * @returns {WebserviceSignature} Normalized signature with description properties.
 */
function normalizeWebserviceSignature(raw: WebserviceSignature): WebserviceSignature {
    return {
        parameters: raw.parameters ? (normalizeSchemaNode(raw.parameters) as WebServiceParametersSchema) : null,
        returns: raw.returns ? normalizeSchemaNode(raw.returns) : null
    };
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
        const raw = JSON.parse(stdout.trim()) as WebserviceSignature;
        return normalizeWebserviceSignature(raw);
    } catch {
        throw new Error(`Failed to parse PHP adapter JSON output: ${stdout}`);
    }
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
