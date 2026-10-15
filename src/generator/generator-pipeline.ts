import fs from 'fs/promises';
import path from 'path';
import { resolveWebserviceFilePath } from './resolver/path-resolver';
import { emitWebserviceCode, hasRequiredParameters } from './emitter/ts-code-emitter';
import { emitBarrelCode } from './emitter/barrel-emitter';
import {
    WebServiceSchema,
    GeneratedServiceMetadata,
    BarrelEmitterOptions
} from './interfaces/generator.interfaces';
import { MoodleGeneratorError } from './errors/generator-error';

export type GenerateWebserviceFilesOptions = BarrelEmitterOptions;

const GENERATED_SUFFIXES = [
    '.webservice.d.ts',
    '.webservice.ts',
    '.webservice-client.d.ts',
    '.webservice-client.ts'
];

const ROOT_BARREL_NAMES = new Set(['index.d.ts', 'index.d.mts', 'index.ts']);

/** Marker every barrel emitted by emitBarrelCode contains. */
const BARREL_MARKER = 'export interface GeneratedMoodleServices';

function isGeneratedServiceFile(filename: string): boolean {
    return GENERATED_SUFFIXES.some((suffix) => filename.endsWith(suffix));
}

/**
 * A root-level index file is only removed when its content proves it is a generated barrel.
 */
async function isGeneratedRootBarrel(fullPath: string, filename: string): Promise<boolean> {
    if (!ROOT_BARREL_NAMES.has(filename)) {
        return false;
    }
    try {
        const content = await fs.readFile(fullPath, 'utf-8');
        return content.includes(BARREL_MARKER);
    } catch {
        return false;
    }
}

async function isOwnedFile(fullPath: string, filename: string, isRoot: boolean): Promise<boolean> {
    if (isGeneratedServiceFile(filename)) {
        return true;
    }
    return isRoot && isGeneratedRootBarrel(fullPath, filename);
}

async function isEmptyDirectory(dir: string): Promise<boolean> {
    try {
        return (await fs.readdir(dir)).length === 0;
    } catch {
        return false;
    }
}

/**
 * Selectively removes previously generated webservice files:
 * - `*.webservice(.d).ts` / `*.webservice-client(.d).ts` files anywhere in the tree;
 * - `index.ts` / `index.d.ts` / `index.d.mts` only at the root, and only when they are generated barrels.
 * Directories are pruned only when they became empty because generated files were removed from them,
 * so user files and user directories (even empty ones) are never touched.
 *
 * @param {string} dir - Directory to clean.
 * @param {boolean} [isRoot=true] - Whether dir is the generation root.
 * @returns {Promise<boolean>} True if generated files were removed inside dir.
 */
export async function cleanPreviousWebserviceFiles(dir: string, isRoot = true): Promise<boolean> {
    let removedAny = false;
    let entries: import('fs').Dirent[];
    try {
        entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
        return false;
    }
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const removedInside = await cleanPreviousWebserviceFiles(fullPath, false);
            if (removedInside && (await isEmptyDirectory(fullPath))) {
                await fs.rmdir(fullPath);
            }
            removedAny = removedAny || removedInside;
        } else if (entry.isFile() && (await isOwnedFile(fullPath, entry.name, isRoot))) {
            await fs.unlink(fullPath);
            removedAny = true;
        }
    }
    return removedAny;
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
