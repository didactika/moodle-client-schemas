/**
 * Ephemeral per-extraction runtime prepared before invoking the PHP sandbox.
 */
export interface ExtractionRuntime {
    /** Moodle root handed to the PHP sandbox (the original path, or a normalized disposable copy for Moodle < 4.0) */
    moodleRoot: string;
    /** Scratch dataroot exported to PHP through MOODLE_SCHEMAS_DATAROOT */
    dataroot: string;
    /** Temporary directory owning every artifact of this run; removed on disposal */
    workDir: string;
}

/**
 * Optional runtime settings forwarded to the batch signature extractor.
 */
export interface BatchExtractionOptions {
    /** Scratch dataroot exported to PHP through MOODLE_SCHEMAS_DATAROOT */
    dataroot?: string;
    /** Maximum number of concurrent isolated fallback PHP processes */
    concurrency?: number;
}
