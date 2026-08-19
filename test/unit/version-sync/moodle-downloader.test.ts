import fs from 'fs';
import child_process from 'child_process';
import {
    cloneMoodleVersion,
    cloneMoodleVersionsInBatch
} from '../../../src/version-sync/moodle-downloader';

jest.mock('fs');
jest.mock('child_process');

describe('Unit Test: moodle-downloader (Functions)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('cloneMoodleVersion', () => {
        beforeEach(() => {
            (fs.existsSync as jest.Mock).mockReturnValue(false);
            (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

            (child_process.exec as unknown as jest.Mock).mockImplementation((...args: unknown[]) => {
                const callback = args[args.length - 1];
                if (typeof callback === 'function') {
                    callback(null, 'Cloned successfully', '');
                }
            });
        });

        it.each(['4.5', '3.8'])('should construct and execute git clone command correctly', async (version) => {
            const expectedPath = `./src/tmp/moodle/v/${version}`;
            const expectedCommand = `git clone --depth 1 --branch v${version}.0 https://github.com/moodle/moodle.git ${expectedPath}`;

            const resultPath = await cloneMoodleVersion(version);

            expect(resultPath).toBe(expectedPath);
            expect(fs.mkdirSync).toHaveBeenCalledWith(expect.any(String), { recursive: true });
            expect(child_process.exec).toHaveBeenCalledWith(expectedCommand, expect.any(Function));
        });
    });

    describe('cloneMoodleVersionsInBatch', () => {
        beforeEach(() => {
            (fs.existsSync as jest.Mock).mockReturnValue(false);
            (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

            (child_process.exec as unknown as jest.Mock).mockImplementation((...args: unknown[]) => {
                const callback = args[args.length - 1];
                if (typeof callback === 'function') {
                    callback(null, 'Cloned successfully', '');
                }
            });
        });

        it('should clone multiple moodle versions concurrently', async () => {
            const versions = ['4.5', '4.4', '2.0', '1.5', '7.0'];

            const result = await cloneMoodleVersionsInBatch(versions);

            const expectedPaths = versions.map(v => `./src/tmp/moodle/v/${v}`);
            expect(result).toEqual(expectedPaths);
            expect(child_process.exec).toHaveBeenCalledTimes(versions.length);

            versions.forEach(version => {
                const expectedCommand = `git clone --depth 1 --branch v${version}.0 https://github.com/moodle/moodle.git ./src/tmp/moodle/v/${version}`;
                expect(child_process.exec).toHaveBeenCalledWith(expectedCommand, expect.any(Function));
            });
        });
    });

});