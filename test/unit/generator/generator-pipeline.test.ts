import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { runGeneratorPipeline } from '../../../src/generator/generator-pipeline';
import * as configManager from '../../../src/generator/config/config-manager';
import * as downloader from '../../../src/generator/downloader/single-version-downloader';
import * as extractor from '../../../src/webservice-extractor';
import * as schemaSyncer from '../../../src/generator/syncer/schema-syncer';

describe('Generator Pipeline End-to-End Coordination', () => {
    let tempDir: string;
    let tempOutDir: string;

    beforeEach(async () => {
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pipeline-test-'));
        tempOutDir = path.join(tempDir, 'out-schemas');
        jest.restoreAllMocks();
        jest.spyOn(schemaSyncer, 'syncSchemas').mockResolvedValue({ syncedCount: 1, targets: [] });
    });

    afterEach(async () => {
        await fs.rm(tempDir, { recursive: true, force: true });
    });

    it('should coordinate remote download, extraction, cleanup, and file generation', async () => {
        const fakeConfig = {
            version: '4.5',
            webservices: ['*'],
            outDir: tempOutDir,
            isLocal: false
        };

        jest.spyOn(configManager, 'loadOrCreateConfig').mockResolvedValue(fakeConfig);

        const cloneSpy = jest
            .spyOn(downloader, 'cloneMoodleVersion')
            .mockResolvedValue(path.join(tempDir, 'fake-moodle'));

        const cleanupSpy = jest
            .spyOn(downloader, 'cleanupMoodleDirectory')
            .mockResolvedValue();

        const fakeSchemas = [
            {
                name: 'core_course_get_courses',
                description: 'Get courses',
                parameters: { kind: 'parameters' as const, keys: {} },
                returns: { kind: 'value' as const, type: 'PARAM_INT', primitiveType: 'number' as const }
            }
        ];

        const extractSpy = jest
            .spyOn(extractor, 'extractWebservice')
            .mockResolvedValue({
                schemas: fakeSchemas as any,
                errors: []
            });

        await runGeneratorPipeline();

        expect(cloneSpy).toHaveBeenCalledWith('4.5', expect.any(String));
        expect(extractSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                services: ['*']
            })
        );
        expect(cleanupSpy).toHaveBeenCalled();

        // Verify files in tempOutDir
        const generatedFile = path.join(tempOutDir, 'core/course/get_courses.webservice-client.d.ts');
        const indexFile = path.join(tempOutDir, 'index.d.ts');
        expect(await fs.access(generatedFile).then(() => true).catch(() => false)).toBe(true);
        expect(await fs.access(indexFile).then(() => true).catch(() => false)).toBe(true);
    });

    it('should coordinate local extraction without download or cleanup when moodlePath is configured', async () => {
        const localPath = path.join(tempDir, 'local-moodle-instance');
        await fs.mkdir(localPath, { recursive: true });

        const fakeConfig = {
            version: '4.4',
            moodlePath: localPath,
            webservices: ['core_user_*'],
            outDir: tempOutDir,
            isLocal: true
        };

        jest.spyOn(configManager, 'loadOrCreateConfig').mockResolvedValue(fakeConfig);
        const cloneSpy = jest.spyOn(downloader, 'cloneMoodleVersion');
        const cleanupSpy = jest.spyOn(downloader, 'cleanupMoodleDirectory');

        const fakeSchemas = [
            {
                name: 'core_user_get_users',
                description: 'Get users',
                parameters: { kind: 'parameters' as const, keys: {} },
                returns: { kind: 'value' as const, type: 'PARAM_INT', primitiveType: 'number' as const }
            }
        ];

        jest.spyOn(extractor, 'extractWebservice').mockResolvedValue({
            schemas: fakeSchemas as any,
            errors: []
        });

        await runGeneratorPipeline();

        // In local mode, should not clone or cleanup
        expect(cloneSpy).not.toHaveBeenCalled();
        expect(cleanupSpy).not.toHaveBeenCalled();

        const userFile = path.join(tempOutDir, 'core/user/get_users.webservice-client.d.ts');
        expect(await fs.access(userFile).then(() => true).catch(() => false)).toBe(true);
    });

    it('should pass custom config path to loadOrCreateConfig when provided', async () => {
        const fakeConfig = {
            version: '4.5',
            webservices: ['*'],
            outDir: tempOutDir,
            isLocal: false
        };

        const loadSpy = jest.spyOn(configManager, 'loadOrCreateConfig').mockResolvedValue(fakeConfig);
        jest.spyOn(downloader, 'cloneMoodleVersion').mockResolvedValue(path.join(tempDir, 'fake-moodle'));
        jest.spyOn(downloader, 'cleanupMoodleDirectory').mockResolvedValue();
        jest.spyOn(extractor, 'extractWebservice').mockResolvedValue({
            schemas: [] as any,
            errors: []
        });

        await runGeneratorPipeline('./custom-config.json');
        expect(loadSpy).toHaveBeenCalledWith('./custom-config.json');
    });

    it('should skip extraction and synchronize schemas when outDir already exists and contains schemas', async () => {
        // Pre-create outDir with existing schemas
        await fs.mkdir(tempOutDir, { recursive: true });
        await fs.writeFile(path.join(tempOutDir, 'index.ts'), "export * from './test';", 'utf-8');

        const fakeConfig = {
            version: '4.5',
            webservices: ['*'],
            outDir: tempOutDir,
            isLocal: false
        };

        jest.spyOn(configManager, 'loadOrCreateConfig').mockResolvedValue(fakeConfig);
        const cloneSpy = jest.spyOn(downloader, 'cloneMoodleVersion');
        const extractSpy = jest.spyOn(extractor, 'extractWebservice');
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        await runGeneratorPipeline();

        // Must NOT clone or extract because schemas already exist
        expect(cloneSpy).not.toHaveBeenCalled();
        expect(extractSpy).not.toHaveBeenCalled();

        // Must log explanation in English
        expect(consoleLogSpy).toHaveBeenCalledWith(
            expect.stringContaining('Schemas already exist in')
        );
        expect(consoleLogSpy).toHaveBeenCalledWith(
            expect.stringContaining('Generation skipped')
        );
    });

    it('should extract to internal package schemas dir when moodlePath and outDir are not defined', async () => {
        const fakeConfig = {
            version: '4.5',
            webservices: ['*'],
            outDir: undefined,
            moodlePath: undefined,
            isLocal: false
        };

        jest.spyOn(configManager, 'loadOrCreateConfig').mockResolvedValue(fakeConfig as any);
        jest.spyOn(downloader, 'cloneMoodleVersion').mockResolvedValue(path.join(tempDir, 'fake-moodle'));
        jest.spyOn(downloader, 'cleanupMoodleDirectory').mockResolvedValue();

        const fakeSchemas = [
            {
                name: 'core_course_get_courses',
                description: 'Get courses',
                parameters: { kind: 'parameters' as const, keys: {} },
                returns: { kind: 'value' as const, type: 'PARAM_INT', primitiveType: 'number' as const }
            }
        ];

        jest.spyOn(extractor, 'extractWebservice').mockResolvedValue({
            schemas: fakeSchemas as any,
            errors: []
        });
        const mockInternalTarget = path.join(tempDir, 'internal-pkg-schemas');
        jest.spyOn(schemaSyncer, 'resolveInternalPackageSchemasDir').mockReturnValue(mockInternalTarget);
        jest.spyOn(schemaSyncer, 'syncSchemas').mockResolvedValue({ syncedCount: 1, targets: [mockInternalTarget] });
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        await runGeneratorPipeline(path.join(tempDir, 'moodle-client.config.json'));

        expect(consoleLogSpy).toHaveBeenCalledWith(
            expect.stringContaining('Successfully generated')
        );
        expect(consoleLogSpy).toHaveBeenCalledWith(
            expect.stringContaining("internal '@didactika/moodle-client' package")
        );
    });
});
