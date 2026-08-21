import { extractWebServices } from '../../../src/webservice-extractor/index';
import { ExtractorConfig } from '../../../src/webservice-extractor/interfaces/extractor.interfaces';

import * as Scanner from '../../../src/webservice-extractor/scanner/scanner';
import * as AstManager from '../../../src/webservice-extractor/cache/ast-manager';
import * as ServiceExtractor from '../../../src/webservice-extractor/extractor/service-extractor';
import * as ClassResolver from '../../../src/webservice-extractor/resolver/class-resolver';
import * as SchemaExtractor from '../../../src/webservice-extractor/extractor/schema-extractor';
import * as JsonGenerator from '../../../src/webservice-extractor/generator/json-generator';

jest.mock('../../../src/webservice-extractor/scanner/scanner');
jest.mock('../../../src/webservice-extractor/cache/ast-manager');
jest.mock('../../../src/webservice-extractor/extractor/service-extractor');
jest.mock('../../../src/webservice-extractor/resolver/class-resolver');
jest.mock('../../../src/webservice-extractor/extractor/schema-extractor');
jest.mock('../../../src/webservice-extractor/generator/json-generator');

describe('Integration Flow: extractWebServices (Functional Pipeline)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should orchestrate sequential communication between all extractor modules', async () => {
        const config: ExtractorConfig = {
            version: '4.5',
            moodlePath: './src/tmp/moodle/v/4.5',
            outputPath: './schemas/v/4.5.json'
        };

        (Scanner.findFiles as jest.Mock).mockResolvedValue([
            './src/tmp/moodle/v/4.5/user/db/services.php'
        ]);

        const mockServicesAst = { type: 'Program', body: [] };
        const mockClassAst = { type: 'ClassDeclaration', body: [] };
        (AstManager.getAst as jest.Mock)
            .mockResolvedValueOnce(mockServicesAst)
            .mockResolvedValueOnce(mockClassAst);

        const mockService = {
            name: 'core_user_create_users',
            classname: 'core_user_external',
            type: 'write',
            methodname: 'create_users',
            classpath: 'user/externallib.php',
            description: ''
        };
        (ServiceExtractor.extractServices as jest.Mock).mockReturnValue([mockService]);

        (ClassResolver.resolveClass as jest.Mock).mockResolvedValue({
            file: './src/tmp/moodle/v/4.5/user/externallib.php',
            classname: 'core_user_external',
            resolution: 'classpath'
        });

        const mockSchema = {
            name: 'core_user_create_users',
            parameters: { users: { type: 'array' } },
            returns: { type: 'array' }
        };
        (SchemaExtractor.extractSchema as jest.Mock).mockReturnValue(mockSchema);
        (JsonGenerator.saveJson as jest.Mock).mockResolvedValue(undefined);

        const result = await extractWebServices(config);

        expect(Scanner.findFiles).toHaveBeenCalledWith(config.moodlePath);
        expect(AstManager.getAst).toHaveBeenCalledWith('./src/tmp/moodle/v/4.5/user/db/services.php', config.moodlePath);
        expect(ServiceExtractor.extractServices).toHaveBeenCalledWith(mockServicesAst);
        expect(ClassResolver.resolveClass).toHaveBeenCalledWith(mockService, config.moodlePath);
        expect(AstManager.getAst).toHaveBeenCalledWith('./src/tmp/moodle/v/4.5/user/externallib.php', config.moodlePath);
        expect(SchemaExtractor.extractSchema).toHaveBeenCalledWith(mockClassAst, mockService);
        expect(JsonGenerator.saveJson).toHaveBeenCalledWith([mockSchema], config.outputPath);

        expect(result).toEqual({
            version: '4.5',
            totalServices: 1,
            outputPath: config.outputPath
        });
    });

    it('should handle unresolvable service classes by omitting them from final result', async () => {
        const config: ExtractorConfig = {
            version: '4.5',
            moodlePath: './src/tmp/moodle/v/4.5',
            outputPath: './schemas/v/4.5.json'
        };

        (Scanner.findFiles as jest.Mock).mockResolvedValue(['./src/tmp/moodle/v/4.5/unknown/db/services.php']);
        (AstManager.getAst as jest.Mock).mockResolvedValue({ type: 'Program' });

        const unresolvableService = {
            name: 'unknown_service',
            classname: 'unknown_class'
        };
        (ServiceExtractor.extractServices as jest.Mock).mockReturnValue([unresolvableService]);
        (ClassResolver.resolveClass as jest.Mock).mockResolvedValue(null);

        const result = await extractWebServices(config);

        expect(SchemaExtractor.extractSchema).not.toHaveBeenCalled();
        expect(JsonGenerator.saveJson).toHaveBeenCalledWith([], config.outputPath);
        expect(result.totalServices).toBe(0);
    });

});
