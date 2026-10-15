import fs from 'fs';
import os from 'os';
import path from 'path';
import { findFiles, findFirstFile, trimPhpFunction } from '../../../../src/webservice-extractor/scanner/scanner';

describe('Unit Test: scanner (Cross-Platform Node.js Filesystem Walker)', () => {

    describe('findFiles', () => {

        it('should discover service files in fixtures matching glob pattern', async () => {
            const fixturePath = path.resolve('./test/fixtures/mock_moodle');
            const results = await findFiles(fixturePath, ['*/db/services.php']);

            expect(results.length).toBeGreaterThanOrEqual(1);
            expect(results.some(r => r.endsWith('services.php'))).toBe(true);
        });

        it('should return empty array when path does not exist', async () => {
            const nonExistent = path.resolve('./non_existent_folder_xyz');
            const results = await findFiles(nonExistent, ['*/db/services.php']);

            expect(results).toEqual([]);
        });

        it('should support findFirstFile', async () => {
            const fixturePath = path.resolve('./test/fixtures/mock_moodle');
            const result = await findFirstFile(fixturePath, 'services.php');

            expect(result).toBeDefined();
            expect(result).toContain('services.php');
        });

        it('should return null when findFirstFile finds nothing', async () => {
            const fixturePath = path.resolve('./test/fixtures/mock_moodle');
            const result = await findFirstFile(fixturePath, 'totally_non_existent_file.xyz');

            expect(result).toBeNull();
        });

    });

    describe('findFiles plugin coverage', () => {
        let root: string;
        let external: string;

        const touch = (file: string) => {
            fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, '<?php $functions = [];\n');
        };

        beforeEach(() => {
            root = fs.mkdtempSync(path.join(os.tmpdir(), 'scanner_root_'));
            external = fs.mkdtempSync(path.join(os.tmpdir(), 'scanner_external_'));
        });

        afterEach(() => {
            fs.rmSync(root, { recursive: true, force: true });
            fs.rmSync(external, { recursive: true, force: true });
        });

        it('discovers services declared by theme and cache store plugins', async () => {
            touch(path.join(root, 'theme/custom/db/services.php'));
            touch(path.join(root, 'cache/stores/custom/db/services.php'));
            touch(path.join(root, 'public/theme/other/db/services.php'));

            const results = await findFiles(root, ['*/db/services.php']);

            expect(results.map(r => path.relative(root, r)).sort()).toEqual([
                'cache/stores/custom/db/services.php',
                'public/theme/other/db/services.php',
                'theme/custom/db/services.php'
            ]);
        });

        it('still prunes test fixtures and vendored code', async () => {
            touch(path.join(root, 'lib/tests/fixtures/fake/db/services.php'));
            touch(path.join(root, 'local/x/vendor/lib/db/services.php'));
            touch(path.join(root, 'local/x/db/services.php'));

            const results = await findFiles(root, ['*/db/services.php']);

            expect(results.map(r => path.relative(root, r))).toEqual(['local/x/db/services.php']);
        });

        it('follows symlinked plugin directories and reports them under the scanned root', async () => {
            touch(path.join(external, 'db/services.php'));
            fs.mkdirSync(path.join(root, 'local'));
            fs.symlinkSync(external, path.join(root, 'local/linked'), 'dir');

            const results = await findFiles(root, ['*/db/services.php']);

            expect(results).toEqual([path.join(root, 'local/linked/db/services.php')]);
        });

        it('follows symlinked files and skips dangling links', async () => {
            touch(path.join(external, 'services.php'));
            fs.mkdirSync(path.join(root, 'local/x/db'), { recursive: true });
            fs.symlinkSync(path.join(external, 'services.php'), path.join(root, 'local/x/db/services.php'));
            fs.mkdirSync(path.join(root, 'local/y/db'), { recursive: true });
            fs.symlinkSync(path.join(external, 'missing.php'), path.join(root, 'local/y/db/services.php'));

            const results = await findFiles(root, ['*/db/services.php']);

            expect(results).toEqual([path.join(root, 'local/x/db/services.php')]);
        });

        it('terminates on symlink cycles and does not report the same tree twice', async () => {
            touch(path.join(root, 'local/x/db/services.php'));
            fs.symlinkSync(root, path.join(root, 'local/x/loop'), 'dir');
            fs.symlinkSync(path.join(root, 'local/x'), path.join(root, 'local/alias'), 'dir');

            const results = await findFiles(root, ['*/db/services.php']);

            expect(results).toHaveLength(1);
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