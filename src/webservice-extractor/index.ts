import path from 'path';
import { ExtractorConfig, ExtractorResult } from './interfaces/extractor.interfaces';
import { MoodleService } from './interfaces/service-extractor.interfaces';
import { WebServiceSchema } from './interfaces/schema-extractor.interfaces';
import { WebserviceSignature } from './interfaces/signature.interfaces';

import { findFiles } from './scanner/scanner';
import { getAst } from './cache/ast-manager';
import { extractServices } from './extractor/service-extractor';
import { resolveVersion } from './resolver/version-resolver';
import { isVersionGreaterOrEqual, normalizeVersion } from './utils/version-utils';
import { resolveClass } from './resolver/class-resolver';
import { extractWebserviceSignature } from './adapter/php-signature-extractor';
import { saveJson } from './generator/json-generator';

/**
 * Validates whether the repository Moodle version meets the minimum supported version (1.9).
 *
 * @example
 * ```ts
 * const supported = await isVersionSupported('/var/www/moodle');
 * if (!supported) {
 *     console.log('Skipping unsupported Moodle version');
 * }
 * ```
 *
 * @param {string} moodlePath - Root path of the Moodle repository.
 * @returns {Promise<boolean>} True if Moodle version is 1.9 or higher.
 */
async function isVersionSupported(moodlePath: string): Promise<boolean> {
    const version = await resolveVersion(moodlePath);
    return isVersionGreaterOrEqual(version, '1.9');
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
 * @example
 * ```ts
 * const service: MoodleService = {
 *     name: 'core_user_get_users',
 *     classname: 'core_user_external',
 *     methodname: 'get_users'
 * };
 * const schema = await processSingleService(service, '/var/www/moodle');
 * ```
 *
 * @param {MoodleService} service - Web Service definition extracted from services.php.
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
 * Processes a single db/services.php file: obtains AST, extracts functions, and processes each.
 *
 * @example
 * ```ts
 * const schemas = await processServicesInFile('mod/assign/db/services.php', '/var/www/moodle');
 * console.log(`Extracted ${schemas.length} schemas from mod_assign`);
 * ```
 *
 * @param {string} serviceFilePath - Path to db/services.php.
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<WebServiceSchema[]>} List of valid extracted Web Service schemas.
 */
async function processServicesInFile(
    serviceFilePath: string,
    moodlePath: string
): Promise<WebServiceSchema[]> {
    const servicesAst = await getAst(serviceFilePath, moodlePath);
    const services = extractServices(servicesAst);

    const schemaTasks = services.map(service => processSingleService(service, moodlePath));
    const schemas = await Promise.all(schemaTasks);

    return schemas.filter((schema): schema is WebServiceSchema => schema !== null);
}

/**
 * Iterates over all discovered db/services.php files and consolidates their service schemas.
 *
 * @example
 * ```ts
 * const files = ['mod/assign/db/services.php', 'user/db/services.php'];
 * const allSchemas = await collectAllSchemas(files, '/var/www/moodle');
 * ```
 *
 * @param {string[]} serviceFiles - List of paths to db/services.php.
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<WebServiceSchema[]>} Consolidated collection of Web Service schemas.
 */
async function collectAllSchemas(
    serviceFiles: string[],
    moodlePath: string
): Promise<WebServiceSchema[]> {
    const fileTasks = serviceFiles.map(file => processServicesInFile(file, moodlePath));
    const resultsByFile = await Promise.all(fileTasks);
    return resultsByFile.flat();
}

/**
 * Orchestrates the complete Web Service extraction pipeline for a given Moodle version.
 *
 * @example
 * ```ts
 * const result = await extractWebServices({
 *     version: '4.5.0',
 *     moodlePath: '/var/www/moodle',
 *     outputPath: './schemas/v/4.5.json'
 * });
 * console.log(`Successfully extracted ${result.totalServices} services`);
 * ```
 *
 * @param {ExtractorConfig} config - Version and input/output path configuration.
 * @returns {Promise<ExtractorResult>} Structured summary of the extraction result.
 */
export async function extractWebServices(config: ExtractorConfig): Promise<ExtractorResult> {
    if (!(await isVersionSupported(config.moodlePath))) {
        throw new Error('Skip, version unsupported');
    }
    const normalizedVersion = normalizeVersion(config.version);
    const targetOutputPath = config.outputPath ?? path.join('schemas/v', `${normalizedVersion}.json`);
    const serviceFiles = await findFiles(config.moodlePath, ['*/db/services.php']);
    const schemas = await collectAllSchemas(serviceFiles, config.moodlePath);

    await saveJson(schemas, targetOutputPath);

    return {
        version: normalizedVersion,
        totalServices: schemas.length,
        outputPath: targetOutputPath
    };
}
