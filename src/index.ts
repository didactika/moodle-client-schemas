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

// Generator pipeline & interfaces
export { runGeneratorPipeline, generateWebserviceFiles } from './generator/generator-pipeline';
export { runGeneratorWithProgress, buildBox } from './generator/ui/progress-bar';
export { loadOrCreateConfig, normalizeMoodleVersion } from './generator/config/config-manager';
export type { MoodleClientConfig, RawMoodleClientConfig } from './generator/interfaces/config.interfaces';
export type { GeneratedServiceMetadata } from './generator/interfaces/generator.interfaces';

// Preloaded schemas are re-exported via declaration in dist/index.d.ts
