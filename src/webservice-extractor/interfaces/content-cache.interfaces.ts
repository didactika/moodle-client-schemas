export interface EpochRegistryData {
    currentEpoch: number;
    records: Record<string, number>;
}

export interface ContentCacheConfig {
    cacheDir: string;
    maxEpochAge: number;
}
