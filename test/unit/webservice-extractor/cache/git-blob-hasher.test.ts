import child_process from 'child_process';
import { getGitBlobHash } from '../../../../src/webservice-extractor/cache/git-blob-hasher';

jest.mock('child_process');

describe('Unit Test: git-blob-hasher (Functions)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should extract blob SHA-1 directly from git ls-tree output', async () => {
        const repoPath = './src/tmp/moodle/v/4.5';
        const relativeFilePath = 'user/externallib.php';
        const mockGitOutput = '100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\tuser/externallib.php\n';

        (child_process.exec as unknown as jest.Mock).mockImplementation((command, options, callback) => {
            expect(command).toBe(`git ls-tree HEAD "${relativeFilePath}"`);
            expect(options.cwd).toBe(repoPath);
            callback(null, { stdout: mockGitOutput, stderr: '' });
        });

        const sha1 = await getGitBlobHash(relativeFilePath, repoPath);

        expect(sha1).toBe('e69de29bb2d1d6434b8b29ae775ad8c2e48c5391');
    });

    it('should return null when git ls-tree does not return a valid blob', async () => {
        const repoPath = './src/tmp/moodle/v/4.5';
        const relativeFilePath = 'non_existent.php';

        (child_process.exec as unknown as jest.Mock).mockImplementation((_command, _options, callback) => {
            callback(null, { stdout: '', stderr: '' });
        });

        const sha1 = await getGitBlobHash(relativeFilePath, repoPath);

        expect(sha1).toBeNull();
    });

});
