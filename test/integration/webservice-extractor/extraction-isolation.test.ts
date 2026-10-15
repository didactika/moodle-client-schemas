import fs from 'fs';
import os from 'os';
import path from 'path';
import { extractWebservice } from '../../../src/webservice-extractor';

const FIXTURE_MOODLE = path.resolve(__dirname, '../../fixtures/mock_moodle');

function listTree(dir: string): string[] {
    return fs.readdirSync(dir, { recursive: true }).map(String).sort();
}


describe('Integration Test: extraction isolation', () => {
    // Private copy: other suites temporarily add decoy files to the shared fixture.
    let MOCK_MOODLE: string;

    beforeAll(() => {
        MOCK_MOODLE = fs.mkdtempSync(path.join(os.tmpdir(), 'isolation_moodle_'));
        fs.cpSync(FIXTURE_MOODLE, MOCK_MOODLE, { recursive: true });
    });

    afterAll(() => {
        fs.rmSync(MOCK_MOODLE, { recursive: true, force: true });
    });

    it('does not write anything into the Moodle codebase and removes its scratch directory', async () => {
        const treeBefore = listTree(MOCK_MOODLE);
        const privateTmp = fs.mkdtempSync(path.join(os.tmpdir(), 'isolation_tmp_'));
        const originalTmpdir = process.env.TMPDIR;
        process.env.TMPDIR = privateTmp;
        try {
            const result = await extractWebservice({ moodlePath: MOCK_MOODLE });

            expect(result.errors).toEqual([]);
            expect(result.schemas.length).toBeGreaterThan(0);
            expect(listTree(MOCK_MOODLE)).toEqual(treeBefore);
            expect(fs.readdirSync(privateTmp)).toEqual([]);
        } finally {
            process.env.TMPDIR = originalTmpdir;
            fs.rmSync(privateTmp, { recursive: true, force: true });
        }
    });

    it('supports concurrent extractions in the same process without clobbering shared state', async () => {
        const [first, second, third] = await Promise.all([
            extractWebservice({ moodlePath: MOCK_MOODLE }),
            extractWebservice({ moodlePath: MOCK_MOODLE, services: ['mod_sample_*'] }),
            extractWebservice({ moodlePath: MOCK_MOODLE })
        ]);

        for (const result of [first, second, third]) {
            expect(result.errors).toEqual([]);
            expect(result.schemas.map((s) => s.name)).toEqual(first.schemas.map((s) => s.name));
        }
    });

    it('returns a structured error instead of rejecting when a services.php file cannot be read', async () => {
        const root = fs.mkdtempSync(path.join(os.tmpdir(), 'unreadable_services_'));
        try {
            fs.cpSync(FIXTURE_MOODLE, root, { recursive: true });
            const blocked = path.join(root, 'mod/sample/db/services.php');
            fs.rmSync(blocked);
            fs.mkdirSync(path.join(root, 'local/broken/db'), { recursive: true });
            fs.writeFileSync(path.join(root, 'local/broken/db/services.php'), '<?php $functions = [];');
            fs.chmodSync(path.join(root, 'local/broken/db/services.php'), 0o000);

            const result = await extractWebservice({ moodlePath: root });

            const fileError = result.errors.find((e) => e.classFile?.endsWith('local/broken/db/services.php'));
            if (process.getuid && process.getuid() === 0) {
                expect(fileError).toBeUndefined();
            } else {
                expect(fileError?.code).toBe('PERMISSION_DENIED');
            }
        } finally {
            fs.chmodSync(path.join(root, 'local/broken/db/services.php'), 0o644);
            fs.rmSync(root, { recursive: true, force: true });
        }
    });
});
