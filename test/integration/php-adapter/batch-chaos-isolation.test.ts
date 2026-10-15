import fs from 'fs';
import os from 'os';
import path from 'path';
import { extractBatchSignatures } from '../../../src/webservice-extractor/adapter/batch-signature-extractor';
import { BatchServiceItem } from '../../../src/webservice-extractor/interfaces/batch.interfaces';

const FIXTURE_MOODLE = path.resolve(__dirname, '../../fixtures/mock_moodle');

describe('Chaos Engineering Test: Surgical Crash Isolation (die / exit Recovery)', () => {
    // The decoy is planted in a private copy: writing into the shared fixture races with suites
    // that scan it concurrently in other Jest workers.
    let MOCK_MOODLE: string;

    beforeAll(() => {
        MOCK_MOODLE = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'chaos_moodle_')), 'moodle');
        fs.cpSync(FIXTURE_MOODLE, MOCK_MOODLE, { recursive: true });
        const CHAOS_FILE = path.join(MOCK_MOODLE, 'mod/sample/classes/external/chaos_decoy_service.php');
        const phpContent = `<?php
class chaos_decoy_service {
    public static function execute_parameters() {
        die("CHAOS INJECTION: Fatal simulated process termination");
    }
}
`;
        fs.writeFileSync(CHAOS_FILE, phpContent, 'utf-8');
    });

    afterAll(() => {
        fs.rmSync(path.dirname(MOCK_MOODLE), { recursive: true, force: true });
    });

    it('should isolate crash from die(), record error diagnostic, and successfully extract healthy services', async () => {
        const validItem: BatchServiceItem = {
            serviceName: 'mod_sample_get_items',
            classFile: 'mod/sample/classes/external/sample_service_with_exporter.php',
            classname: 'mod_sample\\external\\sample_service_with_exporter',
            methodname: 'get_items'
        };

        const chaosItem: BatchServiceItem = {
            serviceName: 'chaos_decoy_killer',
            classFile: 'mod/sample/classes/external/chaos_decoy_service.php',
            classname: 'chaos_decoy_service',
            methodname: 'execute'
        };

        const items: BatchServiceItem[] = [
            { ...validItem, serviceName: 'healthy_before_1' },
            { ...validItem, serviceName: 'healthy_before_2' },
            chaosItem,
            { ...validItem, serviceName: 'healthy_after_1' },
            { ...validItem, serviceName: 'healthy_after_2' }
        ];

        const result = await extractBatchSignatures(items, MOCK_MOODLE);

        // 1. All healthy services extracted successfully
        expect(result.signatures.has('healthy_before_1')).toBe(true);
        expect(result.signatures.has('healthy_before_2')).toBe(true);
        expect(result.signatures.has('healthy_after_1')).toBe(true);
        expect(result.signatures.has('healthy_after_2')).toBe(true);

        // 2. Crashing decoy is classified as error with diagnostic
        expect(result.errors.has('chaos_decoy_killer')).toBe(true);
        const failure = result.errors.get('chaos_decoy_killer');
        expect(failure?.message).toContain('CHAOS INJECTION');
        expect(failure?.code).toBe('INTROSPECTION_FAILED');

        // 3. Zero uncompleted items remain
        expect(result.uncompleted.length).toBe(0);
    });

});
