import fs from 'fs';
import os from 'os';
import path from 'path';
import { extractBatchSignatures } from '../../../src/webservice-extractor/adapter/batch-signature-extractor';
import { setPhpBinaryPath } from '../../../src/webservice-extractor/adapter/php-runtime';
import { BatchServiceItem } from '../../../src/webservice-extractor/interfaces/batch.interfaces';

const SLOW_CLASS = `<?php
namespace local_slow\\external;

class probe {
    public static function slow_parameters() {
        if (getenv('MOODLE_SCHEMAS_DATAROOT') !== false && !file_exists(getenv('MOODLE_SCHEMAS_DATAROOT') . '/slow-once')) {
            touch(getenv('MOODLE_SCHEMAS_DATAROOT') . '/slow-once');
            sleep(3);
        }
        return (object)['keys' => []];
    }
    public static function slow_returns() {
        return null;
    }
    public static function fast_parameters() {
        return (object)['keys' => []];
    }
    public static function fast_returns() {
        return (object)['type' => 'int', 'desc' => 'Fast', 'required' => 1];
    }
}
`;

function item(serviceName: string, methodname: string): BatchServiceItem {
    return {
        serviceName,
        classFile: 'local/slow/classes/external/probe.php',
        classname: 'local_slow\\external\\probe',
        methodname
    };
}

describe('Integration Test: batch runner resilience', () => {
    let moodleRoot: string;
    let dataroot: string;

    beforeEach(() => {
        moodleRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'batch_resilience_'));
        dataroot = path.join(moodleRoot, '.dataroot');
        fs.mkdirSync(dataroot);
        fs.writeFileSync(path.join(moodleRoot, 'version.php'), "<?php\n$version = 2024100700.00;\n$release = '4.5';\n");
        const classDir = path.join(moodleRoot, 'local/slow/classes/external');
        fs.mkdirSync(classDir, { recursive: true });
        fs.writeFileSync(path.join(classDir, 'probe.php'), SLOW_CLASS);
    });

    afterEach(() => {
        setPhpBinaryPath(null);
        fs.rmSync(moodleRoot, { recursive: true, force: true });
    });

    it('times out only the stalled service and recovers the remaining ones through isolated fallback', async () => {
        const result = await extractBatchSignatures(
            [item('stalled', 'slow'), item('after_stall_1', 'fast'), item('after_stall_2', 'fast')],
            moodleRoot,
            1000,
            undefined,
            { dataroot, concurrency: 2 }
        );

        expect(result.errors.get('stalled')?.message).toContain('Execution timed out after 1000 ms');
        expect(result.signatures.has('after_stall_1')).toBe(true);
        expect(result.signatures.has('after_stall_2')).toBe(true);
        expect(result.uncompleted).toEqual([]);
    }, 20000);

    it('reports a structured error instead of crashing when the PHP binary cannot be spawned', async () => {
        setPhpBinaryPath('/nonexistent/bin/php-missing');

        const result = await extractBatchSignatures([item('a', 'fast'), item('b', 'fast')], moodleRoot);

        expect(result.signatures.size).toBe(0);
        expect(result.errors.get('a')?.message).toContain('Failed to start PHP batch runner');
        expect(result.errors.get('b')?.message).toContain('Failed to start PHP batch runner');
    });
});
