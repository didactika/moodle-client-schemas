import path from 'path';
import { extractWebservice } from '../../../src/webservice-extractor';
import * as Scanner from '../../../src/webservice-extractor/scanner/scanner';
import * as AstManager from '../../../src/webservice-extractor/cache/ast-manager';
import * as ServiceExtractor from '../../../src/webservice-extractor/extractor/service-extractor';
import * as ClassResolver from '../../../src/webservice-extractor/resolver/class-resolver';
import * as PhpSignatureExtractor from '../../../src/webservice-extractor/adapter/php-signature-extractor';

jest.mock('../../../src/webservice-extractor/scanner/scanner');
jest.mock('../../../src/webservice-extractor/cache/ast-manager');
jest.mock('../../../src/webservice-extractor/extractor/service-extractor');
jest.mock('../../../src/webservice-extractor/resolver/class-resolver');
jest.mock('../../../src/webservice-extractor/adapter/php-signature-extractor');

describe('Integration Flow: extractWebservice (Functional Pipeline)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should orchestrate sequential communication between all extractor modules and return schemas', async () => {
        const moodlePath = path.resolve('./test/fixtures/mock_moodle');

        (Scanner.findFiles as jest.Mock).mockResolvedValue([
            './test/fixtures/mock_moodle/mod/sample/db/services.php'
        ]);

        const mockServicesAst = { type: 'Program', body: [] };
        (AstManager.getAst as jest.Mock).mockResolvedValue(mockServicesAst);

        const mockService = {
            name: 'mod_sample_get_items',
            classname: 'test_fixtures\\external\\sample_service_with_exporter',
            type: 'read',
            methodname: 'get_items',
            description: 'Get sample items from fixture'
        };
        (ServiceExtractor.extractServices as jest.Mock).mockReturnValue([mockService]);

        (ClassResolver.resolveClass as jest.Mock).mockResolvedValue(
            'mod/sample/classes/external/sample_service_with_exporter.php'
        );

        const mockSignature = {
            parameters: { keys: { courseid: { type: 'int' } } },
            returns: { keys: { items: { type: 'array' } } }
        };
        (PhpSignatureExtractor.extractWebserviceSignature as jest.Mock).mockResolvedValue(mockSignature);

        const schemas = await extractWebservice({
            moodlePath,
            services: ['*']
        });

        expect(Scanner.findFiles).toHaveBeenCalledWith(moodlePath, ['*/db/services.php']);
        expect(AstManager.getAst).toHaveBeenCalledWith('./test/fixtures/mock_moodle/mod/sample/db/services.php', moodlePath);
        expect(ServiceExtractor.extractServices).toHaveBeenCalledWith(mockServicesAst);
        expect(ClassResolver.resolveClass).toHaveBeenCalledWith(mockService, moodlePath);
        expect(PhpSignatureExtractor.extractWebserviceSignature).toHaveBeenCalledWith({
            moodlePath,
            classFile: 'mod/sample/classes/external/sample_service_with_exporter.php',
            classname: 'test_fixtures\\external\\sample_service_with_exporter',
            methodname: 'get_items'
        });

        expect(schemas).toEqual([
            {
                name: 'mod_sample_get_items',
                description: 'Get sample items from fixture',
                parameters: mockSignature.parameters,
                returns: mockSignature.returns
            }
        ]);
    });

    it('should handle unresolvable service classes by omitting them from final result', async () => {
        const moodlePath = path.resolve('./test/fixtures/mock_moodle');

        (Scanner.findFiles as jest.Mock).mockResolvedValue(['./test/fixtures/mock_moodle/unknown/db/services.php']);
        (AstManager.getAst as jest.Mock).mockResolvedValue({ type: 'Program' });

        const unresolvableService = {
            name: 'unknown_service',
            classname: 'unknown_class'
        };
        (ServiceExtractor.extractServices as jest.Mock).mockReturnValue([unresolvableService]);
        (ClassResolver.resolveClass as jest.Mock).mockResolvedValue(null);

        const schemas = await extractWebservice({ moodlePath });

        expect(PhpSignatureExtractor.extractWebserviceSignature).not.toHaveBeenCalled();
        expect(schemas).toHaveLength(0);
    });

});
