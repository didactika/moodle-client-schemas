import { extractWebServices } from '../../../src/webservice-extractor';
import { ExtractorConfig } from '../../../src/webservice-extractor/interfaces/extractor.interfaces';

import * as Scanner from '../../../src/webservice-extractor/scanner/scanner';
import * as AstManager from '../../../src/webservice-extractor/cache/ast-manager';
import * as ServiceExtractor from '../../../src/webservice-extractor/extractor/service-extractor';
import * as ClassResolver from '../../../src/webservice-extractor/resolver/class-resolver';
import * as PhpSignatureExtractor from '../../../src/webservice-extractor/adapter/php-signature-extractor';
import * as JsonGenerator from '../../../src/webservice-extractor/generator/json-generator';
import * as VersionResolver from '../../../src/webservice-extractor/resolver/version-resolver';

jest.mock('../../../src/webservice-extractor/scanner/scanner');
jest.mock('../../../src/webservice-extractor/cache/ast-manager');
jest.mock('../../../src/webservice-extractor/extractor/service-extractor');
jest.mock('../../../src/webservice-extractor/resolver/version-resolver');
jest.mock('../../../src/webservice-extractor/resolver/class-resolver');
jest.mock('../../../src/webservice-extractor/adapter/php-signature-extractor');
jest.mock('../../../src/webservice-extractor/generator/json-generator');

describe('Integration Flow: extractWebServices (Functional Pipeline)', () => {

    beforeEach(() => {
        (VersionResolver.resolveVersion as jest.Mock).mockResolvedValue('4.5.0');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should orchestrate sequential communication between all extractor modules', async () => {
        const config: ExtractorConfig = {
            version: '4.5',
            moodlePath: './test/fixtures/mock_moodle',
            outputPath: './schemas/v/4.5.json'
        };

        (Scanner.findFiles as jest.Mock).mockResolvedValue([
            './test/fixtures/mock_moodle/mod/sample/db/services.php'
        ]);

        const mockServicesAst = { type: 'Program', body: [] };
        (AstManager.getAst as jest.Mock).mockResolvedValueOnce(mockServicesAst);

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
        (JsonGenerator.saveJson as jest.Mock).mockResolvedValue(undefined);

        const result = await extractWebServices(config);

        expect(Scanner.findFiles).toHaveBeenCalledWith(config.moodlePath, ['*/db/services.php']);
        expect(AstManager.getAst).toHaveBeenCalledWith('./test/fixtures/mock_moodle/mod/sample/db/services.php', config.moodlePath);
        expect(ServiceExtractor.extractServices).toHaveBeenCalledWith(mockServicesAst);
        expect(ClassResolver.resolveClass).toHaveBeenCalledWith(mockService, config.moodlePath);
        expect(PhpSignatureExtractor.extractWebserviceSignature).toHaveBeenCalledWith({
            moodlePath: config.moodlePath,
            classFile: 'mod/sample/classes/external/sample_service_with_exporter.php',
            classname: 'test_fixtures\\external\\sample_service_with_exporter',
            methodname: 'get_items'
        });

        const expectedSchema = {
            name: 'mod_sample_get_items',
            description: 'Get sample items from fixture',
            parameters: mockSignature.parameters,
            returns: mockSignature.returns
        };
        expect(JsonGenerator.saveJson).toHaveBeenCalledWith([expectedSchema], config.outputPath);

        expect(result).toEqual({
            version: '4.5.0',
            totalServices: 1,
            outputPath: config.outputPath
        });
    });

    it('should handle unresolvable service classes by omitting them from final result', async () => {
        const config: ExtractorConfig = {
            version: '4.5',
            moodlePath: './test/fixtures/mock_moodle',
            outputPath: './schemas/v/4.5.json'
        };

        (Scanner.findFiles as jest.Mock).mockResolvedValue(['./test/fixtures/mock_moodle/unknown/db/services.php']);
        (AstManager.getAst as jest.Mock).mockResolvedValue({ type: 'Program' });

        const unresolvableService = {
            name: 'unknown_service',
            classname: 'unknown_class'
        };
        (ServiceExtractor.extractServices as jest.Mock).mockReturnValue([unresolvableService]);
        (ClassResolver.resolveClass as jest.Mock).mockResolvedValue(null);

        const result = await extractWebServices(config);

        expect(PhpSignatureExtractor.extractWebserviceSignature).not.toHaveBeenCalled();
        expect(JsonGenerator.saveJson).toHaveBeenCalledWith([], config.outputPath);
        expect(result.totalServices).toBe(0);
    });

});
