import { MoodleService } from '../interfaces/service-extractor.interfaces';

/**
 * Extracts Web Service definitions declared in the $functions array of a services.php AST.
 *
 * @param {unknown} _ast - Abstract Syntax Tree of services.php.
 * @returns {MoodleService[]} Array of extracted service definitions.
 */
export function extractServices(_ast: unknown): MoodleService[] {
    void _ast;
    return [];
}
