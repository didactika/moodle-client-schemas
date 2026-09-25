import fs from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

export const SUPPORTED_PACKAGE_NAMES = [
    '@didactika/moodle-client',
    '@didactika/moodle-client-schemas'
];

/**
 * Finds all root directories of installed @didactika/moodle-client and @didactika/moodle-client-schemas packages.
 *
 * @param {string} baseDir - Directory to start search from (where config is located)
 * @returns {string[]} Array of unique package directories found
 */
export function findAllPackageDirs(baseDir: string): string[] {
    const foundDirs = new Set<string>();

    for (const pkgName of SUPPORTED_PACKAGE_NAMES) {
        // 1. Direct node_modules in baseDir
        const directBaseCand = path.resolve(baseDir, `node_modules/${pkgName}`);
        if (existsSync(path.join(directBaseCand, 'package.json'))) {
            foundDirs.add(directBaseCand);
            continue;
        }

        // 2. Standard require.resolve relative to baseDir
        try {
            const pkgJsonPath = require.resolve(`${pkgName}/package.json`, {
                paths: [baseDir]
            });
            foundDirs.add(path.dirname(pkgJsonPath));
            continue;
        } catch {
            // Ignored, proceed
        }

        // 3. Direct node_modules in process.cwd()
        const directCwdCand = path.resolve(process.cwd(), `node_modules/${pkgName}`);
        if (existsSync(path.join(directCwdCand, 'package.json'))) {
            foundDirs.add(directCwdCand);
            continue;
        }
    }

    if (foundDirs.size === 0) {
        // 4. Ascend upwards to check if running from inside the package directory itself
        const startDirs = [baseDir, process.cwd()];
        for (const start of startDirs) {
            let current = path.resolve(start);
            while (current !== path.dirname(current)) {
                const candidatePkg = path.join(current, 'package.json');
                if (existsSync(candidatePkg)) {
                    try {
                        const content = JSON.parse(readFileSync(candidatePkg, 'utf-8'));
                        if (SUPPORTED_PACKAGE_NAMES.includes(content.name)) {
                            foundDirs.add(current);
                            break;
                        }
                    } catch {
                        // Ignore JSON parse error
                    }
                }
                current = path.dirname(current);
            }
            if (foundDirs.size > 0) break;
        }
    }

    return Array.from(foundDirs);
}

/**
 * Finds the primary root directory of the installed @didactika/moodle-client or @didactika/moodle-client-schemas package.
 *
 * @param {string} baseDir - Directory to start search from (where config is located)
 * @returns {string | null} Package directory or null if not found
 */
export function findPackageDir(baseDir: string): string | null {
    const dirs = findAllPackageDirs(baseDir);
    return dirs.length > 0 ? dirs[0] : null;
}

/**
 * Resolves the primary internal schemas directory inside the detected package.
 *
 * @param {string} baseDir - Context directory (where config is located)
 * @returns {string} Target directory path for schemas
 */
export function resolveInternalPackageSchemasDir(baseDir: string): string {
    const pkgDir = findPackageDir(baseDir);
    if (pkgDir) {
        return path.join(pkgDir, 'dist/schemas');
    }
    return path.resolve(baseDir, 'node_modules/@didactika/moodle-client/dist/schemas');
}

/**
 * Checks if a given directory exists and contains webservice schema files.
 *
 * @param {string} dir - Directory to check
 * @returns {Promise<boolean>} True if directory exists and has schemas
 */
export async function hasExistingSchemas(dir: string): Promise<boolean> {
    try {
        const stat = await fs.stat(dir);
        if (!stat.isDirectory()) {
            return false;
        }
        const entries = await fs.readdir(dir);
        if (entries.includes('index.ts') || entries.includes('index.d.ts')) {
            return true;
        }
        return entries.some((e) => e.endsWith('.webservice-client.ts') || e.endsWith('.webservice-client.d.ts'));
    } catch {
        return false;
    }
}

/**
 * Recursively copies schema files from src to dest as TypeScript declaration files (.d.ts).
 * In dist/ directory, only emits .d.ts files to keep package distributions pure.
 *
 * @param {string} src - Source folder
 * @param {string} dest - Destination folder
 * @returns {Promise<number>} Number of schema files copied
 */
async function copyDir(src: string, dest: string): Promise<number> {
    await fs.mkdir(dest, { recursive: true });
    let count = 0;
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            count += await copyDir(srcPath, destPath);
        } else if (entry.name.endsWith('.d.ts') || entry.name.endsWith('.ts')) {
            const content = await fs.readFile(srcPath, 'utf-8');
            const dtsPath = destPath.endsWith('.d.ts')
                ? destPath
                : destPath.replace(/\.ts$/, '.d.ts');
            await fs.writeFile(dtsPath, content, 'utf-8');
            count++;
        }
    }
    return count;
}

/**
 * Synchronizes schemas from source directory (e.g. outDir) into the installed
 * package's dist/schemas directory.
 * Wipes destination dist/schemas before copying to avoid stale schemas from previous runs.
 * Also ensures declaration files re-export from ./schemas/index.
 *
 * @param {string} sourceDir - Source directory containing generated schema files
 * @param {string} baseDir - Directory where config file is located
 * @returns {Promise<{ syncedCount: number; targets: string[] }>}
 */
export async function syncSchemas(
    sourceDir: string,
    baseDir: string
): Promise<{ syncedCount: number; targets: string[] }> {
    const pkgDirs = findAllPackageDirs(baseDir);
    const resolvedSource = path.resolve(sourceDir);
    const targets: string[] = [];
    let syncedCount = 0;

    if (pkgDirs.length > 0) {
        for (const pkgDir of pkgDirs) {
            const distSchemas = path.join(pkgDir, 'dist/schemas');
            if (path.resolve(distSchemas) !== resolvedSource) {
                targets.push(distSchemas);
                await fs.rm(distSchemas, { recursive: true, force: true });
                const count = await copyDir(resolvedSource, distSchemas);
                syncedCount = Math.max(syncedCount, count);
            }

            // Ensure declaration files in package export ./schemas/index
            const dtsFiles = [
                path.join(pkgDir, 'dist/index.d.ts'),
                path.join(pkgDir, 'dist/index.d.mts')
            ];
            for (const dtsFile of dtsFiles) {
                if (existsSync(dtsFile)) {
                    try {
                        const content = await fs.readFile(dtsFile, 'utf-8');
                        if (!content.includes('export * from "./schemas/index"')) {
                            await fs.appendFile(dtsFile, '\nexport * from "./schemas/index";\n', 'utf-8');
                        }
                    } catch {
                        // Ignore read/append error
                    }
                }
            }
        }
    } else {
        const fallbackTarget = path.resolve(baseDir, 'node_modules/@didactika/moodle-client/dist/schemas');
        if (path.resolve(fallbackTarget) !== resolvedSource) {
            targets.push(fallbackTarget);
            await fs.rm(fallbackTarget, { recursive: true, force: true });
            syncedCount = await copyDir(resolvedSource, fallbackTarget);
        }
    }

    return { syncedCount, targets };
}
