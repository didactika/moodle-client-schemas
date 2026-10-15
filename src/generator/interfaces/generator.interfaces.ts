import { WebServiceSchema } from '../../webservice-extractor/interfaces/schema-extractor.interfaces';
import {
    WebServiceParametersSchema,
    WebServiceReturnSchema,
    WebServiceObjectSchema,
    WebServiceArraySchema,
    WebServiceValueSchema,
    WebServiceBaseSchema,
    WebServiceSchemaKind,
    PrimitiveType
} from '../../webservice-extractor/interfaces/signature.interfaces';

export {
    WebServiceSchema,
    WebServiceParametersSchema,
    WebServiceReturnSchema,
    WebServiceObjectSchema,
    WebServiceArraySchema,
    WebServiceValueSchema,
    WebServiceBaseSchema,
    WebServiceSchemaKind,
    PrimitiveType
};

/**
 * Metadata for a generated webservice client file, used by the barrel generator.
 */
export interface GeneratedServiceMetadata {
    /** Exact webservice name as registered in Moodle (e.g. 'core_course_get_courses') */
    name: string;
    /** Relative import path for index.ts (e.g. './core/course/get_courses.webservice') */
    relativeImportPath: string;
    /** Whether this service has at least one mandatory parameter (VALUE_REQUIRED) */
    hasRequiredParams: boolean;
    /** Optional human-readable description */
    description?: string;
    /** Optional human-readable description of parameters */
    paramsDescription?: string;
    /** Optional human-readable description of returns */
    returnsDescription?: string;
}

/**
 * Options controlling how the central barrel is emitted.
 */
export interface BarrelEmitterOptions {
    /**
     * Module the barrel imports `HttpMethod` and `MoodleResponse<T>` from, and the module whose
     * `MoodleClient` is augmented when `augmentClient` is true (default '@didactika/moodle-client').
     * A relative path is resolved from the barrel file itself.
     */
    importSource?: string;
    /**
     * Emit `declare module "<importSource>" { interface MoodleClient extends GeneratedMoodleServices {} }`,
     * which makes `client.<service>(params)` type-check (default false).
     * Enable it only when that client answers every service name with a function at runtime;
     * otherwise the calls compile and then fail with "is not a function".
     */
    augmentClient?: boolean;
}
