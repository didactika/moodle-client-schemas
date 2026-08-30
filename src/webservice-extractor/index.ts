import fs from 'fs/promises';
import path from 'path';
import pLimit from 'p-limit';
import { MoodleService } from './interfaces/service-extractor.interfaces';
import {
    WebServiceSchema,
    WebServiceExtractionError,
    ExtractWebserviceResult,
    WebServiceErrorCode
} from './interfaces/schema-extractor.interfaces';
import { WebserviceSignature } from './interfaces/signature.interfaces';

import { findFiles } from './scanner/scanner';
import { getAst, clearAstCache } from './cache/ast-manager';
import { extractServices } from './extractor/service-extractor';
import { resolveClass } from './resolver/class-resolver';
import { extractWebserviceSignature } from './adapter/php-signature-extractor';
import { sanitizeDescription } from './utils/description-utils';
import { cleanupPhpRuntime, validatePhpRuntime } from './adapter/php-runtime';

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

interface SingleServiceExtractionResult {
    schema?: WebServiceSchema;
    error?: WebServiceExtractionError;
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
    const cleanDesc = sanitizeDescription(service.description);
    const schema: WebServiceSchema = {
        name: service.name,
        parameters: signature.parameters,
        returns: signature.returns
    };
    if (cleanDesc) {
        schema.description = cleanDesc;
    }
    return schema;
}

/**
 * Classifies a stat error into a structured WebServiceExtractionError.
 *
 * @param {unknown} err - Caught error.
 * @param {string} moodlePath - Target directory path.
 * @returns {WebServiceExtractionError} Classified error.
 */
function classifyStatError(err: unknown, moodlePath: string): WebServiceExtractionError {
    const nodeErr = err as NodeJS.ErrnoException;
    if (nodeErr.code === 'EACCES' || nodeErr.code === 'EPERM') {
        return {
            code: 'PERMISSION_DENIED',
            message: `Permission denied: Cannot access Moodle directory at '${moodlePath}'. Please check filesystem permissions.`
        };
    }
    return {
        code: 'INVALID_MOODLE_PATH',
        message: `The provided Moodle path does not exist on disk: '${moodlePath}'`
    };
}

/**
 * Validates directory existence and type via fs.stat.
 *
 * @param {string} moodlePath - Target path.
 * @returns {Promise<WebServiceExtractionError | null>} Error or null.
 */
async function checkDirectoryStat(moodlePath: string): Promise<WebServiceExtractionError | null> {
    try {
        const stat = await fs.stat(moodlePath);
        if (!stat.isDirectory()) {
            return {
                code: 'INVALID_MOODLE_PATH',
                message: `The provided Moodle path is a file, not a directory: '${moodlePath}'`
            };
        }
        return null;
    } catch (err) {
        return classifyStatError(err, moodlePath);
    }
}

/**
 * Classifies a read/readdir error into a structured WebServiceExtractionError.
 *
 * @param {unknown} err - Caught error.
 * @param {string} moodlePath - Target directory path.
 * @returns {WebServiceExtractionError} Classified error.
 */
function classifyReadError(err: unknown, moodlePath: string): WebServiceExtractionError {
    const nodeErr = err as NodeJS.ErrnoException;
    if (nodeErr.code === 'EACCES' || nodeErr.code === 'EPERM') {
        return {
            code: 'PERMISSION_DENIED',
            message: `Permission denied: Cannot read contents of Moodle directory at '${moodlePath}'.`
        };
    }
    return {
        code: 'INVALID_MOODLE_PATH',
        message: `Cannot read directory at '${moodlePath}': ${nodeErr.message}`
    };
}

/**
 * Validates that the Moodle directory has read and list permissions.
 *
 * @param {string} moodlePath - Target path.
 * @returns {Promise<WebServiceExtractionError | null>} Error or null.
 */
async function checkDirectoryReadability(moodlePath: string): Promise<WebServiceExtractionError | null> {
    try {
        await fs.access(moodlePath, fs.constants.R_OK);
        await fs.readdir(moodlePath);
        return null;
    } catch (err) {
        return classifyReadError(err, moodlePath);
    }
}

/**
 * Checks if a specific file exists and is a file.
 *
 * @param {string} filePath - Absolute path to test.
 * @returns {Promise<boolean>} True if file exists.
 */
async function hasVersionFile(filePath: string): Promise<boolean> {
    try {
        const stat = await fs.stat(filePath);
        return stat.isFile();
    } catch {
        return false;
    }
}

/**
 * Checks whether version.php exists directly at the root or under public/.
 *
 * @param {string} moodlePath - Target directory.
 * @returns {Promise<boolean>} True if valid direct root.
 */
