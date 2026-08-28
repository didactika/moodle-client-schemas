import fs from 'fs/promises';
import path from 'path';
import { WebServiceSchema } from '../interfaces/schema-extractor.interfaces';

/**
 * Serializes and persists the Web Service schemas into destination JSON file.
 *
 * @example
 * ```ts
 * await saveJson(schemas, './schemas/v/4.5.json');
 * ```
 *
 * @param {WebServiceSchema[]} schemas - Array of extracted schemas.
 * @param {string} outputPath - Destination JSON file path.
 * @returns {Promise<void>}
 */
export async function saveJson(
    schemas: WebServiceSchema[],
    outputPath: string
): Promise<void> {
    const parentDir = path.dirname(outputPath);
    await fs.mkdir(parentDir, { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(schemas, null, 2), 'utf-8');
}
