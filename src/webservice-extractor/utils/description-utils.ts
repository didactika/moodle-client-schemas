const EXTRA_WHITESPACE_REGEX = /\s+/g;

/**
 * Sanitizes and normalizes human-readable description strings:
 * - Replaces newlines (\r\n, \n, \r) and tabs (\t) with single spaces.
 * - Collapses consecutive whitespace into a single space.
 * - Trims leading and trailing whitespace.
 * - Returns undefined if the string is empty or whitespace-only.
 *
 * @example
 * ```ts
 * sanitizeDescription('List of items.\n    Indented text.');
 * // returns 'List of items. Indented text.'
 *
 * sanitizeDescription('   \n\t  ');
 * // returns undefined
 * ```
 *
 * @param {unknown} desc - Raw description value.
 * @returns {string | undefined} Sanitized description string or undefined if empty.
 */
export function sanitizeDescription(desc?: unknown): string | undefined {
    if (typeof desc !== 'string') {
        return undefined;
    }

    const trimmed = desc.trim();
    if (trimmed.length === 0) {
        return undefined;
    }

    return trimmed.replace(EXTRA_WHITESPACE_REGEX, ' ');
}
