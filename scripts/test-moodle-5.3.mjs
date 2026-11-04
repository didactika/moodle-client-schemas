import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function resolveMoodlePath(argPath) {
    if (argPath) {
        return path.resolve(process.cwd(), argPath);
    }
    const defaultSiblingPath = path.resolve(rootDir, '../moodle-5.3');
    if (existsSync(defaultSiblingPath)) {
        return defaultSiblingPath;
    }
    return defaultSiblingPath;
}

function resolveOutputPath(argPath) {
    if (argPath) {
        return path.resolve(process.cwd(), argPath);
    }
    return path.resolve(rootDir, 'moodle-5.3-schemas.json');
}

function ensureMoodleExists(moodlePath) {
    if (!existsSync(moodlePath)) {
        console.error(`Error: Moodle directory not found at: ${moodlePath}`);
        console.error('Please clone or specify the path to Moodle 5.3.');
        process.exit(1);
    }
}

async function loadExtractor() {
    const distModule = path.resolve(rootDir, 'dist/index.mjs');
    if (!existsSync(distModule)) {
        console.error('Error: dist/index.mjs not found. Please run "npm run build" first.');
        process.exit(1);
    }
    return import(distModule);
}

function formatSummary(result, durationMs, outputPath) {
    return [
        '----------------------------------------',
        'Moodle 5.3 Schema Extraction Result',
        '----------------------------------------',
        `Extracted Schemas : ${result.schemas.length}`,
        `Errors            : ${result.errors.length}`,
        `Duration          : ${(durationMs / 1000).toFixed(2)}s`,
        `Output JSON       : ${outputPath}`,
        '----------------------------------------'
    ].join('\n');
}

async function writeOutputJson(outputPath, data) {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(outputPath, jsonString, 'utf-8');
}

async function run() {
    const moodlePath = resolveMoodlePath(process.argv[2]);
    const outputPath = resolveOutputPath(process.argv[3]);

    ensureMoodleExists(moodlePath);

    console.log(`Target Moodle Path : ${moodlePath}`);
    console.log(`Target Output JSON : ${outputPath}`);
    console.log('Extracting webservices with extractWebservice()...');

    const { extractWebservice } = await loadExtractor();

    const startTime = Date.now();
    const result = await extractWebservice({
        moodlePath,
        progress: true
    });
    const durationMs = Date.now() - startTime;

    console.log('\nWriting schemas to JSON file...');
    await writeOutputJson(outputPath, result);

    console.log(formatSummary(result, durationMs, outputPath));

    if (result.errors.length > 0) {
        console.warn(`Extraction completed with ${result.errors.length} error(s).`);
    } else {
        console.log('Extraction completed successfully with 0 errors.');
    }
}

run().catch((error) => {
    console.error('Fatal error during schema extraction:', error);
    process.exit(1);
});
