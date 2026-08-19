import fs from 'fs/promises';
import path from 'path';
import { EpochRegistryData, ContentCacheConfig } from '../interfaces/content-cache.interfaces';

export default class ContentCache {
    private cacheDir: string;
    private maxEpochAge: number;
    private registry: EpochRegistryData;

    /**
     * Initializes a new ContentCache instance.
     *
     * @param {ContentCacheConfig} [config] - Cache configuration options.
     */
    constructor(config: ContentCacheConfig = { cacheDir: './.ast_cache', maxEpochAge: 3 }) {
        this.cacheDir = config.cacheDir;
        this.maxEpochAge = config.maxEpochAge;
        this.registry = {
            currentEpoch: 1,
            records: {}
        };
    }

    /**
     * Retrieves the current logical epoch number.
     *
     * @returns {number} Current epoch count.
     */
    public getCurrentEpoch(): number {
        return this.registry.currentEpoch;
    }

    /**
     * Advances the logical epoch counter by one and persists the registry.
     *
     * @returns {Promise<void>}
     */
    public async advanceEpoch(): Promise<void> {
        this.registry.currentEpoch += 1;
        await this.persistRegistry();
    }

    /**
     * Retrieves cached item by SHA-1 hash and updates its access epoch.
     *
     * @template T
     * @param {string} hash - Content SHA-1 hash identifier.
     * @returns {Promise<T | null>} Deserialized data or null if not found.
     */
    public async get<T>(hash: string): Promise<T | null> {
        const filePath = path.join(this.cacheDir, `${hash}.json`);
        try {
            const rawContent = await fs.readFile(filePath, 'utf-8');
            this.registry.records[hash] = this.registry.currentEpoch;
            await this.persistRegistry();
            return JSON.parse(rawContent) as T;
        } catch {
            return null;
        }
    }

    /**
     * Persists item data as pure JSON to disk and records the current epoch.
     *
     * @template T
     * @param {string} hash - Content SHA-1 hash identifier.
     * @param {T} data - Serializable data payload.
     * @returns {Promise<void>}
     */
    public async set<T>(hash: string, data: T): Promise<void> {
        await fs.mkdir(this.cacheDir, { recursive: true });
        const filePath = path.join(this.cacheDir, `${hash}.json`);
        await fs.writeFile(filePath, JSON.stringify(data), 'utf-8');
        this.registry.records[hash] = this.registry.currentEpoch;
        await this.persistRegistry();
    }

    /**
     * Removes cached files that exceed the maximum allowed epoch age.
     *
     * @returns {Promise<void>}
     */
    public async cleanStaleCache(): Promise<void> {
        const hashes = Object.keys(this.registry.records);
        for (const hash of hashes) {
            await this.evaluateAndPruneHash(hash);
        }
        await this.persistRegistry();
    }

    /**
     * Evaluates a single hash age and deletes the file if stale.
     *
     * @param {string} hash - Content hash to evaluate.
     * @returns {Promise<void>}
     */
    private async evaluateAndPruneHash(hash: string): Promise<void> {
        const lastSeen = this.registry.records[hash];
        const age = this.registry.currentEpoch - lastSeen;
        if (age > this.maxEpochAge) {
            delete this.registry.records[hash];
            const filePath = path.join(this.cacheDir, `${hash}.json`);
            await fs.rm(filePath, { force: true });
        }
    }

    /**
     * Persists the registry mapping to registry.json on disk.
     *
     * @returns {Promise<void>}
     */
    private async persistRegistry(): Promise<void> {
        await fs.mkdir(this.cacheDir, { recursive: true });
        const registryPath = path.join(this.cacheDir, 'registry.json');
        await fs.writeFile(registryPath, JSON.stringify(this.registry, null, 2), 'utf-8');
    }
}
