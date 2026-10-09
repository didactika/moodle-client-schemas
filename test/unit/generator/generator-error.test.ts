import {
    MoodleGeneratorError,
    formatError,
    mapExtractionErrorToGeneratorError
} from '../../../src/generator/errors/generator-error';

describe('MoodleGeneratorError and Error Formatting', () => {
    it('should instantiate MoodleGeneratorError with correct properties and formatted message', () => {
        const error = new MoodleGeneratorError({
            code: 'ERR_PHP_NOT_FOUND',
            title: 'PHP CLI Not Found',
            details: 'PHP CLI was not found on your system PATH.',
            action: 'Install PHP 7.4 or higher and ensure php is accessible in PATH.'
        });

        expect(error.name).toBe('MoodleGeneratorError');
        expect(error.code).toBe('ERR_PHP_NOT_FOUND');
        expect(error.title).toBe('PHP CLI Not Found');
        expect(error.details).toBe('PHP CLI was not found on your system PATH.');
        expect(error.action).toBe('Install PHP 7.4 or higher and ensure php is accessible in PATH.');

        const formatted = error.format();
        expect(formatted).toContain('[moodle-client] ERROR: PHP CLI Not Found (ERR_PHP_NOT_FOUND)');
        expect(formatted).toContain('Details: PHP CLI was not found on your system PATH.');
        expect(formatted).toContain('Action:  Install PHP 7.4 or higher and ensure php is accessible in PATH.');
        expect(formatted).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}✔✖]/u);
    });

    it('should format generic Error instances without emojis', () => {
        const generic = new Error('Socket closed unexpectedly');
        const formatted = formatError(generic);

        expect(formatted).toContain('[moodle-client] ERROR: Generation Failed (ERR_UNKNOWN)');
        expect(formatted).toContain('Details: Socket closed unexpectedly');
        expect(formatted).toContain('Action:  Verify your configuration and system environment.');
        expect(formatted).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}✔✖]/u);
    });

    describe('mapExtractionErrorToGeneratorError', () => {
        it('should map PHP_NOT_FOUND to ERR_PHP_NOT_FOUND', () => {
            const mapped = mapExtractionErrorToGeneratorError({
                code: 'PHP_NOT_FOUND',
                message: 'PHP not found'
            });
            expect(mapped.code).toBe('ERR_PHP_NOT_FOUND');
            expect(mapped.title).toBe('PHP CLI Not Found');
        });

        it('should map PHP_VERSION_UNSUPPORTED to ERR_PHP_VERSION_UNSUPPORTED', () => {
            const mapped = mapExtractionErrorToGeneratorError({
                code: 'PHP_VERSION_UNSUPPORTED',
                message: 'Detected PHP 7.2'
            });
            expect(mapped.code).toBe('ERR_PHP_VERSION_UNSUPPORTED');
            expect(mapped.title).toBe('Unsupported PHP Version');
            expect(mapped.details).toContain('Detected PHP 7.2');
        });

        it('should map PERMISSION_DENIED to ERR_MOODLE_PATH_PERMISSION_DENIED', () => {
            const mapped = mapExtractionErrorToGeneratorError(
                { code: 'PERMISSION_DENIED', message: 'EACCES: permission denied' },
                '/var/www/moodle'
            );
            expect(mapped.code).toBe('ERR_MOODLE_PATH_PERMISSION_DENIED');
            expect(mapped.title).toBe('Moodle Path Permission Denied');
        });

        it('should map SERVICE_NOT_FOUND to ERR_SERVICE_NOT_FOUND', () => {
            const mapped = mapExtractionErrorToGeneratorError({
                code: 'SERVICE_NOT_FOUND',
                serviceName: 'custom_service_xyz',
                message: "Web service 'custom_service_xyz' was not found"
            });
            expect(mapped.code).toBe('ERR_SERVICE_NOT_FOUND');
            expect(mapped.title).toBe('Web Service Not Found');
        });

        it('should map CLASS_NOT_FOUND to ERR_CLASS_NOT_FOUND', () => {
            const mapped = mapExtractionErrorToGeneratorError({
                code: 'CLASS_NOT_FOUND',
                classname: 'mod_forum_external',
                message: "Could not resolve class file on disk for class 'mod_forum_external'"
            });
            expect(mapped.code).toBe('ERR_CLASS_NOT_FOUND');
            expect(mapped.title).toBe('Web Service Class Not Found');
            expect(mapped.action).toContain('mod_forum_external');
        });

        it('should map INTROSPECTION_FAILED to ERR_INTROSPECTION_FAILED', () => {
            const mapped = mapExtractionErrorToGeneratorError({
                code: 'INTROSPECTION_FAILED',
                message: 'Fatal error: Class undefined in PHP sandbox'
            });
            expect(mapped.code).toBe('ERR_INTROSPECTION_FAILED');
            expect(mapped.title).toBe('Web Service Introspection Failed');
        });

        it('should map INVALID_MOODLE_PATH with does not exist on disk to ERR_MOODLE_PATH_NOT_FOUND', () => {
            const mapped = mapExtractionErrorToGeneratorError({
                code: 'INVALID_MOODLE_PATH',
                message: "The provided Moodle path does not exist on disk: '/invalid/path'"
            });
            expect(mapped.code).toBe('ERR_MOODLE_PATH_NOT_FOUND');
            expect(mapped.title).toBe('Moodle Path Not Found');
        });

        it('should map INVALID_MOODLE_PATH with multiple Moodle installations to ERR_MOODLE_PATH_MULTIPLE_INSTANCES', () => {
            const mapped = mapExtractionErrorToGeneratorError({
                code: 'INVALID_MOODLE_PATH',
                message: "The provided path contains multiple Moodle installations (found: m1, m2)."
            });
            expect(mapped.code).toBe('ERR_MOODLE_PATH_MULTIPLE_INSTANCES');
            expect(mapped.title).toBe('Multiple Moodle Instances Detected');
        });

        it('should map INVALID_MOODLE_PATH with no services.php to ERR_NO_SERVICES_FOUND', () => {
            const mapped = mapExtractionErrorToGeneratorError({
                code: 'INVALID_MOODLE_PATH',
                message: 'The provided directory is not a valid Moodle codebase (no services.php files discovered): /path'
            });
            expect(mapped.code).toBe('ERR_NO_SERVICES_FOUND');
            expect(mapped.title).toBe('No Web Services Found');
        });

        it('should map INVALID_MOODLE_PATH with missing version.php to ERR_MOODLE_PATH_NOT_ROOT', () => {
            const mapped = mapExtractionErrorToGeneratorError({
                code: 'INVALID_MOODLE_PATH',
                message: 'The provided directory is not a valid Moodle codebase (no version.php found at root): /path'
            });
            expect(mapped.code).toBe('ERR_MOODLE_PATH_NOT_ROOT');
            expect(mapped.title).toBe('Invalid Moodle Root Directory');
        });
    });
});
