import fs from 'fs/promises';
import child_process from 'child_process';
import {
    getLocalVersions,
    getRemoteVersions,
    cleanRemoteVersions,
    getMissingLocalVersions
} from '../../../src/version-sync/version-manager';

jest.mock('fs/promises');
jest.mock('child_process');

describe('Unit Test: version-manager (Functions)', () => {

    describe('getLocalVersions', () => {

        it.each([
            {
                description: 'when .json schema files exist',
                mockFiles: [
                    '5.0.JSON',
                    '5.0.JSON',
                    'notes.txt',
                    '3.1.json',
                    '6.0.JSON'
                ],
                expected: ['5.0', '5.0', '3.1', '6.0']
            },
            {
                description: 'when no .json schema files are present',
                mockFiles: ['notes.txt', 'README.md'],
                expected: []
            }
        ])('should extract local versions ($description)', async ({ mockFiles, expected }: { mockFiles: string[], expected: string[] }) => {
            (fs.readdir as jest.Mock).mockResolvedValue(mockFiles);

            const result = await getLocalVersions();
            expect(result).toEqual(expected);
            expect(fs.readdir).toHaveBeenCalledWith(expect.stringContaining('schemas/v'));
        });

    });

    describe('getRemoteVersions', () => {

        it.each([
            {
                description: 'when remote tags exist',
                mockOutput:
                    '934a363717d59828fa68c07e056972bb3a9254d3\trefs/tags/v4.1.2\n' +
                    '831a213717d59828fa68c07e056972bb3a9254d3\trefs/tags/v4.1.3\n' +
                    '121a213717d59828fa68c07e056972bb3a9254d3\trefs/tags/v5.0.0\n' +
                    '1ca05a12c2aa5a253e2e6b38892fbf01ae40e7c7\trefs/tags/v5.2.0-beta\n',
                expected: ['4.1.2', '4.1.3', '5.0.0', '5.2.0-beta']
            },
            {
                description: 'when remote output is empty',
                mockOutput: '',
                expected: []
            }
        ])('should return raw version tags ($description)', async ({ mockOutput, expected }: { mockOutput: string, expected: string[] }) => {
            (child_process.exec as unknown as jest.Mock).mockImplementation((_command: string, callback: (error: Error | null, result: { stdout: string, stderr: string }) => void) => {
                callback(null, { stdout: mockOutput, stderr: '' });
            });

            const result = await getRemoteVersions();

            expect(result).toEqual(expected);
            expect(child_process.exec).toHaveBeenCalledWith(
                'git ls-remote --tags --refs https://github.com/moodle/moodle.git "refs/tags/v*"',
                expect.any(Function)
            );
        });

    });

    describe('cleanRemoteVersions', () => {

        it('should return cleaned versions in Major.Minor format without duplicates or non-version strings', () => {
            const versions = [
                '5.1.1',
                '5.0.2',
                '5.0.2',
                '5.3.3.0-beta',
                '5.3.2',
                'main'
            ];
            const result = cleanRemoteVersions(versions);
            expect(result).toEqual(['5.1', '5.0', '5.3']);
        });

    });

    describe('getMissingLocalVersions', () => {

        it.each([
            {
                description: 'when local versions exist',
                localVersions: ['5.1', '5.0', '5.3'],
                remoteVersions: ['5.1', '3.0', '5.3', '2.1'],
                expected: ['3.0', '2.1']
            },
            {
                description: 'when local versions array is empty',
                localVersions: [],
                remoteVersions: ['5.1', '3.0', '2.1'],
                expected: ['5.1', '3.0', '2.1']
            }
        ])('should return missing versions ($description)', ({ localVersions, remoteVersions, expected }: { localVersions: string[], remoteVersions: string[], expected: string[] }) => {
            const result = getMissingLocalVersions(localVersions, remoteVersions);

            expect(result).toEqual(expected);
        });

    });

});