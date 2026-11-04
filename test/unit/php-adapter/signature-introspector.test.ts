import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const SCRIPT_PATH = path.resolve(__dirname, '../../../src/php-adapter/batch-cli-executor.php');

interface StreamLine {
    serviceName: string;
    success: boolean;
    error?: string;
    errorCode?: string;
    signature?: { parameters: unknown; returns: unknown };
}

const SERVICE_CLASS = `<?php
namespace local_strict\\external;

class probe {
    public static function get_items_parameters() {
        return (object)['keys' => ['id' => (object)['type' => 'int', 'desc' => 'Item id', 'required' => 1]]];
    }
    public static function get_items_returns() {
        return (object)['type' => 'bool', 'desc' => 'Status', 'required' => 1];
    }
    public static function create_items_parameters() {
        return (object)['keys' => ['name' => (object)['type' => 'text', 'desc' => 'Name', 'required' => 1]]];
    }
    public static function broken_parameters() {
        return (object)['keys' => []];
    }
    public static function broken_returns() {
        throw new \\RuntimeException('database unavailable');
    }
    public static function stubbed_parameters() {
        return (object)['keys' => []];
    }
    public static function stubbed_returns() {
        return \\local_strict\\missing_exporter::get_read_structure();
    }
}
`;

function runBatch(moodleRoot: string, items: object[]): Promise<StreamLine[]> {
    return new Promise((resolve) => {
        const child = spawn('php', [SCRIPT_PATH, '--moodle-root', moodleRoot], { stdio: ['pipe', 'pipe', 'pipe'] });
        let stdout = '';
        child.stdout.on('data', (chunk) => {
            stdout += chunk.toString();
        });
        child.stdin.end(JSON.stringify(items));
        child.on('close', () => {
            resolve(stdout.trim().split('\n').filter(Boolean).map((line) => JSON.parse(line) as StreamLine));
        });
    });
}

function item(serviceName: string, classname: string, methodname: string): object {
    return { serviceName, classFile: 'local/strict/classes/external/probe.php', classname, methodname };
}

describe('Unit Test: strict signature introspection', () => {
    let moodleRoot: string;

    beforeAll(() => {
        moodleRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'strict_introspection_'));
        fs.writeFileSync(path.join(moodleRoot, 'version.php'), "<?php\n$version = 2024100700.00;\n$release = '4.5';\n");
        const classDir = path.join(moodleRoot, 'local/strict/classes/external');
        fs.mkdirSync(classDir, { recursive: true });
        fs.writeFileSync(path.join(classDir, 'probe.php'), SERVICE_CLASS);
    });

    afterAll(() => {
        fs.rmSync(moodleRoot, { recursive: true, force: true });
    });

    it('extracts the signature of an existing class and method', async () => {
        const [line] = await runBatch(moodleRoot, [item('ok', 'local_strict\\external\\probe', 'get_items')]);
        expect(line.success).toBe(true);
        expect(line.signature?.returns).toEqual({ type: 'bool', desc: 'Status', required: 1 });
    });

    it('fails instead of synthesizing a stub when the service class does not exist', async () => {
        const [line] = await runBatch(moodleRoot, [item('typo', 'local_strict\\external\\probee', 'get_items')]);
        expect(line.success).toBe(false);
        expect(line.error).toContain("Class 'local_strict\\external\\probee' was not found");
        expect(line.errorCode).toBe('CLASS_NOT_FOUND');
    });

    it('fails instead of borrowing another method signature when the method does not exist', async () => {
        const [line] = await runBatch(moodleRoot, [item('wrong', 'local_strict\\external\\probe', 'get_itemz')]);
        expect(line.success).toBe(false);
        expect(line.error).toContain('get_itemz_parameters() does not exist');
    });

    it('fails when only the parameters method exists', async () => {
        const [line] = await runBatch(moodleRoot, [item('half', 'local_strict\\external\\probe', 'create_items')]);
        expect(line.success).toBe(false);
        expect(line.error).toContain('create_items_returns() does not exist');
    });

    it('reports exceptions thrown by signature methods instead of returning null', async () => {
        const [line] = await runBatch(moodleRoot, [item('broken', 'local_strict\\external\\probe', 'broken')]);
        expect(line.success).toBe(false);
        expect(line.error).toContain('database unavailable');
        expect(line.errorCode).toBe('INTROSPECTION_FAILED');
    });

    it('fails when the signature depends on synthetic fallback structures', async () => {
        const [line] = await runBatch(moodleRoot, [item('stubbed', 'local_strict\\external\\probe', 'stubbed')]);
        expect(line.success).toBe(false);
        expect(line.error).toContain('synthetic stubs used: local_strict\\missing_exporter::get_read_structure');
    });

    it('reports a missing class file as CLASS_NOT_FOUND', async () => {
        const [line] = await runBatch(moodleRoot, [
            { serviceName: 'nofile', classFile: 'local/strict/classes/external/ghost.php', classname: 'x', methodname: 'execute' }
        ]);
        expect(line.success).toBe(false);
        expect(line.errorCode).toBe('CLASS_NOT_FOUND');
    });

    const runsAsRoot = typeof process.getuid === 'function' && process.getuid() === 0;
    (runsAsRoot ? it.skip : it)('reports an unreadable class file as PERMISSION_DENIED', async () => {
        const locked = path.join(moodleRoot, 'local/strict/classes/external/locked.php');
        fs.writeFileSync(locked, '<?php class locked {}');
        fs.chmodSync(locked, 0o000);
        try {
            const [line] = await runBatch(moodleRoot, [
                { serviceName: 'locked', classFile: 'local/strict/classes/external/locked.php', classname: 'locked', methodname: 'execute' }
            ]);
            expect(line.success).toBe(false);
            expect(line.errorCode).toBe('PERMISSION_DENIED');
        } finally {
            fs.chmodSync(locked, 0o644);
        }
    });

    it('keeps processing healthy services after strict failures in the same batch', async () => {
        const lines = await runBatch(moodleRoot, [
            item('typo', 'local_strict\\external\\probee', 'get_items'),
            item('stubbed', 'local_strict\\external\\probe', 'stubbed'),
            item('ok', 'local_strict\\external\\probe', 'get_items')
        ]);
        expect(lines.map((l) => [l.serviceName, l.success])).toEqual([
            ['typo', false],
            ['stubbed', false],
            ['ok', true]
        ]);
    });

    it('replaces invalid UTF-8 in descriptions instead of dropping the service', async () => {
        const classDir = path.join(moodleRoot, 'local/strict/classes/external');
        fs.writeFileSync(
            path.join(classDir, 'latin.php'),
            Buffer.concat([
                Buffer.from("<?php\nnamespace local_strict\\external;\nclass latin {\n" +
                    "public static function execute_parameters() { return (object)['keys' => []]; }\n" +
                    "public static function execute_returns() { return (object)['type' => 'text', 'desc' => 'Caf"),
                Buffer.from([0xe9]),
                Buffer.from("']; }\n}\n")
            ])
        );
        const [line] = await runBatch(moodleRoot, [
            { serviceName: 'latin', classFile: 'local/strict/classes/external/latin.php', classname: 'local_strict\\external\\latin', methodname: 'execute' }
        ]);
        expect(line.success).toBe(true);
        expect((line.signature?.returns as { desc: string }).desc).toBe('Caf�');
    });
});
