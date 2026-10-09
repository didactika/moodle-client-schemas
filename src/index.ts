export { extractWebservice, ExtractWebserviceOptions } from './webservice-extractor';
export { sanitizeDescription } from './webservice-extractor/utils/description-utils';
export { resolvePrimitiveType, PrimitiveType } from './webservice-extractor/utils/type-utils';
export {
    WebServiceSchema,
    WebServiceExtractionError,
    ExtractWebserviceResult,
    WebServiceErrorCode,
    WebServiceProgress,
    ProgressOption
} from './webservice-extractor/interfaces/schema-extractor.interfaces';
export {
    WebServiceParametersSchema,
    WebServiceReturnSchema,
    WebServiceObjectSchema,
    WebServiceArraySchema,
    WebServiceValueSchema,
    WebServiceBaseSchema,
    WebServiceSchemaKind
} from './webservice-extractor/interfaces/signature.interfaces';

// HTTP and response types
export type { HttpMethod, MoodleResponse } from './types/http.types';

// Code emission & generation
export {
    generateWebserviceFiles,
    cleanPreviousWebserviceFiles,
    GenerateWebserviceFilesOptions
} from './generator/generator-pipeline';
export {
    emitWebserviceCode,
    hasRequiredParameters
} from './generator/emitter/ts-code-emitter';
export {
    emitBarrelCode,
    BarrelEmitterOptions
} from './generator/emitter/barrel-emitter';
export {
    resolveWebserviceFilePath,
    toFullPascalCase
} from './generator/resolver/path-resolver';
export type { GeneratedServiceMetadata } from './generator/interfaces/generator.interfaces';

// Generator errors
export {
    MoodleGeneratorError,
    MoodleGeneratorErrorCode,
    MoodleGeneratorErrorOptions,
    formatError,
    mapExtractionErrorToGeneratorError
} from './generator/errors/generator-error';