async function checkDirectMoodleRoot(moodlePath: string): Promise<boolean> {
    if (await hasVersionFile(path.join(moodlePath, 'version.php'))) {
        return true;
    }
    return hasVersionFile(path.join(moodlePath, 'public', 'version.php'));
}

/**
 * Checks subfolder for direct Moodle root and appends to list if found.
 *
 * @param {string} basePath - Parent path.
 * @param {string} subDirName - Subfolder name.
 * @param {string[]} list - Accumulated list.
 */
async function inspectSubEntry(basePath: string, subDirName: string, list: string[]): Promise<void> {
    if (await checkDirectMoodleRoot(path.join(basePath, subDirName))) {
        list.push(subDirName);
    }
}

/**
 * Evaluates a single directory entry and records it if it contains a Moodle root.
 *
 * @param {string} basePath - Parent path.
 * @param {import('fs').Dirent} entry - Directory entry.
 * @param {string[]} list - Accumulated list.
 */
async function processSubMoodleEntry(
    basePath: string,
    entry: import('fs').Dirent,
    list: string[]
): Promise<void> {
    if (entry.isDirectory()) {
        await inspectSubEntry(basePath, entry.name, list);
    }
}

/**
 * Discovers any child directories containing a direct Moodle root.
 *
 * @param {string} moodlePath - Parent directory path.
 * @returns {Promise<string[]>} List of sub-moodle directory names.
 */
async function findSubMoodles(moodlePath: string): Promise<string[]> {
    try {
        const entries = await fs.readdir(moodlePath, { withFileTypes: true });
        const subMoodles: string[] = [];
        for (const entry of entries) {
            await processSubMoodleEntry(moodlePath, entry, subMoodles);
        }
        return subMoodles;
    } catch {
        return [];
    }
}

/**
 * Formats an informative error when a parent directory with sub-moodles was provided instead of a root.
 *
 * @param {string} moodlePath - Provided directory path.
 * @param {string[]} subMoodles - Discovered subdirectories.
 * @returns {WebServiceExtractionError} Descriptive error.
 */
function formatMultipleMoodlesError(moodlePath: string, subMoodles: string[]): WebServiceExtractionError {
    if (subMoodles.length > 1) {
        return {
            code: 'INVALID_MOODLE_PATH',
            message: `The provided path '${moodlePath}' contains multiple Moodle installations (found: ${subMoodles.join(', ')}). Please specify the exact root directory of the desired Moodle instance.`
        };
    }
    return {
        code: 'INVALID_MOODLE_PATH',
        message: `The provided path '${moodlePath}' is not a direct Moodle root. A Moodle codebase was detected in '${path.join(moodlePath, subMoodles[0])}'. Please specify the direct Moodle root directory.`
    };
}

/**
 * Validates that the directory has a version.php at its root rather than being a parent container.
 *
 * @param {string} moodlePath - Moodle directory path.
 * @returns {Promise<WebServiceExtractionError | null>} Error or null if valid.
 */
async function validateMoodleRootStructure(moodlePath: string): Promise<WebServiceExtractionError | null> {
    if (await checkDirectMoodleRoot(moodlePath)) {
        return null;
    }
    const subMoodles = await findSubMoodles(moodlePath);
    if (subMoodles.length > 0) {
        return formatMultipleMoodlesError(moodlePath, subMoodles);
    }
    return {
        code: 'INVALID_MOODLE_PATH',
        message: `The provided directory is not a valid Moodle codebase (no version.php found at root): '${moodlePath}'`
    };
}

/**
 * Validates that the provided Moodle path exists, is readable, and is a direct Moodle root.
 *
 * @param {string} moodlePath - Resolved Moodle codebase path.
 * @returns {Promise<WebServiceExtractionError | null>} Error object or null if valid.
 */
async function validateMoodleLocation(moodlePath: string): Promise<WebServiceExtractionError | null> {
    const statError = await checkDirectoryStat(moodlePath);
    if (statError) {
        return statError;
    }
    const readError = await checkDirectoryReadability(moodlePath);
    if (readError) {
        return readError;
    }
    return validateMoodleRootStructure(moodlePath);
}

/**
 * Validates that PHP CLI is installed and compatible (PHP >= 7.4).
 *
 * @returns {Promise<WebServiceExtractionError | null>} Error object or null if valid.
 */
async function validatePhpCliEnvironment(): Promise<WebServiceExtractionError | null> {
    const phpCheck = await validatePhpRuntime();
    if (!phpCheck.valid) {
        return phpCheck.error ?? {
            code: 'PHP_NOT_FOUND',
            message: 'PHP CLI is not installed or not accessible in your system PATH.'
        };
    }
    return null;
}

/**
 * Classifies an execution error into a standardized error code.
 *
 * @param {unknown} err - Error object.
 * @returns {WebServiceErrorCode} Error classification code.
 */
