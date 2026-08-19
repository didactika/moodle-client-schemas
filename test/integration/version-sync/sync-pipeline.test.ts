import * as VersionManager from '../../../src/version-sync/version-manager';
import * as MoodleDownloader from '../../../src/version-sync/moodle-downloader';
import * as ExtractorIndex from '../../../src/webservice-extractor/index';
import { runSyncPipeline } from '../../../src/version-sync/sync-pipeline';

jest.mock('../../../src/version-sync/version-manager');
jest.mock('../../../src/version-sync/moodle-downloader');
jest.mock('../../../src/webservice-extractor/index');

describe('Integration Flow: SyncPipeline (Version Detection -> Download -> Extractor)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should complete without downloading or extracting when no versions are missing', async () => {
        (VersionManager.getLocalVersions as jest.Mock).mockResolvedValue(['4.4', '4.5']);
        (VersionManager.getRemoteVersions as jest.Mock).mockResolvedValue(['4.4.0', '4.5.0']);
        (VersionManager.cleanRemoteVersions as jest.Mock).mockReturnValue(['4.4', '4.5']);
        (VersionManager.getMissingLocalVersions as jest.Mock).mockReturnValue([]);

        const result = await runSyncPipeline();

        expect(result).toEqual([]);
        expect(MoodleDownloader.cloneMoodleVersionsInBatch).not.toHaveBeenCalled();
        expect(ExtractorIndex.extractWebServices).not.toHaveBeenCalled();
    });

    it('should sort versions ascending and orchestrate sequential batch download and extraction', async () => {
        (VersionManager.getLocalVersions as jest.Mock).mockResolvedValue(['3.0']);
        (VersionManager.getRemoteVersions as jest.Mock).mockResolvedValue(['4.5.0', '3.8.0', '4.4.0']);
        (VersionManager.cleanRemoteVersions as jest.Mock).mockReturnValue(['4.5', '3.8', '4.4']);
        (VersionManager.getMissingLocalVersions as jest.Mock).mockReturnValue(['4.5', '3.8', '4.4']);

        (MoodleDownloader.cloneMoodleVersionsInBatch as jest.Mock).mockImplementation((versions: string[]) => {
            return Promise.resolve(versions.map(v => `./src/tmp/moodle/v/${v}`));
        });

        const executionOrder: string[] = [];
        (ExtractorIndex.extractWebServices as jest.Mock).mockImplementation((config) => {
            executionOrder.push(config.version);
            return Promise.resolve({
                version: config.version,
                totalServices: 50,
                outputPath: config.outputPath
            });
        });

        const result = await runSyncPipeline();

        const expectedOrder = ['3.8', '4.4', '4.5'];
        expect(MoodleDownloader.cloneMoodleVersionsInBatch).toHaveBeenCalledWith(expectedOrder);
        expect(executionOrder).toEqual(expectedOrder);
        expect(result).toEqual(expectedOrder);
    });

});
