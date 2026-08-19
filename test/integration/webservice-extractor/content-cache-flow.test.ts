import fs from 'fs/promises';
import path from 'path';
import { getAst, configureAstManager } from '../../../src/webservice-extractor/cache/ast-manager';
import AstParser from '../../../src/webservice-extractor/parser/ast-parser';
import ContentCache from '../../../src/webservice-extractor/cache/content-cache';
import * as GitBlobHasher from '../../../src/webservice-extractor/cache/git-blob-hasher';

jest.mock('../../../src/webservice-extractor/cache/git-blob-hasher');

describe('Integration Flow: Zero I/O Git-Hashing Content Cache & AST Manager', () => {

    const testCacheDir = path.resolve(__dirname, '../../tmp/.cache_integration_test');
    const repoPath = path.resolve(__dirname, '../../tmp/moodle_repo_mock');
    const relativeFilePath = 'user/externallib.php';
    const fullPhpFilePath = path.join(repoPath, relativeFilePath);
    const dummyPhpContent = '<?php class user_exporter {}';
    const mockGitSha1 = 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391';

    let cache: ContentCache;
    let parser: AstParser;

    beforeEach(async () => {
        await fs.mkdir(testCacheDir, { recursive: true });
        await fs.mkdir(path.dirname(fullPhpFilePath), { recursive: true });
        await fs.writeFile(fullPhpFilePath, dummyPhpContent, 'utf-8');

        cache = new ContentCache({ cacheDir: testCacheDir, maxEpochAge: 3 });
        parser = new AstParser();
        configureAstManager(cache, parser);

        (GitBlobHasher.getGitBlobHash as jest.Mock).mockResolvedValue(mockGitSha1);
    });

    afterEach(async () => {
        await fs.rm(testCacheDir, { recursive: true, force: true });
        await fs.rm(repoPath, { recursive: true, force: true });
        jest.restoreAllMocks();
    });

    it('should parse, generate pure <sha1>.json, and record epoch on Cache Miss', async () => {
        const parseSpy = jest.spyOn(parser, 'parse');

        const ast = await getAst(relativeFilePath, repoPath);

        expect(parseSpy).toHaveBeenCalledTimes(1);
        expect(ast).toBeDefined();

        const registryContent = await fs.readFile(path.join(testCacheDir, 'registry.json'), 'utf-8');
        const registry = JSON.parse(registryContent);
        expect(registry.currentEpoch).toBe(1);
        expect(registry.records[mockGitSha1]).toBe(1);

        const cachedContent = await fs.readFile(path.join(testCacheDir, `${mockGitSha1}.json`), 'utf-8');
        const cachedAst = JSON.parse(cachedContent);
        expect(cachedAst).toEqual(ast);
    });

    it('should retrieve data from <sha1>.json without calling parser on Cache Hit (Zero I/O)', async () => {
        await getAst(relativeFilePath, repoPath);

        const parseSpy = jest.spyOn(parser, 'parse');

        await cache.advanceEpoch();

        const cachedAst = await getAst(relativeFilePath, repoPath);

        expect(parseSpy).not.toHaveBeenCalled();
        expect(cachedAst).toBeDefined();

        const registry = JSON.parse(await fs.readFile(path.join(testCacheDir, 'registry.json'), 'utf-8'));
        expect(registry.currentEpoch).toBe(2);
        expect(registry.records[mockGitSha1]).toBe(2);
    });

    it('should handle concurrency (single-flight) avoiding duplicate parsing of the same file', async () => {
        const parseSpy = jest.spyOn(parser, 'parse');

        const [ast1, ast2, ast3] = await Promise.all([
            getAst(relativeFilePath, repoPath),
            getAst(relativeFilePath, repoPath),
            getAst(relativeFilePath, repoPath)
        ]);

        expect(parseSpy).toHaveBeenCalledTimes(1);
        expect(ast1).toEqual(ast2);
        expect(ast2).toEqual(ast3);
    });

    it('should purge files older than maxEpochAge and keep valid ones', async () => {
        await getAst(relativeFilePath, repoPath);

        await cache.advanceEpoch();
        await cache.advanceEpoch();
        await cache.advanceEpoch();
        await cache.advanceEpoch();

        await cache.cleanStaleCache();

        const fileExists = await fs.access(path.join(testCacheDir, `${mockGitSha1}.json`)).then(() => true).catch(() => false);
        expect(fileExists).toBe(false);

        const registryFinal = JSON.parse(await fs.readFile(path.join(testCacheDir, 'registry.json'), 'utf-8'));
        expect(registryFinal.records[mockGitSha1]).toBeUndefined();
    });

});
