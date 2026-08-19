import child_process from 'child_process';
import { findFiles } from '../../../../src/webservice-extractor/scanner/scanner';

jest.mock('child_process');

describe('Unit Test: scanner (Functions)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findFiles', () => {

        it('should orchestrate command execution with default pattern', async () => {
            const basePath = './src/tmp/moodle/v/4.5';
            const mockFiles = [
                './src/tmp/moodle/v/4.5/user/db/services.php',
                './src/tmp/moodle/v/4.5/mod/forum/db/services.php'
            ];

            (child_process.exec as unknown as jest.Mock).mockImplementation((command: string, callback: (error: Error | null, result: { stdout: string, stderr: string }) => void) => {
                expect(command).toContain(`find ${basePath}`);
                expect(command).toContain('-path "*/db/services.php"');
                callback(null, { stdout: mockFiles.join('\n') + '\n', stderr: '' });
            });

            const result = await findFiles(basePath);

            expect(result).toEqual(mockFiles);
        });

        it('should allow overriding pathPattern and ignoredDirs', async () => {
            const basePath = './src/tmp/moodle/v/4.5';
            const customPattern = '**/classes/external/*.php';
            const customIgnored = ['vendor', 'node_modules'];
            const mockFiles = ['./src/tmp/moodle/v/4.5/mod/forum/classes/external/discussion_list.php'];

            (child_process.exec as unknown as jest.Mock).mockImplementation((command: string, callback: (error: Error | null, result: { stdout: string, stderr: string }) => void) => {
                expect(command).toContain(`-path "${customPattern}"`);
                expect(command).toContain('-name "vendor" -o -name "node_modules"');
                callback(null, { stdout: mockFiles.join('\n') + '\n', stderr: '' });
            });

            const result = await findFiles(basePath, customPattern, customIgnored);

            expect(result).toEqual(mockFiles);
        });

        it('should allow scanning without pruning any directory when ignoredDirs is empty', async () => {
            const basePath = './src/tmp/moodle/v/4.5';
            const pattern = '*/db/services.php';
            const mockFiles = [
                './src/tmp/moodle/v/4.5/user/db/services.php',
                './src/tmp/moodle/v/4.5/vendor/some_package/db/services.php'
            ];

            (child_process.exec as unknown as jest.Mock).mockImplementation((command: string, callback: (error: Error | null, result: { stdout: string, stderr: string }) => void) => {
                expect(command).toBe(`find ${basePath} -type f -path "${pattern}" ! -empty -print`);
                callback(null, { stdout: mockFiles.join('\n') + '\n', stderr: '' });
            });

            const result = await findFiles(basePath, pattern, []);

            expect(result).toEqual(mockFiles);
        });

        it('should return empty array when no results are found', async () => {
            const basePath = './src/tmp/moodle/v/4.5';

            (child_process.exec as unknown as jest.Mock).mockImplementation((_command: string, callback: (error: Error | null, result: { stdout: string, stderr: string }) => void) => {
                callback(null, { stdout: '', stderr: '' });
            });

            const result = await findFiles(basePath);

            expect(result).toEqual([]);
        });

        it('should capture execution errors, log error and return empty array', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const basePath = 'invalid/path';

            (child_process.exec as unknown as jest.Mock).mockImplementation((_command: string, callback: (error: Error | null, result: { stdout: string, stderr: string }) => void) => {
                callback(new Error('Command failed'), { stdout: '', stderr: 'Error' });
            });

            const result = await findFiles(basePath);

            expect(result).toEqual([]);
            expect(consoleSpy).toHaveBeenCalledWith(
                'Error during file scanning phase:',
                expect.any(Error)
            );

            consoleSpy.mockRestore();
        });

    });

});