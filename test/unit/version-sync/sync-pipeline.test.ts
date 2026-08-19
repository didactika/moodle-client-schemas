import * as VersionManager from '../../../src/version-sync/version-manager';
import {
    detectMissingVersions,
    sortVersionsAscending,
    runSyncPipeline
} from '../../../src/version-sync/sync-pipeline';

jest.mock('../../../src/version-sync/version-manager');
jest.mock('../../../src/version-sync/moodle-downloader');
jest.mock('../../../src/webservice-extractor/index');

describe('Unit Test: sync-pipeline (Functions)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('detectMissingVersions', () => {
        it('should chain calls to VersionManager correctly', async () => {
            (VersionManager.getLocalVersions as jest.Mock).mockResolvedValue(['4.4']);
            (VersionManager.getRemoteVersions as jest.Mock).mockResolvedValue(['4.4.0', '5.0.0']);
            (VersionManager.cleanRemoteVersions as jest.Mock).mockReturnValue(['4.4', '5.0']);
            (VersionManager.getMissingLocalVersions as jest.Mock).mockReturnValue(['5.0']);

            const missing = await detectMissingVersions();

            expect(missing).toEqual(['5.0']);
            expect(VersionManager.cleanRemoteVersions).toHaveBeenCalledWith(['4.4.0', '5.0.0']);
            expect(VersionManager.getMissingLocalVersions).toHaveBeenCalledWith(['4.4'], ['4.4', '5.0']);
        });
    });

    describe('sortVersionsAscending', () => {
        it('should sort numerical versions in ascending order handling decimals', () => {
            const unsorted = ['4.10', '3.9', '4.2', '3.11', '4.1', '2.0', '10.0'];
            const sorted = sortVersionsAscending(unsorted);

            expect(sorted).toEqual(['2.0', '3.9', '3.11', '4.1', '4.2', '4.10', '10.0']);
        });
    });

    describe('runSyncPipeline', () => {
        it('should return empty array when no versions are missing', async () => {
            (VersionManager.getLocalVersions as jest.Mock).mockResolvedValue(['4.4']);
            (VersionManager.getRemoteVersions as jest.Mock).mockResolvedValue(['4.4.0']);
            (VersionManager.cleanRemoteVersions as jest.Mock).mockReturnValue(['4.4']);
            (VersionManager.getMissingLocalVersions as jest.Mock).mockReturnValue([]);

            const result = await runSyncPipeline();

            expect(result).toEqual([]);
        });
    });

});
