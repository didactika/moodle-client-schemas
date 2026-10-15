import fs from 'fs';
import os from 'os';
import path from 'path';
import {
    prepareExtractionRuntime,
    disposeExtractionRuntime,
    requiresLegacyNormalization
} from '../../../../src/webservice-extractor/adapter/extraction-runtime';
import { clearVersionCache } from '../../../../src/webservice-extractor/resolver/version-resolver';
import { clearAstCache } from '../../../../src/webservice-extractor/cache/ast-manager';

const LEGACY_SOURCE = '<?php\n$email = "x";\nif ($email{0} === "x") {}\n';

function createMoodle(release: string): string {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'runtime_moodle_'));
    fs.writeFileSync(path.join(root, 'version.php'), `<?php\n$version = 2019111800.00;\n$release = '${release}';\n`);
    fs.mkdirSync(path.join(root, 'lib'));
    fs.writeFileSync(path.join(root, 'lib/legacy.php'), LEGACY_SOURCE);
    fs.mkdirSync(path.join(root, '.git'));
    fs.writeFileSync(path.join(root, '.git/HEAD'), 'ref: refs/heads/main\n');
    return root;
}

describe('Unit Test: ephemeral extraction runtime', () => {
    const roots: string[] = [];

    afterEach(() => {
        clearVersionCache();
        clearAstCache();
        for (const root of roots.splice(0)) {
            fs.rmSync(root, { recursive: true, force: true });
        }
    });

    it('detects legacy (< 4.0) releases', async () => {
        const legacy = createMoodle('3.9 (Build: 20200615)');
        const modern = createMoodle('4.5 (Build: 20241007)');
        roots.push(legacy, modern);
        expect(await requiresLegacyNormalization(legacy)).toBe(true);
        expect(await requiresLegacyNormalization(modern)).toBe(false);
    });

    it('uses the original root for modern Moodle and removes its scratch directory on disposal', async () => {
        const modern = createMoodle('4.5 (Build: 20241007)');
        roots.push(modern);
        const before = fs.readdirSync(modern).sort();

        const runtime = await prepareExtractionRuntime(modern);
        expect(runtime.moodleRoot).toBe(modern);
        expect(fs.existsSync(runtime.dataroot)).toBe(true);

        await disposeExtractionRuntime(runtime);
        expect(fs.existsSync(runtime.workDir)).toBe(false);
        expect(fs.readdirSync(modern).sort()).toEqual(before);
    });

    it('normalizes a disposable copy of legacy Moodle without modifying the original tree', async () => {
        const legacy = createMoodle('3.9 (Build: 20200615)');
        roots.push(legacy);
        const before = fs.readdirSync(legacy).sort();

        const runtime = await prepareExtractionRuntime(legacy);
        try {
            expect(runtime.moodleRoot).not.toBe(legacy);
            expect(runtime.moodleRoot.startsWith(runtime.workDir)).toBe(true);
            expect(fs.readFileSync(path.join(runtime.moodleRoot, 'lib/legacy.php'), 'utf8')).toContain('$email[0]');
            expect(fs.existsSync(path.join(runtime.moodleRoot, '.git'))).toBe(false);

            expect(fs.readFileSync(path.join(legacy, 'lib/legacy.php'), 'utf8')).toBe(LEGACY_SOURCE);
            expect(fs.readdirSync(legacy).sort()).toEqual(before);
        } finally {
            await disposeExtractionRuntime(runtime);
        }
        expect(fs.existsSync(runtime.workDir)).toBe(false);
    });

    it('normalizes symlinked plugins inside the copy without writing through to the link target', async () => {
        const legacy = createMoodle('3.9 (Build: 20200615)');
        const external = fs.mkdtempSync(path.join(os.tmpdir(), 'runtime_external_plugin_'));
        roots.push(legacy, external);
        fs.writeFileSync(path.join(external, 'lib.php'), LEGACY_SOURCE);
        fs.mkdirSync(path.join(legacy, 'local'));
        fs.symlinkSync(external, path.join(legacy, 'local/linked'), 'dir');

        const runtime = await prepareExtractionRuntime(legacy);
        try {
            const copied = path.join(runtime.moodleRoot, 'local/linked');
            expect(fs.lstatSync(copied).isSymbolicLink()).toBe(false);
            expect(fs.readFileSync(path.join(copied, 'lib.php'), 'utf8')).toContain('$email[0]');
            expect(fs.readFileSync(path.join(external, 'lib.php'), 'utf8')).toBe(LEGACY_SOURCE);
        } finally {
            await disposeExtractionRuntime(runtime);
        }
    });
});
