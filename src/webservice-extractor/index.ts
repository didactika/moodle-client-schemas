import path from 'path';
import pLimit from 'p-limit';
import { MoodleService } from './interfaces/service-extractor.interfaces';
import { WebServiceSchema } from './interfaces/schema-extractor.interfaces';
import { WebserviceSignature } from './interfaces/signature.interfaces';

import { findFiles } from './scanner/scanner';
import { getAst, clearAstCache } from './cache/ast-manager';
import { extractServices } from './extractor/service-extractor';
import { resolveClass } from './resolver/class-resolver';
import { extractWebserviceSignature } from './adapter/php-signature-extractor';
import { cleanupPhpRuntime } from './adapter/php-runtime';

export interface ExtractWebserviceOptions {
    /** Root directory path of the target Moodle codebase */
    moodlePath: string;
    /**
     * Filter list of webservices to extract.
     * Pass ['*'] or omit to extract all available webservices.
     * Supports exact service names or wildcard patterns (e.g. 'core_user_*').
     */
    services?: string[];
    /** Concurrency limit for parallel signature extraction (default: 8) */
    concurrency?: number;
}

/**
 * Checks if a service name matches a wildcard prefix filter.
 *
 * @param {string} name - Service name.
 * @param {string} filter - Filter pattern.
 * @returns {boolean} True if matching prefix.
 */
function isPrefixMatch(name: string, filter: string): boolean {
    return filter.endsWith('*') && name.startsWith(filter.slice(0, -1));
}

/**
 * Checks if a service name matches a single filter string pattern.
 *
 * @param {string} name - Service name.
 * @param {string} filter - Filter pattern.
 * @returns {boolean} True if matching.
 */
function isMatch(name: string, filter: string): boolean {
    if (filter === '*' || filter === name) {
        return true;
    }
    return isPrefixMatch(name, filter);
}

/**
 * Checks if a service name matches any of the supplied filter patterns.
 *
 * @param {string} serviceName - Name of the service to check.
 * @param {string[]} [filters] - Optional filter array.
 * @returns {boolean} True if service should be included.
 */
function matchesAnyFilter(serviceName: string, filters?: string[]): boolean {
    if (!filters || filters.length === 0) {
        return true;
    }
    return filters.some(filter => isMatch(serviceName, filter));
}

/**
 * Assembles a WebServiceSchema object from service metadata and extracted signature.
 *
 * @param {MoodleService} service - Service metadata.
 * @param {WebserviceSignature} signature - Extracted parameters and returns.
 * @returns {WebServiceSchema} Assembled schema.
 */
function assembleServiceSchema(
    service: MoodleService,
    signature: WebserviceSignature
): WebServiceSchema {
    return {
        name: service.name,
        description: service.description ?? '',
        parameters: signature.parameters,
        returns: signature.returns
    };
}

/**
 * Extracts signature safely, returning null upon failure.
 *
 * @param {MoodleService} service - Service definition.
 * @param {string} classFilePath - Resolved relative class path.
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<WebserviceSignature | null>} Extracted signature or null.
 */
async function safelyExtractSignature(
    service: MoodleService,
    classFilePath: string,
    moodlePath: string
): Promise<WebserviceSignature | null> {
    try {
        return await extractWebserviceSignature({
            moodlePath,
            classFile: classFilePath,
            classname: service.classname,
            methodname: service.methodname ?? 'execute'
        });
    } catch {
        return null;
    }
}

/**
 * Processes a single Web Service: resolves its PHP class and extracts parameters and returns.
 *
 * @param {MoodleService} service - Web Service definition.
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<WebServiceSchema | null>} Structured schema or null if unresolvable.
 */
async function processSingleService(
    service: MoodleService,
    moodlePath: string
): Promise<WebServiceSchema | null> {
    const classFilePath = await resolveClass(service, moodlePath);
    if (!classFilePath) {
        return null;
    }

    const signature = await safelyExtractSignature(service, classFilePath, moodlePath);
    return signature ? assembleServiceSchema(service, signature) : null;
}

/**
 * Collects all declared services from a single db/services.php file.
 *
 * @param {string} filePath - Path to services.php file.
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<MoodleService[]>} List of declared services.
 */
async function collectServicesFromFile(filePath: string, moodlePath: string): Promise<MoodleService[]> {
    const servicesAst = await getAst(filePath, moodlePath);
    return extractServices(servicesAst);
}

/**
 * Collects all service definitions from discovered db/services.php files.
 *
 * @param {string[]} serviceFiles - Discovered services.php file paths.
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<MoodleService[]>} Flat array of all services.
 */
async function collectAllServices(serviceFiles: string[], moodlePath: string): Promise<MoodleService[]> {
    const tasks = serviceFiles.map(file => collectServicesFromFile(file, moodlePath));
    const results = await Promise.all(tasks);
    return results.flat();
}

/**
 * Extracts Web Service schemas from a local Moodle repository with optional service filtering.
 *
 * @example
 * ```ts
 * const schemas = await extractWebservice({
 *     moodlePath: '/var/www/moodle',
 *     services: ['core_user_get_users', 'mod_forum_*']
 * });
 * ```
 *
 * @param {ExtractWebserviceOptions} options - Extraction options.
 * @returns {Promise<WebServiceSchema[]>} Extracted Web Service schemas.
 */
export async function extractWebservice(
    options: ExtractWebserviceOptions
): Promise<WebServiceSchema[]> {
    try {
        const moodlePath = path.resolve(options.moodlePath);
        const serviceFiles = await findFiles(moodlePath, ['*/db/services.php']);
        const allServices = await collectAllServices(serviceFiles, moodlePath);
        const filtered = allServices.filter(s => matchesAnyFilter(s.name, options.services));

        const limit = pLimit(options.concurrency ?? 8);
        const tasks = filtered.map(service => limit(() => processSingleService(service, moodlePath)));
        const results = await Promise.all(tasks);

        return results.filter((schema): schema is WebServiceSchema => schema !== null);
    } finally {
        clearAstCache();
        await cleanupPhpRuntime();
    }
}
