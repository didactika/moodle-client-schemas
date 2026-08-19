import fs from 'fs/promises';
import path from 'path';
import ContentCache from '../../../../src/webservice-extractor/cache/content-cache';

describe('Unit Test: ContentCache (Instantiable Class)', () => {

    const testDir = path.resolve(__dirname, '../../../tmp/.content_cache_unit_test');
    let cache: ContentCache;

    beforeEach(async () => {
        await fs.mkdir(testDir, { recursive: true });
        cache = new ContentCache({ cacheDir: testDir, maxEpochAge: 2 });
    });

    afterEach(async () => {
        await fs.rm(testDir, { recursive: true, force: true });
    });

    describe('get and set', () => {
        it('should store serialized data in <sha1>.json and record sha1 in current epoch', async () => {
            const sha1 = 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391';
            const data = { sampleKey: 'sampleValue', numbers: [1, 2, 3] };

            await cache.set(sha1, data);

            const fileContent = await fs.readFile(path.join(testDir, `${sha1}.json`), 'utf-8');
            expect(JSON.parse(fileContent)).toEqual(data);

            const retrieved = await cache.get(sha1);
            expect(retrieved).toEqual(data);
        });

        it('should return null when sha1 does not exist on disk', async () => {
            const retrieved = await cache.get('non_existent_sha1_1234567890123456789012');
            expect(retrieved).toBeNull();
        });
    });

    describe('advanceEpoch', () => {
        it('should increment currentEpoch counter by 1', async () => {
            expect(cache.getCurrentEpoch()).toBe(1);

            await cache.advanceEpoch();
            expect(cache.getCurrentEpoch()).toBe(2);

            await cache.advanceEpoch();
            expect(cache.getCurrentEpoch()).toBe(3);
        });
    });

    describe('cleanStaleCache', () => {
        it('should remove files older than maxEpochAge from disk and registry', async () => {
            const sha1Old = '1111111111111111111111111111111111111111';
            const sha1Recent = '2222222222222222222222222222222222222222';

            await cache.set(sha1Old, { v: 1 });
            await cache.set(sha1Recent, { v: 1 });

            await cache.advanceEpoch();
            await cache.advanceEpoch();
            await cache.advanceEpoch();

            await cache.get(sha1Recent);

            await cache.cleanStaleCache();

            const oldExists = await fs.access(path.join(testDir, `${sha1Old}.json`)).then(() => true).catch(() => false);
            expect(oldExists).toBe(false);

            const recentExists = await fs.access(path.join(testDir, `${sha1Recent}.json`)).then(() => true).catch(() => false);
            expect(recentExists).toBe(true);
        });
    });

});
