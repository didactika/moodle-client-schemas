import { extractServices } from '../../../../src/webservice-extractor/extractor/service-extractor';
import { MoodleService } from '../../../../src/webservice-extractor/interfaces/service-extractor.interfaces';

// Valid Fixtures
import formatStandardMoodle2 from '../../../fixtures/services/format-standard-moodle-2.json';
import formatStandardMoodle5 from '../../../fixtures/services/format-standard-moodle-5.json';
import formatValidNullable from '../../../fixtures/services/format-valid-nullable-fields.json';

// Corrupted / Invalid Fixtures
import corruptMissingClassname from '../../../fixtures/services/format-corrupt-missing-classname.json';
import corruptNotArray from '../../../fixtures/services/format-corrupt-not-array.json';
import corruptEntryNotArray from '../../../fixtures/services/format-corrupt-entry-not-array.json';

describe('Unit Test: service-extractor', () => {

    describe('Valid Cases (Happy Paths & Moodle Evolution)', () => {

        it('should extract services with legacy format (Moodle 2.x - 3.x with classpath and explicit methodname)', () => {
            const services: MoodleService[] = extractServices(formatStandardMoodle2);

            expect(services).toEqual([
                {
                    name: 'moodle_enrol_manual_enrol_users',
                    classname: 'moodle_enrol_manual_external',
                    methodname: 'manual_enrol_users',
                    classpath: 'enrol/manual/externallib.php',
                    description: 'Manual enrol users',
                    type: 'write'
                }
            ]);
        });

        it('should extract modern services (Moodle >= 4.0 with ::class and implicit "execute" methodname)', () => {
            const services: MoodleService[] = extractServices(formatStandardMoodle5);

            expect(services).toEqual([
                {
                    name: 'aiplacement_editor_generate_image',
                    classname: '\\aiplacement_editor\\external\\generate_image',
                    methodname: 'execute',
                    description: 'Generate image for the HTML Text editor AI Placement'
                },
                {
                    name: 'aiplacement_editor_generate_text',
                    classname: '\\aiplacement_editor\\external\\generate_text',
                    methodname: 'execute',
                    description: 'Generate text for the HTML Text editor AI Placement'
                }
            ]);
        });

        it('should accept null description, custom string type, and minimal service definitions', () => {
            const services: MoodleService[] = extractServices(formatValidNullable);

            expect(services).toEqual([
                {
                    name: 'core_course_get_contents',
                    classname: 'core_course_external',
                    methodname: 'execute',
                    type: 'custom_query_type',
                    description: null
                },
                {
                    name: 'core_minimal_service',
                    classname: 'core_minimal_external',
                    methodname: 'execute'
                }
            ]);
        });
    });

    describe('Corrupted / Invalid Cases (Edge Cases)', () => {

        it('should discard service entries that do not declare "classname"', () => {
            const services = extractServices(corruptMissingClassname);
            expect(services).toEqual([]);
        });

        it('should return an empty array if $functions is not an array', () => {
            const services = extractServices(corruptNotArray);
            expect(services).toEqual([]);
        });

        it('should discard entries whose inner definition is not an associative array structure', () => {
            const services = extractServices(corruptEntryNotArray);
            expect(services).toEqual([]);
        });

        it('should handle empty, null, or undefined AST structures safely', () => {
            expect(extractServices({})).toEqual([]);
            expect(extractServices({ kind: 'program', children: [] })).toEqual([]);
            expect(extractServices(null)).toEqual([]);
            expect(extractServices(undefined)).toEqual([]);
        });
    });

});
