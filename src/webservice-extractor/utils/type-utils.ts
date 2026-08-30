/**
 * Primitive scalar data type classification corresponding to JavaScript/JSON primitives.
 */
export type PrimitiveType = 'string' | 'number' | 'boolean';

/**
 * Known numeric Moodle parameter type identifiers.
 */
const NUMERIC_TYPES = new Set([
    'int',
    'integer',
    'float',
    'number',
    'param_int',
    'param_integer',
    'param_float',
    'param_number'
]);

/**
 * Known boolean Moodle parameter type identifiers.
 */
const BOOLEAN_TYPES = new Set([
    'bool',
    'boolean',
    'param_bool',
    'param_boolean'
]);

/**
 * Dynamically resolves any Moodle parameter type (PARAM_* or raw string) to its primitive type.
 *
 * Moodle evaluates parameters internally via `clean_param($param, $type)`:
 * - PARAM_INT / PARAM_FLOAT -> cast to integer or float (`number`)
 * - PARAM_BOOL -> cast to boolean (`boolean`)
 * - All other PARAM_* types (text, notags, raw, plugin, etc.) -> processed as strings (`string`)
 *
 * @example
 * ```ts
 * resolvePrimitiveType('int');       // returns 'number'
 * resolvePrimitiveType('notags');    // returns 'string'
 * resolvePrimitiveType('bool');      // returns 'boolean'
 * resolvePrimitiveType('PARAM_INT'); // returns 'number'
 * ```
 *
 * @param {string | unknown} moodleType - Moodle parameter type identifier.
 * @returns {PrimitiveType} Primitive type ('string' | 'number' | 'boolean').
 */
export function resolvePrimitiveType(moodleType?: unknown): PrimitiveType {
    if (typeof moodleType !== 'string') {
        return 'string';
    }

    const normalized = moodleType.trim().toLowerCase();
    if (NUMERIC_TYPES.has(normalized)) {
        return 'number';
    }
    if (BOOLEAN_TYPES.has(normalized)) {
        return 'boolean';
    }

    return 'string';
}
