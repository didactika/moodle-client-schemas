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

/**
 * Generates all individual `.webservice-client.ts` and `.webservice-client.d.ts` files
 * and the central `index.ts` / `index.d.ts` barrel.
 * Wipes targetDir before generating to eliminate any orphaned or stale files from previous runs.
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
        await fs.rm(targetDir, { recursive: true, force: true });
        await fs.mkdir(targetDir, { recursive: true });

        const metadataList: GeneratedServiceMetadata[] = [];

        for (const schema of schemas) {
            const relFilePath = resolveWebserviceFilePath(schema.name);
            const dtsFilePath = path.join(targetDir, relFilePath);
            const tsFilePath = dtsFilePath.replace(/\.d\.ts$/, '.ts');

            const parentDir = path.dirname(dtsFilePath);
            await fs.mkdir(parentDir, { recursive: true });

            const code = emitWebserviceCode(schema);
            await fs.writeFile(tsFilePath, code, 'utf-8');
            await fs.writeFile(dtsFilePath, code, 'utf-8');

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

        const barrelCode = emitBarrelCode(metadataList, options);
        await fs.writeFile(path.join(targetDir, 'index.d.ts'), barrelCode, 'utf-8');
        await fs.writeFile(path.join(targetDir, 'index.ts'), barrelCode, 'utf-8');
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
