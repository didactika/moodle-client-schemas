import fs from 'fs/promises';
import { getAst, configureAstManager } from '../../../../src/webservice-extractor/cache/ast-manager';
import AstParser from '../../../../src/webservice-extractor/parser/ast-parser';
import ContentCache from '../../../../src/webservice-extractor/cache/content-cache';
import * as GitBlobHasher from '../../../../src/webservice-extractor/cache/git-blob-hasher';

jest.mock('fs/promises');
jest.mock('../../../../src/webservice-extractor/cache/git-blob-hasher');

describe('Unit Test: ast-manager (Functions)', () => {

    let mockCache: jest.Mocked<ContentCache>;
    let mockParser: jest.Mocked<AstParser>;

    beforeEach(() => {
        mockCache = {
            get: jest.fn(),
            set: jest.fn(),
            advanceEpoch: jest.fn(),
            cleanStaleCache: jest.fn(),
            getCurrentEpoch: jest.fn()
        } as unknown as jest.Mocked<ContentCache>;

        mockParser = {
            parse: jest.fn()
        } as unknown as jest.Mocked<AstParser>;

        configureAstManager(mockCache, mockParser);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('on Cache HIT: should NOT read source file from disk or call parser (Zero I/O)', async () => {
        const relativePath = 'user/externallib.php';
        const repoPath = './src/tmp/moodle/v/4.5';
        const gitSha1 = 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391';
        const mockAst = { type: 'Program', body: [] };

        (GitBlobHasher.getGitBlobHash as jest.Mock).mockResolvedValue(gitSha1);
        mockCache.get.mockResolvedValue(mockAst);

        const result = await getAst(relativePath, repoPath);

        expect(GitBlobHasher.getGitBlobHash).toHaveBeenCalledWith(relativePath, repoPath);
        expect(mockCache.get).toHaveBeenCalledWith(gitSha1);

        expect(fs.readFile).not.toHaveBeenCalled();
        expect(mockParser.parse).not.toHaveBeenCalled();
        expect(result).toEqual(mockAst);
    });

    it('on Cache MISS: reads PHP source file, parses AST, and stores in cache by SHA-1', async () => {
        const relativePath = 'user/externallib.php';
        const repoPath = './src/tmp/moodle/v/4.5';
        const gitSha1 = 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391';
        const phpContent = '<?php class sample {}';
        const parsedAst = { type: 'Program', body: [] };

        (GitBlobHasher.getGitBlobHash as jest.Mock).mockResolvedValue(gitSha1);
        mockCache.get.mockResolvedValue(null);
        (fs.readFile as jest.Mock).mockResolvedValue(phpContent);
        mockParser.parse.mockReturnValue(parsedAst);

        const result = await getAst(relativePath, repoPath);

        expect(fs.readFile).toHaveBeenCalledWith(expect.stringContaining(relativePath), 'utf-8');
        expect(mockParser.parse).toHaveBeenCalledWith(phpContent);
        expect(mockCache.set).toHaveBeenCalledWith(gitSha1, parsedAst);
        expect(result).toEqual(parsedAst);
    });

});
