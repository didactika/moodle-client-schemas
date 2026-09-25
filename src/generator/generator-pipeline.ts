import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { resolveWebserviceFilePath } from './resolver/path-resolver';
import { emitWebserviceCode, hasRequiredParameters } from './emitter/ts-code-emitter';
import { emitBarrelCode } from './emitter/barrel-emitter';
import { loadOrCreateConfig, DEFAULT_CONFIG_FILENAME } from './config/config-manager';
import { cloneMoodleVersion, cleanupMoodleDirectory } from './downloader/single-version-downloader';
import { extractWebservice } from '../webservice-extractor';
import {
    WebServiceSchema,
    GeneratedServiceMetadata
} from './interfaces/generator.interfaces';
import {
    hasExistingSchemas,
    syncSchemas,
    resolveInternalPackageSchemasDir
} from './syncer/schema-syncer';

/**
 * Generates all individual `.webservice-client.ts` files and the central `index.ts` barrel.
 * Wipes outDir before generating to eliminate any orphaned or stale files from previous runs.
 *
 * @param {WebServiceSchema[]} schemas - List of extracted webservice schemas
 * @param {string} outDir - Target output directory
 * @returns {Promise<void>}
 */
export async function generateWebserviceFiles(
    schemas: WebServiceSchema[],
    outDir: string
): Promise<void> {
    // 1. Wipe and re-create outDir to ensure no orphaned files remain
    await fs.rm(outDir, { recursive: true, force: true });
    await fs.mkdir(outDir, { recursive: true });

    const metadataList: GeneratedServiceMetadata[] = [];

    // 2. Emit each webservice in its hierarchical folder
    for (const schema of schemas) {
        const relFilePath = resolveWebserviceFilePath(schema.name);
        const absoluteFilePath = path.join(outDir, relFilePath);

        const parentDir = path.dirname(absoluteFilePath);
        await fs.mkdir(parentDir, { recursive: true });

        const code = emitWebserviceCode(schema);
        await fs.writeFile(absoluteFilePath, code, 'utf-8');

        const relativeImportPath = `./${relFilePath.replace(/\.d\.ts$/, '').replace(/\.ts$/, '')}`;
        metadataList.push({
            name: schema.name,
            relativeImportPath,
            hasRequiredParams: hasRequiredParameters(schema),
            description: schema.description,
            paramsDescription: schema.parameters?.description,
            returnsDescription: schema.returns?.description
        });
    }

    // 3. Emit central index.d.ts and index.ts barrel
    const barrelCode = emitBarrelCode(metadataList);
    await fs.writeFile(path.join(outDir, 'index.d.ts'), barrelCode, 'utf-8');
    await fs.writeFile(path.join(outDir, 'index.ts'), barrelCode, 'utf-8');
}

/**
 * Runs the complete end-to-end generator pipeline:
 * 1. Loads or creates config.
 * 2. If outDir is specified and schemas already exist, skips extraction and synchronizes with package.
 * 3. Otherwise extracts webservice AST schemas via headless PHP adapter.
 * 4. Generates files and synchronizes them into internal package.
 */
export interface RunGeneratorPipelineOptions {
    silent?: boolean;
}

function logInfo(message: string, silent?: boolean): void {
    if (!silent) {
        console.log(message);
    }
}

/**
 * Executes the complete web service generation and synchronization pipeline.
 *
 * @param {string} [configPath] - Optional path to config file
 * @param {RunGeneratorPipelineOptions} [options] - Pipeline options
 * @returns {Promise<void>}
 */
export async function runGeneratorPipeline(
    configPath?: string,
    options?: RunGeneratorPipelineOptions
): Promise<void> {
    const resolvedConfigPath = configPath
        ? path.resolve(configPath)
        : path.resolve(process.cwd(), DEFAULT_CONFIG_FILENAME);
    const configDir = path.dirname(resolvedConfigPath);

    const config = await loadOrCreateConfig(configPath);

    if (config.outDir) {
        const resolvedOutDir = path.resolve(configDir, config.outDir);
        const existsWithSchemas = await hasExistingSchemas(resolvedOutDir);

        if (existsWithSchemas) {
            logInfo(`[moodle-client] Schemas already exist in '${config.outDir}'. Generation skipped.`, options?.silent);
            const { syncedCount } = await syncSchemas(resolvedOutDir, configDir);
            logInfo(
                `[moodle-client] Synchronized ${syncedCount} schemas from '${config.outDir}' to internal '@didactika/moodle-client' package.`,
                options?.silent
            );
            logInfo(
                `[moodle-client] You can import types and clients directly: import { MoodleClient, MoodleResponse, ... } from "@didactika/moodle-client";`,
                options?.silent
            );
            return;
        }
    }

    // Determine target output directory
    const targetOutDir = config.outDir
        ? path.resolve(configDir, config.outDir)
        : resolveInternalPackageSchemasDir(configDir);

    let targetMoodlePath = config.moodlePath;
    let shouldCleanup = false;

    if (!targetMoodlePath) {
        const tempCloneDir = path.join(os.tmpdir(), `moodle-v${config.version}-${Date.now()}`);
        targetMoodlePath = await cloneMoodleVersion(config.version, tempCloneDir);
        shouldCleanup = true;
    }

    try {
        const result = await extractWebservice({
            moodlePath: targetMoodlePath,
            services: config.webservices,
            concurrency: 8
        });

        if (result.errors && result.errors.length > 0) {
            for (const err of result.errors) {
                console.error(
                    `[moodle-client] Extraction error: [${err.code}] ${err.serviceName ? `(${err.serviceName}) ` : ''}${err.message}`
                );
            }
            if (result.schemas.length === 0) {
                throw new Error(
                    `Failed to extract web services: ${result.errors[0]?.message ?? 'Unknown extraction error'}`
                );
            }
        }

        await generateWebserviceFiles(result.schemas as any, targetOutDir);

        // Synchronize with internal package
        const { syncedCount } = await syncSchemas(targetOutDir, configDir);

        if (config.outDir) {
            logInfo(
                `[moodle-client] Successfully generated ${result.schemas.length} webservices into '${config.outDir}'.`,
                options?.silent
            );
            logInfo(
                `[moodle-client] Synchronized ${syncedCount} schemas from '${config.outDir}' to internal '@didactika/moodle-client' package.`,
                options?.silent
            );
        } else {
            logInfo(
                `[moodle-client] Successfully generated ${result.schemas.length} webservices into internal '@didactika/moodle-client' package.`,
                options?.silent
            );
        }
        logInfo(
            `[moodle-client] You can import types and clients directly: import { MoodleClient, MoodleResponse, ... } from "@didactika/moodle-client";`,
            options?.silent
        );
    } finally {
        if (shouldCleanup && targetMoodlePath) {
            await cleanupMoodleDirectory(targetMoodlePath);
        }
    }
}
