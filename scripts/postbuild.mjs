import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function copyDirWithDtsOnly(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDirWithDtsOnly(srcPath, destPath);
        } else if (entry.name.endsWith('.d.ts')) {
            const content = await fs.readFile(srcPath, 'utf-8');
            await fs.writeFile(destPath, content, 'utf-8');
        } else if (entry.name.endsWith('.ts')) {
            const dtsDest = destPath.replace(/\.ts$/, '.d.ts');
            if (!existsSync(dtsDest)) {
                const content = await fs.readFile(srcPath, 'utf-8');
                await fs.writeFile(dtsDest, content, 'utf-8');
            }
        }
    }
}

async function main() {
    // 1. Copy PHP adapter
    const sourcePhpAdapter = path.resolve(rootDir, 'src/php-adapter');
    const targetPhpAdapter = path.resolve(rootDir, 'dist/php-adapter');
    if (existsSync(sourcePhpAdapter)) {
        await fs.cp(sourcePhpAdapter, targetPhpAdapter, { recursive: true });
    }

    // 2. Copy schemas to dist/schemas (.d.ts only)
    const sourceSchemas = path.resolve(rootDir, 'src/schemas');
    const targetSchemas = path.resolve(rootDir, 'dist/schemas');
    if (existsSync(sourceSchemas)) {
        await copyDirWithDtsOnly(sourceSchemas, targetSchemas);
    }

    // 3. Ensure dist/index.d.ts and dist/index.d.mts re-export ./schemas/index
    const dtsFiles = [
        path.resolve(rootDir, 'dist/index.d.ts'),
        path.resolve(rootDir, 'dist/index.d.mts')
    ];

    for (const dtsFile of dtsFiles) {
        if (existsSync(dtsFile)) {
            const content = await fs.readFile(dtsFile, 'utf-8');
            if (!content.includes('export * from "./schemas/index"')) {
                await fs.appendFile(dtsFile, '\nexport * from "./schemas/index";\n', 'utf-8');
            }
        }
    }
}

main().catch((err) => {
    console.error('Postbuild error:', err);
    process.exit(1);
});
