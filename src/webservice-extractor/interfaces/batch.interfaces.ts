import { WebserviceSignature } from './signature.interfaces';
import { MoodleService } from './service-extractor.interfaces';
import { WebServiceErrorCode } from './schema-extractor.interfaces';

/**
 * Classified failure of a single service extraction.
 */
export interface ExtractionFailure {
    /** Machine-readable failure classification */
    code: WebServiceErrorCode;
    /** Human-readable failure description */
    message: string;
}

/**
 * Single service item dispatched to the batch PHP runner via STDIN.
 */
export interface BatchServiceItem {
    serviceName: string;
    classFile: string;
    classname: string;
    methodname: string;
}

/**
 * Resolved service with its file path on disk.
 */
export interface ResolvedServiceEntry {
    service: MoodleService;
    classFilePath: string | null;
    /** Resolution failure, if class resolution threw */
    error?: ExtractionFailure;
}

/**
 * Successful extraction result emitted by batch runner via STDOUT NDJSON.
 */
export interface BatchStreamSuccessItem {
    serviceName: string;
    success: true;
    signature: WebserviceSignature;
}

/**
 * Controlled service extraction failure emitted by batch runner via STDOUT NDJSON.
 */
export interface BatchStreamFailureItem {
    serviceName: string;
    success: false;
    error: string;
    /** Machine-readable WebServiceErrorCode emitted by the PHP runner */
    errorCode?: string;
    file?: string;
    line?: number;
}

/**
 * Discriminated union of streaming NDJSON items emitted per service.
 */
export type BatchStreamItem = BatchStreamSuccessItem | BatchStreamFailureItem;

/**
 * Fatal crash payload emitted to STDERR by PHP shutdown handler on die()/exit().
 */
export interface BatchFatalErrorPayload {
    success: false;
    serviceName?: string;
    error: string;
    /** Machine-readable WebServiceErrorCode emitted by the PHP runner */
    errorCode?: string;
    file?: string;
    line?: number;
}

/**
 * Consolidated outcome of executing a batch streaming session.
 */
export interface BatchExecutionResult {
    signatures: Map<string, WebserviceSignature>;
    errors: Map<string, ExtractionFailure>;
    uncompleted: BatchServiceItem[];
}

/**
 * Listener notified each time a service finishes (successfully or not).
 */
export type BatchProgressListener = (completed: number, total: number, serviceName?: string) => void;

/**
 * Progress lifecycle handler for batch extraction sessions.
 */
export interface BatchProgressHandler {
    onProgress?: BatchProgressListener;
    finish: () => void;
}

/**
 * Mutable state of a single batch PHP process run.
 */
export interface BatchProcessState {
    stderr: string;
    timedOut: boolean;
    spawnError: Error | null;
    settled: boolean;
    timeoutMs: number;
}

/**
 * Inactivity watchdog controller for the batch PHP process.
 */
export interface IdleWatchdog {
    reset: () => void;
    clear: () => void;
}


