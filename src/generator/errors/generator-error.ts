/**
 * Standardized error codes for Moodle web service schema generation.
 */
export type MoodleGeneratorErrorCode =
    | 'ERR_PHP_NOT_FOUND'
    | 'ERR_PHP_VERSION_UNSUPPORTED'
    | 'ERR_GIT_NOT_FOUND'
    | 'ERR_NETWORK_DISCONNECTED'
    | 'ERR_ARCHIVE_EXTRACTION_FAILED'
    | 'ERR_CONFIG_INVALID_JSON'
    | 'ERR_CONFIG_MISSING_OUTDIR_LOCAL'
    | 'ERR_CONFIG_FILE_NOT_FOUND'
    | 'ERR_MOODLE_VERSION_UNSUPPORTED'
    | 'ERR_MOODLE_PATH_NOT_FOUND'
    | 'ERR_MOODLE_PATH_NOT_ROOT'
    | 'ERR_MOODLE_PATH_MULTIPLE_INSTANCES'
    | 'ERR_MOODLE_PATH_PERMISSION_DENIED'
    | 'ERR_NO_SERVICES_FOUND'
    | 'ERR_SERVICE_NOT_FOUND'
    | 'ERR_CLASS_NOT_FOUND'
    | 'ERR_INTROSPECTION_FAILED'
    | 'ERR_WRITE_PERMISSION_DENIED';

export interface MoodleGeneratorErrorOptions {
    code: MoodleGeneratorErrorCode;
    title: string;
    details: string;
    action: string;
    cause?: unknown;
}

/**
 * Controlled typed error class for all schema generation failures.
 * Produces structured, emoji-free CLI error messages formatted as:
 *
 * [moodle-client] ERROR: <Title> (<CODE>)
 * Details: <Clear description>
 * Action:  <Exact action the user should take>
 */
export class MoodleGeneratorError extends Error {
    readonly code: MoodleGeneratorErrorCode;
    readonly title: string;
    readonly details: string;
    readonly action: string;

    constructor(options: MoodleGeneratorErrorOptions) {
        super(
            `[moodle-client] ERROR: ${options.title} (${options.code})\n` +
            `Details: ${options.details}\n` +
            `Action:  ${options.action}`
        );
        this.name = 'MoodleGeneratorError';
        this.code = options.code;
        this.title = options.title;
        this.details = options.details;
        this.action = options.action;
        if (options.cause) {
            this.cause = options.cause;
        }
    }

    /**
     * Formats the error into standard CLI output blocks.
     */
    format(): string {
        return (
            `[moodle-client] ERROR: ${this.title} (${this.code})\n` +
            `Details: ${this.details}\n` +
            `Action:  ${this.action}`
        );
    }
}

/**
 * Formats any caught error (MoodleGeneratorError or generic Error) into standard CLI output.
 *
 * @param {unknown} error - Caught error
 * @returns {string} Formatted error string without emojis
 */
export function formatError(error: unknown): string {
    if (error instanceof MoodleGeneratorError) {
        return error.format();
    }
    const message = error instanceof Error ? error.message : String(error);
    return (
        `[moodle-client] ERROR: Generation Failed (ERR_UNKNOWN)\n` +
        `Details: ${message}\n` +
        `Action:  Verify your configuration and system environment.`
    );
}

/**
 * Maps low-level WebServiceExtractionError to standard MoodleGeneratorError.
 *
 * @param {{ code?: string; message: string; serviceName?: string; classname?: string }} err - Raw extraction error
 * @param {string} [moodlePath] - Target Moodle codebase path
 * @returns {MoodleGeneratorError} Standardized generator error
 */
export function mapExtractionErrorToGeneratorError(
    err: { code?: string; message: string; serviceName?: string; classname?: string },
    moodlePath?: string
): MoodleGeneratorError {
    switch (err.code) {
        case 'PHP_NOT_FOUND':
            return new MoodleGeneratorError({
                code: 'ERR_PHP_NOT_FOUND',
                title: 'PHP CLI Not Found',
                details: 'PHP CLI was not found on your system PATH.',
                action: 'Install PHP 7.4 or higher and ensure the "php" executable is accessible in your system PATH.'
            });

        case 'PHP_VERSION_UNSUPPORTED':
            return new MoodleGeneratorError({
                code: 'ERR_PHP_VERSION_UNSUPPORTED',
                title: 'Unsupported PHP Version',
                details: err.message,
                action: 'Upgrade your PHP CLI installation to PHP 7.4 or higher.'
            });

        case 'PERMISSION_DENIED':
            return new MoodleGeneratorError({
                code: 'ERR_MOODLE_PATH_PERMISSION_DENIED',
                title: 'Moodle Path Permission Denied',
                details: err.message || `Permission denied when accessing Moodle codebase at '${moodlePath ?? ''}'.`,
                action: 'Check read and execute permissions for the current user on the specified Moodle directory.'
            });

        case 'SERVICE_NOT_FOUND':
            return new MoodleGeneratorError({
                code: 'ERR_SERVICE_NOT_FOUND',
                title: 'Web Service Not Found',
                details: err.message,
                action: 'Check service names or wildcards in the "webservices" array in moodle-client.config.json.'
            });

        case 'CLASS_NOT_FOUND':
            return new MoodleGeneratorError({
                code: 'ERR_CLASS_NOT_FOUND',
                title: 'Web Service Class Not Found',
                details: err.message,
                action: `Verify that the plugin containing class '${err.classname ?? ''}' is installed and autoloadable in Moodle.`
            });

        case 'INTROSPECTION_FAILED':
            return new MoodleGeneratorError({
                code: 'ERR_INTROSPECTION_FAILED',
                title: 'Web Service Introspection Failed',
                details: err.message,
                action: 'Check PHP error logs or ensure external function parameters and returns methods execute cleanly without fatal errors.'
            });

        case 'INVALID_MOODLE_PATH':
        default: {
            const msg = err.message || '';
            if (msg.includes('multiple Moodle installations')) {
                return new MoodleGeneratorError({
                    code: 'ERR_MOODLE_PATH_MULTIPLE_INSTANCES',
                    title: 'Multiple Moodle Instances Detected',
                    details: msg,
                    action: 'Specify the exact subdirectory of the desired Moodle instance in "moodlePath".'
                });
            }
            if (msg.includes('no services.php files discovered')) {
                return new MoodleGeneratorError({
                    code: 'ERR_NO_SERVICES_FOUND',
                    title: 'No Web Services Found',
                    details: msg,
                    action: 'Verify that the Moodle installation is complete and contains standard plugins with db/services.php.'
                });
            }
            if (msg.includes('does not exist on disk')) {
                return new MoodleGeneratorError({
                    code: 'ERR_MOODLE_PATH_NOT_FOUND',
                    title: 'Moodle Path Not Found',
                    details: msg,
                    action: 'Verify that the directory specified in "moodlePath" exists on disk.'
                });
            }
            return new MoodleGeneratorError({
                code: 'ERR_MOODLE_PATH_NOT_ROOT',
                title: 'Invalid Moodle Root Directory',
                details: msg,
                action: 'Set "moodlePath" to the direct root directory of your Moodle installation containing version.php.'
            });
        }
    }
}
