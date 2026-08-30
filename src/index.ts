export { extractWebservice, ExtractWebserviceOptions } from './webservice-extractor';
export { sanitizeDescription } from './webservice-extractor/utils/description-utils';
export {
    WebServiceSchema,
    WebServiceExtractionError,
    ExtractWebserviceResult,
    WebServiceErrorCode
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
