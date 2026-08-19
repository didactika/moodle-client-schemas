export interface ExtractorConfig {
    version: string;
    moodlePath: string;
    outputPath: string;
}

export interface ExtractorResult {
    version: string;
    totalServices: number;
    outputPath: string;
}
