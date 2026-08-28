import fs from 'fs/promises';
import path from 'path';
import { MoodleComponentsJson } from '../../interfaces/component-resolver.interfaces';

/**
 * Registers all plugin types into the target plugintypes map.
 *
 * @example
 * ```ts
 * const map = new Map<string, string>();
 * registerPlugintypes(map, { mod: 'mod', customfield: 'customfield/field' });
 * ```
 *
 * @param {Map<string, string>} map - Target plugintypes map.
 * @param {Record<string, string>} [plugintypes] - Key-value pair of plugintypes.
 */
function registerPlugintypes(
    map: Map<string, string>,
    plugintypes?: Record<string, string>
): void {
    if (!plugintypes) {
        return;
    }
    for (const [type, dir] of Object.entries(plugintypes)) {
        map.set(type, dir);
    }
}

/**
 * Safely parses raw JSON content from lib/components.json.
 *
 * @example
 * ```ts
 * parseComponentsJson('{"plugintypes": {}}', '/path/to/file');
 * ```
 *
 * @param {string} raw - File content string.
 * @param {string} filePath - Absolute file path for error context.
 * @returns {MoodleComponentsJson} Parsed JSON structure.
 */
function parseComponentsJson(raw: string, filePath: string): MoodleComponentsJson {
    try {
        return JSON.parse(raw) as MoodleComponentsJson;
    } catch {
        throw new Error(`Invalid JSON in ${filePath}`);
    }
}

/**
 * Resolves plugintypes map from modern Moodle lib/components.json (Moodle >= 3.8).
 *
 * @example
 * ```ts
 * const map = await resolveJsonComponents('/var/www/moodle');
 * map.get('mod');         // 'mod'
 * map.get('customfield'); // 'customfield/field'
 * ```
 *
 * @param {string} moodlePath - Root path of Moodle repository.
 * @returns {Promise<Map<string, string>>} Plugin types to directory mapping.
 */
export async function resolveJsonComponents(moodlePath: string): Promise<Map<string, string>> {
    const filePath = path.join(moodlePath, 'lib/components.json');
    const rawContent = await fs.readFile(filePath, 'utf-8').catch(() => {
        throw new Error(`Unable to load components from ${filePath}`);
    });

    const parsed = parseComponentsJson(rawContent, filePath);
    const plugintypes = new Map<string, string>();

    registerPlugintypes(plugintypes, parsed.plugintypes);

    return plugintypes;
}
