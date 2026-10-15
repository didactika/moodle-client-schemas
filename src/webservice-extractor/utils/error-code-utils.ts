import { WebServiceErrorCode } from '../interfaces/schema-extractor.interfaces';

const WEB_SERVICE_ERROR_CODES = new Set<string>([
    'INVALID_MOODLE_PATH',
    'PHP_NOT_FOUND',
    'PHP_VERSION_UNSUPPORTED',
    'SERVICE_NOT_FOUND',
    'CLASS_NOT_FOUND',
    'INTROSPECTION_FAILED',
    'PERMISSION_DENIED'
]);

/** Node.js errno codes raised when the filesystem refuses access. */
const PERMISSION_ERRNO_CODES = new Set<string>(['EACCES', 'EPERM']);

/**
 * Checks whether a value is a known WebServiceErrorCode.
 *
 * @param {unknown} value - Candidate code.
 * @returns {boolean} True for a valid code.
 */
export function isWebServiceErrorCode(value: unknown): value is WebServiceErrorCode {
    return typeof value === 'string' && WEB_SERVICE_ERROR_CODES.has(value);
}

/**
 * Reads the `code` property of a thrown value, if any.
 *
 * @param {unknown} err - Thrown value.
 * @returns {unknown} Code value or undefined.
 */
function readCode(err: unknown): unknown {
    if (typeof err !== 'object' || err === null) {
        return undefined;
    }
    return (err as { code?: unknown }).code;
}

/**
 * Maps a Node.js errno to its WebServiceErrorCode.
 *
 * @param {unknown} code - Errno candidate.
 * @param {WebServiceErrorCode} fallback - Code used for unmapped errnos.
 * @returns {WebServiceErrorCode} Mapped code.
 */
function mapErrnoCode(code: unknown, fallback: WebServiceErrorCode): WebServiceErrorCode {
    return PERMISSION_ERRNO_CODES.has(code as string) ? 'PERMISSION_DENIED' : fallback;
}

/**
 * Resolves the structured error code of a failure without inspecting its message text:
 * a WebServiceErrorCode carried by the error wins, filesystem permission errnos map to
 * PERMISSION_DENIED, and anything else falls back to the given code.
 *
 * @example
 * ```ts
 * resolveErrorCode(new SignatureExtractionError('...', 'CLASS_NOT_FOUND')); // 'CLASS_NOT_FOUND'
 * resolveErrorCode(Object.assign(new Error('...'), { code: 'EACCES' }));    // 'PERMISSION_DENIED'
 * resolveErrorCode(new Error('boom'));                                      // 'INTROSPECTION_FAILED'
 * ```
 *
 * @param {unknown} err - Thrown value or payload carrying a `code`.
 * @param {WebServiceErrorCode} [fallback='INTROSPECTION_FAILED'] - Code used when none can be resolved.
 * @returns {WebServiceErrorCode} Resolved code.
 */
export function resolveErrorCode(
    err: unknown,
    fallback: WebServiceErrorCode = 'INTROSPECTION_FAILED'
): WebServiceErrorCode {
    const code = readCode(err);
    return isWebServiceErrorCode(code) ? code : mapErrnoCode(code, fallback);
}
