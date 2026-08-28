import child_process from 'child_process';
import { findFiles, trimPhpFunction } from '../../../../src/webservice-extractor/scanner/scanner';

jest.mock('child_process');

describe('Unit Test: scanner (Functions)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findFiles', () => {

        it('should execute command with a single path pattern', async () => {
            const basePath = './src/tmp/moodle/v/4.5';
            const pathPattern = '*/db/services.php';

            const mockFiles = [
                './src/tmp/moodle/v/4.5/user/db/services.php',
                './src/tmp/moodle/v/4.5/mod/forum/db/services.php'
            ];

            (child_process.exec as unknown as jest.Mock).mockImplementation((
                command: string,
                callback: (
                    error: Error | null,
                    result: { stdout: string; stderr: string }
                ) => void
            ) => {
                expect(command).toContain(`find ${basePath}`);
                expect(command).toContain(`-path "${pathPattern}"`);

                callback(null, {
                    stdout: mockFiles.join('\n') + '\n',
                    stderr: ''
                });
            });

            const result = await findFiles(basePath, [pathPattern]);

            expect(result).toEqual(mockFiles);
        });

        it('should allow overriding pathPatterns and ignoredDirs', async () => {
            const basePath = './src/tmp/moodle/v/4.5';
            const pathPatterns = ['**/classes/external/*.php'];
            const customIgnored = ['vendor', 'node_modules'];

            const mockFiles = [
                './src/tmp/moodle/v/4.5/mod/forum/classes/external/discussion_list.php'
            ];

            (child_process.exec as unknown as jest.Mock).mockImplementation((
                command: string,
                callback: (
                    error: Error | null,
                    result: { stdout: string; stderr: string }
                ) => void
            ) => {
                expect(command).toContain(
                    `-path "${pathPatterns[0]}"`
                );

                expect(command).toContain(
                    '-name "vendor" -o -name "node_modules"'
                );

                callback(null, {
                    stdout: mockFiles.join('\n') + '\n',
                    stderr: ''
                });
            });

            const result = await findFiles(
                basePath,
                pathPatterns,
                customIgnored
            );

            expect(result).toEqual(mockFiles);
        });

        it('should allow scanning with multiple path patterns simultaneously', async () => {
            const basePath = './src/tmp/moodle/v/4.5';

            const pathPatterns = [
                '*/db/services.php',
                '*/classes/external/*.php'
            ];

            const mockFiles = [
                './src/tmp/moodle/v/4.5/user/db/services.php',
                './src/tmp/moodle/v/4.5/mod/forum/db/services.php',
                './src/tmp/moodle/v/4.5/mod/forum/classes/external/discussion_list.php'
            ];

            (child_process.exec as unknown as jest.Mock).mockImplementation((
                command: string,
                callback: (
                    error: Error | null,
                    result: { stdout: string; stderr: string }
                ) => void
            ) => {
                expect(command).toContain(`find ${basePath}`);
                expect(command).toContain('-path "*/db/services.php"');
                expect(command).toContain('-path "*/classes/external/*.php"');
                expect(command).toContain(' -o ');

                callback(null, {
                    stdout: mockFiles.join('\n') + '\n',
                    stderr: ''
                });
            });

            const result = await findFiles(
                basePath,
                pathPatterns
            );

            expect(result).toEqual(mockFiles);
        });

        it('should allow scanning without pruning any directory when ignoredDirs is empty', async () => {
            const basePath = './src/tmp/moodle/v/4.5';
            const pathPattern = '*/db/services.php';

            const mockFiles = [
                './src/tmp/moodle/v/4.5/user/db/services.php',
                './src/tmp/moodle/v/4.5/vendor/some_package/db/services.php'
            ];

            (child_process.exec as unknown as jest.Mock).mockImplementation((
                command: string,
                callback: (
                    error: Error | null,
                    result: { stdout: string; stderr: string }
                ) => void
            ) => {
                expect(command).toContain(`find ${basePath}`);
                expect(command).toContain('-type f');
                expect(command).toContain(`-path "${pathPattern}"`);
                expect(command).not.toContain('-prune');

                callback(null, {
                    stdout: mockFiles.join('\n') + '\n',
                    stderr: ''
                });
            });

            const result = await findFiles(
                basePath,
                [pathPattern],
                []
            );

            expect(result).toEqual(mockFiles);
        });

        it('should return empty array when no results are found', async () => {
            const basePath = './src/tmp/moodle/v/4.5';

            const pathPatterns = [
                '*/db/services.php',
                '*/classes/external/*.php'
            ];

            (child_process.exec as unknown as jest.Mock).mockImplementation((
                _command: string,
                callback: (
                    error: Error | null,
                    result: { stdout: string; stderr: string }
                ) => void
            ) => {
                callback(null, {
                    stdout: '',
                    stderr: ''
                });
            });

            const result = await findFiles(
                basePath,
                pathPatterns
            );

            expect(result).toEqual([]);
        });

        it('should capture execution errors, log error and return empty array', async () => {
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            const basePath = 'invalid/path';

            const pathPatterns = [
                '*/db/services.php',
                '*/classes/external/*.php'
            ];

            (child_process.exec as unknown as jest.Mock).mockImplementation((
                _command: string,
                callback: (
                    error: Error | null,
                    result: { stdout: string; stderr: string }
                ) => void
            ) => {
                callback(
                    new Error('Command failed'),
                    {
                        stdout: '',
                        stderr: 'Error'
                    }
                );
            });

            const result = await findFiles(
                basePath,
                pathPatterns
            );

            expect(result).toEqual([]);

            expect(consoleSpy).toHaveBeenCalledWith(
                'Error during file scanning phase:',
                expect.any(Error)
            );

            consoleSpy.mockRestore();
        });

    });

    describe('trimPhpFunction', () => {

        it('should extract a single function block from raw PHP content and wrap in php tags', () => {
            const phpSource = `
                <?php
                function unneeded_function() {
                    return false;
                }
                function get_plugin_types($fullpaths=true) {
                    $info = array('mod' => 'mod', 'auth' => 'auth');
                    return $info;
                }
                function another_function() {
                    return true;
                }
            `;

            const trimmed = trimPhpFunction(phpSource, 'get_plugin_types');

            expect(trimmed).toBeDefined();
            expect(trimmed).toContain('<?php');
            expect(trimmed).toContain('function get_plugin_types');
            expect(trimmed).toContain("'mod' => 'mod'");
            expect(trimmed).not.toContain('unneeded_function');
            expect(trimmed).not.toContain('another_function');
        });

        it('should return null when target function is not found in source', () => {
            const phpSource = '<?php function hello() { return "world"; }';
            const trimmed = trimPhpFunction(phpSource, 'non_existent_function');

            expect(trimmed).toBeNull();
        });

        it('should correctly handle nested braces within function body', () => {
            const phpSource = `
                function complex_function() {
                    if (true) {
                        for ($i = 0; $i < 10; $i++) {
                            $x = 1;
                        }
                    }
                    return $x;
                }
            `;

            const trimmed = trimPhpFunction(phpSource, 'complex_function');

            expect(trimmed).toBeDefined();
            expect(trimmed).toContain('for ($i = 0; $i < 10; $i++)');
        });

    });

});