function classifyExecutionError(err: unknown): WebServiceErrorCode {
    const msg = String(err);
    if (/(EACCES|EPERM|Permission denied)/i.test(msg)) {
        return 'PERMISSION_DENIED';
    }
    return 'INTROSPECTION_FAILED';
}

/**
 * Formats a caught execution error into a structured SingleServiceExtractionResult.
 *
 * @param {MoodleService} service - Service metadata.
 * @param {string} classFilePath - Resolved class file path.
 * @param {unknown} err - Caught error.
 * @returns {SingleServiceExtractionResult} Error payload.
 */
function formatSignatureError(
    service: MoodleService,
    classFilePath: string,
    err: unknown
): SingleServiceExtractionResult {
    const message = err instanceof Error ? err.message : String(err);
    return {
        error: {
            serviceName: service.name,
            classname: service.classname,
            classFile: classFilePath,
            code: classifyExecutionError(err),
            message,
            cause: message
        }
    };
}

/**
 * Extracts signature safely, returning structured schema or capturing execution error.
 *
 * @param {MoodleService} service - Service definition.
 * @param {string} classFilePath - Resolved relative class path.
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<SingleServiceExtractionResult>} Schema or error.
 */
async function safelyExtractSignature(
    service: MoodleService,
    classFilePath: string,
    moodlePath: string
): Promise<SingleServiceExtractionResult> {
    try {
        const methodname = service.methodname ?? 'execute';
        const signature = await extractWebserviceSignature({
            moodlePath,
            classFile: classFilePath,
            classname: service.classname,
            methodname
        });
        return { schema: assembleServiceSchema(service, signature) };
    } catch (err) {
        return formatSignatureError(service, classFilePath, err);
    }
}

/**
 * Processes a single Web Service: resolves its PHP class and extracts parameters and returns.
 *
 * @param {MoodleService} service - Web Service definition.
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<SingleServiceExtractionResult>} Result with schema or error.
 */
