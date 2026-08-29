import { WebServiceParametersSchema, WebServiceReturnSchema } from './signature.interfaces';

/**
 * Error code classification for extraction and environment failures.
 */
export type WebServiceErrorCode =
    | 'INVALID_MOODLE_PATH'
    | 'PHP_NOT_FOUND'
    | 'PHP_VERSION_UNSUPPORTED'
    | 'SERVICE_NOT_FOUND'
    | 'CLASS_NOT_FOUND'
    | 'INTROSPECTION_FAILED'
    | 'PERMISSION_DENIED';

/**
 * Detailed failure information reported during environment validation or single service extraction.
 */
export interface WebServiceExtractionError {
    /** Target Web Service function name (e.g. 'core_user_get_users') if applicable */
    serviceName?: string;
    /** Target PHP class name if applicable */
    classname?: string;
    /** Target PHP class file path if applicable */
    classFile?: string;
    /** Standardized error category code */
    code?: WebServiceErrorCode;
    /** Human-readable explanation of what failed */
    message: string;
    /** Raw underlying error message or stack trace */
    cause?: string;
}

/**
 * Normalized schema contract for a single extracted Moodle Web Service.
 */
export interface WebServiceSchema {
    /** Web Service function name (e.g. 'core_user_get_users') */
    name: string;
    /** Human-readable description extracted from services.php or docblocks */
    description?: string;
    /** Parameter structure schema (maps to external_function_parameters) */
    parameters: WebServiceParametersSchema | null;
    /** Return structure schema (maps to external_description) */
    returns: WebServiceReturnSchema | null;
}

/**
 * Combined output contract returned by extractWebservice.
 */
export interface ExtractWebserviceResult {
    /** List of successfully extracted Web Service schemas */
    schemas: WebServiceSchema[];
    /** List of errors encountered during environment validation or individual service extraction */
    errors: WebServiceExtractionError[];
}
