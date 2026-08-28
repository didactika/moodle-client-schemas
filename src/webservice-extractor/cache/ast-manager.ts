import fs from 'fs/promises';
import path from 'path';
import { getGitBlobHash } from './git-blob-hasher';
import ContentCache from './content-cache';
import AstParser from '../parser/ast-parser';

let defaultCache = new ContentCache();
let defaultParser = new AstParser();
const inFlightRequests = new Map<string, Promise<unknown>>();

/**
 * Configures the AST Manager dependencies (cache and parser instances).
 *
 * @param {ContentCache} [customCache] - Custom ContentCache instance.
 * @param {AstParser} [customParser] - Custom AstParser instance.
 */
export function configureAstManager(
    customCache?: ContentCache,
    customParser?: AstParser
): void {
    if (customCache) {
        defaultCache = customCache;
    }
    if (customParser) {
        defaultParser = customParser;
    }
}

/**
 * Normalizes a file path to be relative to the repository root.
 *
 * @param {string} filePath - Absolute or relative file path.
 * @param {string} repoPath - Root path of the repository.
 * @returns {string} Relative file path within repository.
 */
function toRelativePath(filePath: string, repoPath: string): string {
    if (!repoPath) {
        return filePath;
    }
    const relative = path.relative(repoPath, filePath);
    return relative.startsWith('..') ? filePath : relative;
}

/**
 * Resolves the full filesystem path for a file.
 *
 * @param {string} filePath - Absolute or relative file path.
 * @param {string} repoPath - Root path of the repository.
 * @returns {string} Full resolved file path.
 */
function toFullPath(filePath: string, repoPath: string): string {
    if (!repoPath) {
        return filePath;
    }
    const rel = toRelativePath(filePath, repoPath);
    return path.join(repoPath, rel);
}

/**
 * Fallback parser when Git hash is unavailable.
 *
 * @param {string} relativeFilePath - Relative file path.
 * @param {string} repoPath - Repository root path.
 * @returns {Promise<unknown>} Parsed AST.
 */
async function parseDirectly(relativeFilePath: string, repoPath: string): Promise<unknown> {
    const fullPath = toFullPath(relativeFilePath, repoPath);
    const sourceCode = await fs.readFile(fullPath, 'utf-8');
    return defaultParser.parse(sourceCode);
}

/**
 * Reads PHP file from disk, parses its AST, and persists it to cache.
 *
 * @param {string} gitSha1 - Git blob SHA-1 hash.
 * @param {string} relativeFilePath - Relative path of the PHP file.
 * @param {string} repoPath - Root path of the git repository.
 * @returns {Promise<unknown>} Parsed AST.
 */
async function readParseAndCache(
    gitSha1: string,
    relativeFilePath: string,
    repoPath: string
): Promise<unknown> {
    const fullPath = toFullPath(relativeFilePath, repoPath);
    const sourceCode = await fs.readFile(fullPath, 'utf-8');
    const ast = defaultParser.parse(sourceCode);
    await defaultCache.set(gitSha1, ast);
    return ast;
}

/**
 * Deduplicates concurrent in-flight requests for the same content hash.
 *
 * @param {string} gitSha1 - Git blob SHA-1 hash.
 * @param {string} relativeFilePath - Relative path of the PHP file.
 * @param {string} repoPath - Root path of the git repository.
 * @returns {Promise<unknown>} Parsed AST.
 */
async function deduplicateInFlight(
    gitSha1: string,
    relativeFilePath: string,
    repoPath: string
): Promise<unknown> {
    const existingPromise = inFlightRequests.get(gitSha1);
    if (existingPromise) {
        return existingPromise;
    }

    const parsePromise = readParseAndCache(gitSha1, relativeFilePath, repoPath);
    inFlightRequests.set(gitSha1, parsePromise);

    try {
        return await parsePromise;
    } finally {
        inFlightRequests.delete(gitSha1);
    }
}

/**
 * Resolves AST from cache or initiates in-flight parsing.
 *
 * @param {string} gitSha1 - Git blob SHA-1 hash.
 * @param {string} relativeFilePath - Relative path of the PHP file.
 * @param {string} repoPath - Root path of the git repository.
 * @returns {Promise<unknown>} Parsed AST.
 */
async function resolveByHash(
    gitSha1: string,
    relativeFilePath: string,
    repoPath: string
): Promise<unknown> {
    const cachedAst = await defaultCache.get<unknown>(gitSha1);
    if (cachedAst) {
        return cachedAst;
    }

    return deduplicateInFlight(gitSha1, relativeFilePath, repoPath);
}

/**
 * Obtains the AST for a given relative PHP file using Zero I/O Git-Hashing and caching.
 *
 * @param {string} relativeFilePath - Relative path of the PHP file from repository root.
 * @param {string} repoPath - Root path of the git repository.
 * @returns {Promise<unknown>} Parsed AST representation.
 */
export async function getAst(
    filePath: string,
    repoPath: string
): Promise<unknown> {
    const relPath = toRelativePath(filePath, repoPath);
    const gitSha1 = await getGitBlobHash(relPath, repoPath);
    if (!gitSha1) {
        return parseDirectly(relPath, repoPath);
    }

    return resolveByHash(gitSha1, relPath, repoPath);
}
