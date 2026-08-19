import { WebServiceSchema } from '../interfaces/schema-extractor.interfaces';

/**
 * Serializes and persists the Web Service schemas into destination JSON file.
 *
 * @param {WebServiceSchema[]} _schemas - Array of extracted schemas.
 * @param {string} _outputPath - Destination JSON file path.
 * @returns {Promise<void>}
 */
export async function saveJson(
    _schemas: WebServiceSchema[],
    _outputPath: string
): Promise<void> {
    void _schemas;
    void _outputPath;
}
