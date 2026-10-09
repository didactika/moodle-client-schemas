import path from 'path';
import { extractWebservice } from '../../../src/webservice-extractor';
import * as PhpRuntime from '../../../src/webservice-extractor/adapter/php-runtime';
import * as Scanner from '../../../src/webservice-extractor/scanner/scanner';
import * as AstManager from '../../../src/webservice-extractor/cache/ast-manager';
import * as ServiceExtractor from '../../../src/webservice-extractor/extractor/service-extractor';
import * as ClassResolver from '../../../src/webservice-extractor/resolver/class-resolver';
import * as PhpSignatureExtractor from '../../../src/webservice-extractor/adapter/php-signature-extractor';

jest.mock('../../../src/webservice-extractor/adapter/php-runtime', () => {
    const original = jest.requireActual('../../../src/webservice-extractor/adapter/php-runtime');
    return {
        ...original,
        validatePhpRuntime: jest.fn()
    };
});
jest.mock('../../../src/webservice-extractor/scanner/scanner');
jest.mock('../../../src/webservice-extractor/cache/ast-manager');
jest.mock('../../../src/webservice-extractor/extractor/service-extractor');
jest.mock('../../../src/webservice-extractor/resolver/class-resolver');
jest.mock('../../../src/webservice-extractor/adapter/php-signature-extractor');

