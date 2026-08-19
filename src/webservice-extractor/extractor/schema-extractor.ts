import { MoodleService } from '../interfaces/service-extractor.interfaces';
import { WebServiceSchema } from '../interfaces/schema-extractor.interfaces';

/**
 * Extracts and maps parameter and return definitions from external class AST into WebServiceSchema.
 *
 * @param {unknown} _classAst - AST of the external PHP class.
 * @param {MoodleService} _service - Associated service metadata.
 * @returns {WebServiceSchema | null} Extracted Web Service schema.
 */
export function extractSchema(
    _classAst: unknown,
    _service: MoodleService
): WebServiceSchema | null {
    void _classAst;
    void _service;
    return null;
}
