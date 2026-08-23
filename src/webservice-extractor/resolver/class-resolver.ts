import { MoodleService } from '../interfaces/service-extractor.interfaces';

/**
 * Resolves the relative PHP file path containing the external class of a Web Service.
 *
 * @example
 * ```ts
 * const filePath = await resolveClass(service);
 * // returns 'enrol/manual/externallib.php' or null if unresolvable
 * ```
 *
 * @param {MoodleService} service - Web Service definition to resolve.
 * @returns {Promise<string | null>} Relative file path to the PHP class or null if not found.
 */
export async function resolveClass(
    service: MoodleService
): Promise<string | null> {

    void service;
    return null;
}
