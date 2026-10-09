import fs from 'fs/promises';
import path from 'path';
import { resolveWebserviceFilePath } from './resolver/path-resolver';
import { emitWebserviceCode, hasRequiredParameters } from './emitter/ts-code-emitter';
import { emitBarrelCode, BarrelEmitterOptions } from './emitter/barrel-emitter';
import {
    WebServiceSchema,
    GeneratedServiceMetadata
} from './interfaces/generator.interfaces';
import { MoodleGeneratorError } from './errors/generator-error';

export type GenerateWebserviceFilesOptions = BarrelEmitterOptions;

function isWebserviceFile(filename: string): boolean {
    return (
        filename.endsWith('.webservice.d.ts') ||
        filename.endsWith('.webservice.ts') ||
        filename.endsWith('.webservice-client.d.ts') ||
        filename.endsWith('.webservice-client.ts') ||
        filename === 'index.d.ts' ||
        filename === 'index.d.mts' ||
        filename === 'index.ts'
    );
}

/**
 * Selectively removes previously generated webservice files and barrels,
 * pruning empty directories bottom-up while strictly preserving user files.
 */
export async function cleanPreviousWebserviceFiles(dir: string, isRoot = true): Promise<boolean> {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                const canRemove = await cleanPreviousWebserviceFiles(fullPath, false);
                if (canRemove) {
                    try {
                        await fs.rmdir(fullPath);
                    } catch {
                        // Directory not empty
                    }
                }
            } else if (entry.isFile() && isWebserviceFile(entry.name)) {
                await fs.unlink(fullPath);
            }
        }
        if (!isRoot) {
            const remaining = await fs.readdir(dir);
            return remaining.length === 0;
        }
        return false;
    } catch {
        return false;
    }
}

/**
 * Generates all individual `.webservice.d.ts` files and the central `index.d.ts` barrel.
 * Selectively cleans previous webservice files before generating, preserving any user files.
 *
 * @param {WebServiceSchema[]} schemas - List of extracted webservice schemas
 * @param {string} targetDir - Target directory for schemas
 * @param {GenerateWebserviceFilesOptions} [options] - Optional barrel generation options
 * @returns {Promise<void>}
 */
export async function generateWebserviceFiles(
    schemas: WebServiceSchema[],
    targetDir: string,
    options?: GenerateWebserviceFilesOptions
): Promise<void> {
    try {
        await fs.mkdir(targetDir, { recursive: true });
        await cleanPreviousWebserviceFiles(targetDir, true);

        const metadataList: GeneratedServiceMetadata[] = [];

        for (const schema of schemas) {
            const relFilePath = resolveWebserviceFilePath(schema.name);
            const dtsFilePath = path.join(targetDir, relFilePath);

            const parentDir = path.dirname(dtsFilePath);
            await fs.mkdir(parentDir, { recursive: true });

            const code = emitWebserviceCode(schema);
            await fs.writeFile(dtsFilePath, code, 'utf-8');

            const relativeImportPath = `./${relFilePath.replace(/\.d\.ts$/, '')}`;
            metadataList.push({
                name: schema.name,
                relativeImportPath,
                hasRequiredParams: hasRequiredParameters(schema),
                description: schema.description,
                paramsDescription: schema.parameters?.description,
                returnsDescription: schema.returns?.description
            });
        }

        const barrelCode = emitBarrelCode(metadataList, options);
        await fs.writeFile(path.join(targetDir, 'index.d.ts'), barrelCode, 'utf-8');
    } catch (err: unknown) {
        const errCode = (err as Record<string, unknown>).code;
        if (errCode === 'EACCES' || errCode === 'EPERM') {
            throw new MoodleGeneratorError({
                code: 'ERR_WRITE_PERMISSION_DENIED',
                title: 'Write Permission Denied',
                details: `Permission denied when writing schemas to destination directory: '${targetDir}'.`,
                action: 'Ensure the current user has write permissions to create and modify files in the destination directory.',
                cause: err
            });
        }
        throw err;
    }
}
