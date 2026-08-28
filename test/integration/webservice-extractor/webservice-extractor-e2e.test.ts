import path from 'path';
import fs from 'fs/promises';
import { extractWebServices } from '../../../src/webservice-extractor';
import { WebServiceSchema } from '../../../src/webservice-extractor/interfaces/schema-extractor.interfaces';
import { ObjectSchemaNode, ValueSchemaNode, ArraySchemaNode } from '../../../src/webservice-extractor/interfaces/signature.interfaces';

const MOCK_MOODLE_DIR = path.resolve(__dirname, '../../fixtures/mock_moodle');
const OUTPUT_PATH = path.resolve(__dirname, '../../fixtures/mock_moodle/output_e2e_test.json');

describe('Integration E2E: extractWebServices (Live Pipeline with Mock Moodle Fixture)', () => {

    afterAll(async () => {
        try {
            await fs.unlink(OUTPUT_PATH);
        } catch {
            // Ignore if file was not created.
        }
    });

    it('should scan services.php, resolve class, execute PHP adapter and output schemas JSON', async () => {
        const result = await extractWebServices({
            version: '4.5.0',
            moodlePath: MOCK_MOODLE_DIR,
            outputPath: OUTPUT_PATH
        });

        expect(result.version).toBe('4.5.0');
        expect(result.totalServices).toBe(1);
        expect(result.outputPath).toBe(OUTPUT_PATH);

        const rawContent = await fs.readFile(OUTPUT_PATH, 'utf-8');
        const schemas = JSON.parse(rawContent) as WebServiceSchema[];

        expect(schemas).toHaveLength(1);
        const service = schemas[0];
        expect(service.name).toBe('mod_sample_get_items');
        expect(service.description).toBe('Get sample items from fixture');

        const params = service.parameters as ObjectSchemaNode;
        const courseId = params.keys.courseid as ValueSchemaNode;
        expect(courseId.type).toBe('int');

        const returns = service.returns as ObjectSchemaNode;
        const itemsArray = returns.keys.items as ArraySchemaNode;
        const itemContent = itemsArray.content as ObjectSchemaNode;
        const idProp = itemContent.keys.id as ValueSchemaNode;
        expect(idProp.type).toBe('int');
        const titleProp = itemContent.keys.title as ValueSchemaNode;
        expect(titleProp.type).toBe('text');
        expect(returns.keys.warnings).toBeDefined();
    });

});