describe('Unit Test: Environment Validations and Structured Error Reporting', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should report INVALID_MOODLE_PATH when path does not exist on disk', async () => {
        (PhpRuntime.validatePhpRuntime as jest.Mock).mockResolvedValue({ valid: true, binaryPath: 'php' });

        const nonExistentPath = path.resolve('./non_existent_folder_xyz_12345');
        const result = await extractWebservice({
            moodlePath: nonExistentPath
        });

        expect(result.schemas).toEqual([]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toBe('INVALID_MOODLE_PATH');
        expect(result.errors[0].message).toContain('does not exist on disk');
    });

    it('should report PHP_NOT_FOUND when PHP CLI is missing and request installation in English', async () => {
        const moodlePath = path.resolve('./test/fixtures/mock_moodle');
        (PhpRuntime.validatePhpRuntime as jest.Mock).mockResolvedValue({
            valid: false,
            error: {
                code: 'PHP_NOT_FOUND',
                message: 'PHP CLI was not found on your system PATH. Please install PHP (>= 7.4) and ensure "php" is executable.'
            }
        });

        const result = await extractWebservice({ moodlePath });

        expect(result.schemas).toEqual([]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toBe('PHP_NOT_FOUND');
        expect(result.errors[0].message).toContain('Please install PHP (>= 7.4)');
    });

    it('should report PHP_VERSION_UNSUPPORTED when PHP version is < 7.4 and request upgrade in English', async () => {
        const moodlePath = path.resolve('./test/fixtures/mock_moodle');
        (PhpRuntime.validatePhpRuntime as jest.Mock).mockResolvedValue({
            valid: false,
            error: {
                code: 'PHP_VERSION_UNSUPPORTED',
                message: 'Unsupported PHP version detected (PHP 7.2). Moodle schema extraction requires PHP 7.4 or higher. Please upgrade your PHP installation.'
            }
        });

        const result = await extractWebservice({ moodlePath });

        expect(result.schemas).toEqual([]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toBe('PHP_VERSION_UNSUPPORTED');
        expect(result.errors[0].message).toContain('Moodle schema extraction requires PHP 7.4 or higher');
    });

    it('should report INVALID_MOODLE_PATH when directory contains no services.php', async () => {
        const moodlePath = path.resolve('./test/fixtures/mock_moodle');
        (PhpRuntime.validatePhpRuntime as jest.Mock).mockResolvedValue({ valid: true, binaryPath: 'php' });
        (Scanner.findFiles as jest.Mock).mockResolvedValue([]);

        const result = await extractWebservice({ moodlePath });

        expect(result.schemas).toEqual([]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toBe('INVALID_MOODLE_PATH');
        expect(result.errors[0].message).toContain('no services.php files discovered');
    });

    it('should capture INTROSPECTION_FAILED error without throwing when single service execution fails', async () => {
        const moodlePath = path.resolve('./test/fixtures/mock_moodle');
        (PhpRuntime.validatePhpRuntime as jest.Mock).mockResolvedValue({ valid: true, binaryPath: 'php' });
        (Scanner.findFiles as jest.Mock).mockResolvedValue(['./test/fixtures/mock_moodle/mod/sample/db/services.php']);
        (AstManager.getAst as jest.Mock).mockResolvedValue({ type: 'Program' });

        const mockService = {
            name: 'broken_service',
            classname: 'broken_class',
            methodname: 'execute'
        };
        (ServiceExtractor.extractServices as jest.Mock).mockReturnValue([mockService]);
        (ClassResolver.resolveClass as jest.Mock).mockResolvedValue('mod/sample/classes/external/broken.php');
        (PhpSignatureExtractor.extractWebserviceSignature as jest.Mock).mockRejectedValue(
            new Error('Fatal error: Class undefined in PHP sandbox')
        );

        const result = await extractWebservice({ moodlePath });

        expect(result.schemas).toEqual([]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toBe('INTROSPECTION_FAILED');
        expect(result.errors[0].serviceName).toBe('broken_service');
        expect(result.errors[0].message).toContain('Class undefined in PHP sandbox');
    });

    it('should classify PERMISSION_DENIED error when file permissions prevent execution', async () => {
        const moodlePath = path.resolve('./test/fixtures/mock_moodle');
        (PhpRuntime.validatePhpRuntime as jest.Mock).mockResolvedValue({ valid: true, binaryPath: 'php' });
        (Scanner.findFiles as jest.Mock).mockResolvedValue(['./test/fixtures/mock_moodle/mod/sample/db/services.php']);
        (AstManager.getAst as jest.Mock).mockResolvedValue({ type: 'Program' });

        const mockService = {
            name: 'restricted_service',
            classname: 'restricted_class'
        };
        (ServiceExtractor.extractServices as jest.Mock).mockReturnValue([mockService]);
        (ClassResolver.resolveClass as jest.Mock).mockResolvedValue('mod/sample/classes/external/restricted.php');
        (PhpSignatureExtractor.extractWebserviceSignature as jest.Mock).mockRejectedValue(
            new Error('EACCES: Permission denied, open /some/file')
        );

        const result = await extractWebservice({ moodlePath });

        expect(result.schemas).toEqual([]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toBe('PERMISSION_DENIED');
        expect(result.errors[0].serviceName).toBe('restricted_service');
    });

    it('should report SERVICE_NOT_FOUND when requested service does not exist in repository', async () => {
        const moodlePath = path.resolve('./test/fixtures/mock_moodle');
        (PhpRuntime.validatePhpRuntime as jest.Mock).mockResolvedValue({ valid: true, binaryPath: 'php' });
        (Scanner.findFiles as jest.Mock).mockResolvedValue(['./test/fixtures/mock_moodle/mod/sample/db/services.php']);
        (AstManager.getAst as jest.Mock).mockResolvedValue({ type: 'Program' });

        const mockService = {
            name: 'mod_sample_get_items',
            classname: 'mod_sample_class'
        };
        (ServiceExtractor.extractServices as jest.Mock).mockReturnValue([mockService]);

        const result = await extractWebservice({
            moodlePath,
            services: ['webservice_inventado']
        });

        expect(result.schemas).toEqual([]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toBe('SERVICE_NOT_FOUND');
        expect(result.errors[0].serviceName).toBe('webservice_inventado');
        expect(result.errors[0].message).toContain('was not found in any declared db/services.php');
    });

    it('should detect when a parent directory containing a sub-Moodle was passed instead of direct root', async () => {
        const parentDir = path.resolve('./test/fixtures');
        (PhpRuntime.validatePhpRuntime as jest.Mock).mockResolvedValue({ valid: true, binaryPath: 'php' });

        const result = await extractWebservice({
            moodlePath: parentDir
        });

        expect(result.schemas).toEqual([]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].code).toBe('INVALID_MOODLE_PATH');
        expect(result.errors[0].message).toContain('is not a direct Moodle root');
        expect(result.errors[0].message).toContain('mock_moodle');
    });

});
