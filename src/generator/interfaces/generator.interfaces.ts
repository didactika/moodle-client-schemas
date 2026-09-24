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
    /** Relative import path for index.ts (e.g. './core/course/get_courses.webservice-client') */
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
