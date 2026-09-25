import child_process from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { Readable } from 'stream';
import * as tar from 'tar';
import {
    buildTarballUrl,
    downloadMoodleTarball,
    cloneMoodleVersion,
    cleanupMoodleDirectory,
    resolveLatestRemoteVersion,
    hasNativeTar,
    resetNativeTarCheck
} from '../../../src/generator/downloader/single-version-downloader';

function createSuccessResponse(body: ReadableStream<Uint8Array>): Response {
    return {
        ok: true,
        status: 200,
        statusText: 'OK',
        body
    } as unknown as Response;
}

function createErrorResponse(status: number, statusText: string): Response {
    return {
        ok: false,
        status,
        statusText,
        body: null
    } as unknown as Response;
}

type ExecCallback = (error: null, stdout: string, stderr: string) => void;

function mockExecWithResult(stdout: string) {
    return jest.spyOn(child_process, 'exec').mockImplementation((...args: unknown[]) => {
        const callback = args.find((arg): arg is ExecCallback => typeof arg === 'function');
        if (callback) {
            callback(null, stdout, '');
        }
        return {} as child_process.ChildProcess;
    });
}

describe('Single Version Downloader', () => {
    let tempDir: string;

    beforeEach(async () => {
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'moodle-downloader-test-'));
        resetNativeTarCheck();
        jest.restoreAllMocks();
    });

    afterEach(async () => {
        resetNativeTarCheck();
        await fs.rm(tempDir, { recursive: true, force: true });
    });

    describe('hasNativeTar', () => {
        it('should detect native tar and memoize the check', () => {
            const result1 = hasNativeTar();
            expect(typeof result1).toBe('boolean');

            const spawnSpy = jest.spyOn(child_process, 'spawnSync');
            const result2 = hasNativeTar();
            expect(result2).toBe(result1);
            expect(spawnSpy).not.toHaveBeenCalled();
        });

        it('should return false on Windows platforms', () => {
            const originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'win32',
                configurable: true
            });

            resetNativeTarCheck();
            expect(hasNativeTar()).toBe(false);

            Object.defineProperty(process, 'platform', {
                value: 'linux',
                configurable: true
            });
            Object.defineProperty(process, 'platform', {
                value: originalPlatform,
                configurable: true
            });
        });
    });

    describe('buildTarballUrl', () => {
        it('should format codeload github URL and remove .git and trailing slashes', () => {
            const url1 = buildTarballUrl('https://github.com/moodle/moodle.git', 'v4.5.0');
            expect(url1).toBe('https://codeload.github.com/moodle/moodle/tar.gz/refs/tags/v4.5.0');

            const url2 = buildTarballUrl('https://github.com/moodle/moodle/', 'v4.4.0');
            expect(url2).toBe('https://codeload.github.com/moodle/moodle/tar.gz/refs/tags/v4.4.0');
        });

        it('should handle custom git repository hosts', () => {
            const url = buildTarballUrl('https://gitlab.com/custom/moodle.git', 'v4.5.0');
            expect(url).toBe('https://gitlab.com/custom/moodle/tarball/v4.5.0');
        });
    });

    describe('downloadMoodleTarball', () => {
        it('should stream, extract tarball, and strip root folder directly to targetPath', async () => {
            const fixtureRoot = path.join(tempDir, 'fixture-root');
            const sampleSourceDir = path.join(fixtureRoot, 'moodle-v4.5.0');
            await fs.mkdir(sampleSourceDir, { recursive: true });
            await fs.writeFile(path.join(sampleSourceDir, 'version.php'), '<?php $version = 2024100700;', 'utf-8');

            const archiveStream = tar.c({ gzip: true, portable: true, cwd: fixtureRoot }, ['moodle-v4.5.0']);
            const webStream = Readable.toWeb(Readable.from(archiveStream)) as unknown as ReadableStream<Uint8Array>;

            const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
                createSuccessResponse(webStream)
            );

            const targetDir = path.join(tempDir, 'extracted-moodle');
            const result = await downloadMoodleTarball('4.5', targetDir);

            expect(result).toBe(targetDir);
            expect(fetchSpy).toHaveBeenCalledWith(
                'https://codeload.github.com/moodle/moodle/tar.gz/refs/tags/v4.5.0'
            );

            const extractedFile = path.join(targetDir, 'version.php');
            const content = await fs.readFile(extractedFile, 'utf-8');
            expect(content).toContain('$version = 2024100700;');
        });

        it('should extract using node-tar fallback when native tar is unavailable', async () => {
            const fixtureRoot = path.join(tempDir, 'fixture-fallback');
            const sampleSourceDir = path.join(fixtureRoot, 'moodle-v4.5.0');
            await fs.mkdir(sampleSourceDir, { recursive: true });
            await fs.writeFile(path.join(sampleSourceDir, 'version.php'), '<?php // fallback', 'utf-8');

            const archiveStream = tar.c({ gzip: true, portable: true, cwd: fixtureRoot }, ['moodle-v4.5.0']);
            const webStream = Readable.toWeb(Readable.from(archiveStream)) as unknown as ReadableStream<Uint8Array>;

            jest.spyOn(child_process, 'spawnSync').mockImplementation(() => {
                throw new Error('tar not found');
            });
            resetNativeTarCheck();

            jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
                createSuccessResponse(webStream)
            );

            const targetDir = path.join(tempDir, 'fallback-moodle');
            const result = await downloadMoodleTarball('4.5', targetDir);

            expect(result).toBe(targetDir);
            const extractedFile = path.join(targetDir, 'version.php');
            const content = await fs.readFile(extractedFile, 'utf-8');
            expect(content).toContain('// fallback');
        });

        it('should clean up target directory and throw error if HTTP response is not ok', async () => {
            jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
                createErrorResponse(404, 'Not Found')
            );

            const targetDir = path.join(tempDir, 'should-be-cleaned');
            await expect(downloadMoodleTarball('4.5', targetDir)).rejects.toThrow('Failed to download tarball');

            const exists = await fs.access(targetDir).then(() => true).catch(() => false);
            expect(exists).toBe(false);
        });
    });

    describe('cloneMoodleVersion', () => {
        it('should use fast tarball download when available', async () => {
            const fixtureRoot = path.join(tempDir, 'fixture-root-fast');
            const sampleSourceDir = path.join(fixtureRoot, 'moodle-v4.5.0');
            await fs.mkdir(sampleSourceDir, { recursive: true });
            await fs.writeFile(path.join(sampleSourceDir, 'version.php'), '<?php // fast', 'utf-8');

            const archiveStream = tar.c({ gzip: true, portable: true, cwd: fixtureRoot }, ['moodle-v4.5.0']);
            const webStream = Readable.toWeb(Readable.from(archiveStream)) as unknown as ReadableStream<Uint8Array>;

            jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
                createSuccessResponse(webStream)
            );

            const execSpy = jest.spyOn(child_process, 'exec');
            const targetDir = path.join(tempDir, 'fast-moodle');
            const result = await cloneMoodleVersion('4.5', targetDir);

            expect(result).toBe(targetDir);
            expect(execSpy).not.toHaveBeenCalled();
        });

        it('should fall back to git shallow clone if tarball download fails', async () => {
            jest.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));
            const execMock = mockExecWithResult('');

            const targetDir = path.join(tempDir, 'cloned-moodle');
            const clonedPath = await cloneMoodleVersion('4.5', targetDir);

            expect(clonedPath).toBe(targetDir);
            expect(execMock).toHaveBeenCalledTimes(1);
            const commandRun = execMock.mock.calls[0]?.[0] as string;
            expect(commandRun).toContain('git clone --depth 1');
            expect(commandRun).toContain('--branch v4.5.0');
            expect(commandRun).toContain('https://github.com/moodle/moodle.git');
        });
    });

    it('should safely clean up downloaded directory from disk', async () => {
        const dummyDir = path.join(tempDir, 'to-clean');
        await fs.mkdir(dummyDir, { recursive: true });
        await fs.writeFile(path.join(dummyDir, 'test.txt'), 'hello', 'utf-8');

        expect(await fs.access(dummyDir).then(() => true).catch(() => false)).toBe(true);

        await cleanupMoodleDirectory(dummyDir);

        expect(await fs.access(dummyDir).then(() => true).catch(() => false)).toBe(false);
    });

    it('should resolve the default latest supported version directly without git query', async () => {
        const latest = await resolveLatestRemoteVersion();
        expect(latest).toBe('4.5');
    });
});
