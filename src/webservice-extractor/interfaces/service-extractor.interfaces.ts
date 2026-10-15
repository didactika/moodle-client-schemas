import { WebServiceExtractionError } from './schema-extractor.interfaces';

export interface MoodleService {
    name: string;
    classname: string;
    type?: string | null;
    // if methodname is null, is '' or not exists default is 'execute'
    methodname: string;
    classpath?: string | null;
    description?: string | null;
}

/**
 * Services declared across all discovered db/services.php files, plus per-file read errors.
 */
export interface ServiceCollection {
    services: MoodleService[];
    errors: WebServiceExtractionError[];
}