async function processSingleService(
    service: MoodleService,
    moodlePath: string
): Promise<SingleServiceExtractionResult> {
    const classFilePath = await resolveClass(service, moodlePath);
    if (!classFilePath) {
        return {
            error: {
                serviceName: service.name,
                classname: service.classname,
                code: 'CLASS_NOT_FOUND',
                message: `Could not resolve class file on disk for class '${service.classname}'`
            }
        };
    }
    return safelyExtractSignature(service, classFilePath, moodlePath);
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
 * Normalizes input Moodle directory path to an absolute path supporting home directory expansion.
 *
 * @param {string} rawPath - Input path from options.
 * @returns {string} Normalized absolute path.
 */
function resolveMoodlePath(rawPath: string): string {
    const expanded = rawPath.startsWith('~')
        ? path.join(process.env.HOME ?? '', rawPath.slice(1))
        : rawPath;
    return path.resolve(expanded);
}

/**
 * Appends single service result to schema list or error list.
 *
 * @param {SingleServiceExtractionResult} res - Result object.
 * @param {WebServiceSchema[]} schemas - Target schema list.
 * @param {WebServiceExtractionError[]} errors - Target error list.
 */
function accumulateResult(
    res: SingleServiceExtractionResult,
    schemas: WebServiceSchema[],
    errors: WebServiceExtractionError[]
): void {
    if (res.schema) {
        schemas.push(res.schema);
    }
    if (res.error) {
        errors.push(res.error);
    }
}

/**
 * Partitions parallel service extraction results into schemas and non-fatal errors.
 *
 * @param {SingleServiceExtractionResult[]} results - Array of extraction results.
 * @returns {{ schemas: WebServiceSchema[]; serviceErrors: WebServiceExtractionError[] }} Partitioned output.
 */
function partitionResults(results: SingleServiceExtractionResult[]): {
    schemas: WebServiceSchema[];
    serviceErrors: WebServiceExtractionError[];
} {
    const schemas: WebServiceSchema[] = [];
    const serviceErrors: WebServiceExtractionError[] = [];
    for (const res of results) {
        accumulateResult(res, schemas, serviceErrors);
    }
    return { schemas, serviceErrors };
}

/**
 * Performs environment and path preconditions check.
 *
 * @param {string} moodlePath - Target codebase path.
 * @returns {Promise<WebServiceExtractionError | null>} Error or null if ready.
 */
async function checkPreconditions(moodlePath: string): Promise<WebServiceExtractionError | null> {
    const pathError = await validateMoodleLocation(moodlePath);
    if (pathError) {
        return pathError;
    }
    return validatePhpCliEnvironment();
}

/**
 * Checks if a single filter matched at least one service.
 *
 * @param {string} filter - Filter pattern or name.
 * @param {MoodleService[]} allServices - Available services.
 * @returns {boolean} True if matched.
 */
function isFilterMatched(filter: string, allServices: MoodleService[]): boolean {
    if (filter === '*') {
        return true;
    }
    return allServices.some(service => isMatch(service.name, filter));
}

/**
 * Validates a single filter and collects a SERVICE_NOT_FOUND error if unmatched.
 *
 * @param {string} filter - Filter pattern.
 * @param {MoodleService[]} allServices - All services.
 * @param {WebServiceExtractionError[]} errors - Target error list.
 */
function collectFilterError(
    filter: string,
    allServices: MoodleService[],
    errors: WebServiceExtractionError[]
): void {
    if (!isFilterMatched(filter, allServices)) {
        errors.push({
            serviceName: filter,
            code: 'SERVICE_NOT_FOUND',
            message: `Web service or filter pattern '${filter}' was not found in any declared db/services.php.`
        });
    }
}

/**
 * Discovers any requested service filters that did not match any declared services.
 *
 * @param {string[]} [filters] - User supplied filters.
 * @param {MoodleService[]} allServices - All declared services.
 * @returns {WebServiceExtractionError[]} List of missing service errors.
 */
function findUnmatchedFilterErrors(
    filters: string[] | undefined,
    allServices: MoodleService[]
): WebServiceExtractionError[] {
    const list = filters ?? [];
    const errors: WebServiceExtractionError[] = [];
    for (const filter of list) {
        collectFilterError(filter, allServices, errors);
    }
    return errors;
}

/**
 * Extracts and filters services from discovered services.php files.
 *
 * @param {string[]} serviceFiles - Discovered services.php paths.
 * @param {string} moodlePath - Moodle root path.
 * @param {ExtractWebserviceOptions} options - User options.
 * @returns {Promise<ExtractWebserviceResult>} Extracted schemas and errors.
 */
async function extractDiscoveredServices(
    serviceFiles: string[],
    moodlePath: string,
    options: ExtractWebserviceOptions
): Promise<ExtractWebserviceResult> {
    const allServices = await collectAllServices(serviceFiles, moodlePath);
    const filterErrors = findUnmatchedFilterErrors(options.services, allServices);
    const filtered = allServices.filter(s => matchesAnyFilter(s.name, options.services));

    const limit = pLimit(options.concurrency ?? 8);
    const tasks = filtered.map(service => limit(() => processSingleService(service, moodlePath)));
    const results = await Promise.all(tasks);

    const { schemas, serviceErrors } = partitionResults(results);
    return { schemas, errors: [...filterErrors, ...serviceErrors] };
}

/**
 * Creates an empty result when no services.php files are discovered.
 *
 * @param {string} moodlePath - Moodle directory path.
 * @returns {ExtractWebserviceResult} Empty result with INVALID_MOODLE_PATH error.
 */
function createNoServicesResult(moodlePath: string): ExtractWebserviceResult {
    return {
        schemas: [],
        errors: [
            {
                code: 'INVALID_MOODLE_PATH',
                message: `The provided directory is not a valid Moodle codebase (no services.php files discovered): ${moodlePath}`
            }
        ]
    };
}

/**
 * Extracts Web Service schemas from a local Moodle repository with optional service filtering and error tracking.
 *
 * @example
 * 1. Extract all available Web Services and handle results/errors:
 * ```ts
 * import { extractWebservice } from '@didactika/moodle-client-schemas';
 *
 * const { schemas, errors } = await extractWebservice({
 *     moodlePath: '/var/www/moodle'
 * });
 * console.log('Extracted: ' + schemas.length + ', Errors: ' + errors.length);
 * ```
 *
 * @example
 * 2. Filter by component prefix using wildcard patterns:
 * ```ts
 * const { schemas, errors } = await extractWebservice({
 *     moodlePath: '~/moodle',
 *     services: ['core_user_*', 'mod_forum_*', 'enrol_manual_*']
 * });
 * ```
 *
 * @param {ExtractWebserviceOptions} options - Extraction configuration options.
 * @returns {Promise<ExtractWebserviceResult>} Combined result with schemas and error details.
 */
export async function extractWebservice(
    options: ExtractWebserviceOptions
): Promise<ExtractWebserviceResult> {
    try {
        const moodlePath = resolveMoodlePath(options.moodlePath);

        const envError = await checkPreconditions(moodlePath);
        if (envError) {
            return { schemas: [], errors: [envError] };
        }

        const serviceFiles = await findFiles(moodlePath, ['*/db/services.php']);
        if (serviceFiles.length === 0) {
            return createNoServicesResult(moodlePath);
        }

        return await extractDiscoveredServices(serviceFiles, moodlePath, options);
    } finally {
        clearAstCache();
        await cleanupPhpRuntime();
    }
}
