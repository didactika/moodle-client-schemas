import { MoodleService } from '../interfaces/service-extractor.interfaces';
import { ResolvedClass } from '../interfaces/class-resolver.interfaces';

/**
 * Resolves the physical PHP file path containing the external class of a Web Service.
 * Strategies: 1) explicit classpath, 2) PSR-4 / Frankenstyle, 3) Legacy pattern.
 *
 * @param {MoodleService} _service - Service metadata to resolve.
 * @param {string} _moodlePath - Root path of Moodle repository.
 * @returns {Promise<ResolvedClass | null>} Resolved class metadata or null if not found.
 */
export async function resolveClass(
    _service: MoodleService,
    _moodlePath: string
): Promise<ResolvedClass | null> {
    void _service;
    void _moodlePath;
    return null;
}
