import { ExtractorConfig, ExtractorResult } from './interfaces/extractor.interfaces';
import { MoodleService } from './interfaces/service-extractor.interfaces';
import { WebServiceSchema } from './interfaces/schema-extractor.interfaces';

import { findFiles } from './scanner/scanner';
import { getAst } from './cache/ast-manager';
import { extractServices } from './extractor/service-extractor';
import { resolveClass } from './resolver/class-resolver';
import { extractSchema } from './extractor/schema-extractor';
import { saveJson } from './generator/json-generator';

/**
 * Processes a single Web Service: resolves its PHP class, retrieves AST, and extracts its schema.
 *
 * @param {MoodleService} service - Web Service definition extracted from services.php.
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<WebServiceSchema | null>} Structured schema or null if unresolvable.
 */
async function processSingleService(
    service: MoodleService,
    moodlePath: string
): Promise<WebServiceSchema | null> {
    const resolved = await resolveClass(service, moodlePath);
    if (!resolved) {
        return null;
    }

    const classAst = await getAst(resolved.file, moodlePath);
    return extractSchema(classAst, service);
}

/**
 * Processes a single db/services.php file: obtains AST, extracts functions, and processes each.
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
 * @param {ExtractorConfig} config - Version and input/output path configuration.
 * @returns {Promise<ExtractorResult>} Structured summary of the extraction result.
 */
export async function extractWebServices(config: ExtractorConfig): Promise<ExtractorResult> {
    const serviceFiles = await findFiles(config.moodlePath);
    const schemas = await collectAllSchemas(serviceFiles, config.moodlePath);

    await saveJson(schemas, config.outputPath);

    return {
        version: config.version,
        totalServices: schemas.length,
        outputPath: config.outputPath
    };
}
