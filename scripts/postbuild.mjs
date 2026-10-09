import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function main() {
    // 1. Copy PHP adapter
    const sourcePhpAdapter = path.resolve(rootDir, 'src/php-adapter');
    const targetPhpAdapter = path.resolve(rootDir, 'dist/php-adapter');
    if (existsSync(sourcePhpAdapter)) {
        await fs.cp(sourcePhpAdapter, targetPhpAdapter, { recursive: true });
    }
}

main().catch((err) => {
    console.error('Postbuild error:', err);
    process.exit(1);
});

