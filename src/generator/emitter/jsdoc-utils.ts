/**
 * Neutralizes comment terminators so arbitrary Moodle descriptions cannot close a JSDoc block early.
 *
 * @param {string} text - Raw description text.
 * @returns {string} Text safe to embed inside a block comment.
 */
export function escapeJsDocText(text: string): string {
    return text.replace(/\*\//g, '*\\/');
}

/**
 * Formats an object key as a TypeScript property name, quoting it when it is not a plain identifier
 * or a canonical non-negative integer.
 *
 * @param {string} name - Raw key name.
 * @returns {string} Safe property name.
 */
export function formatPropertyName(name: string): string {
    if (/^[A-Za-z_$][\w$]*$/.test(name) || /^(0|[1-9]\d*)$/.test(name)) {
        return name;
    }
    return JSON.stringify(name);
}
