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
 * Fallback parser when Git hash is unavailable.
 *
 * @param {string} relativeFilePath - Relative file path.
 * @param {string} repoPath - Repository root path.
 * @returns {Promise<unknown>} Parsed AST.
 */
async function parseDirectly(relativeFilePath: string, repoPath: string): Promise<unknown> {
    const fullPath = repoPath ? path.join(repoPath, relativeFilePath) : relativeFilePath;
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
    const fullPath = repoPath ? path.join(repoPath, relativeFilePath) : relativeFilePath;
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
    relativeFilePath: string,
    repoPath: string
): Promise<unknown> {
    const gitSha1 = await getGitBlobHash(relativeFilePath, repoPath);
    if (!gitSha1) {
        return parseDirectly(relativeFilePath, repoPath);
    }

    return resolveByHash(gitSha1, relativeFilePath, repoPath);
}
