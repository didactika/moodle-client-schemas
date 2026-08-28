import { getAst } from '../cache/ast-manager';
import { isProgram } from '../parser/ast-utils';
import { ExpressionStatement, Assign, Variable, String as PhpString, Node } from 'php-parser';

/**
 * Checks whether an AST node is a variable node.
 *
 * @param {Node | undefined} node - Node to check.
 * @returns {boolean} True if node is a variable.
 */
function isVariableNode(node: Node | undefined): boolean {
    return Boolean(node && node.kind === 'variable');
}

/**
 * Checks whether an AST node is a variable matching the specified name.
 *
 * @param {Node | undefined} node - Variable node to check.
 * @param {string} targetVar - Target variable name.
 * @returns {boolean} True if matching variable.
 */
function isMatchingVariable(node: Node | undefined, targetVar: string): boolean {
    return isVariableNode(node) && (node as Variable).name === targetVar;
}

/**
 * Extracts the string value from a PHP string node.
 *
 * @param {Node | undefined} node - AST node.
 * @returns {string | null} String value or null.
 */
function getStringValue(node: Node | undefined): string | null {
    if (node?.kind === 'string') {
        return (node as PhpString).value;
    }
    return null;
}

/**
 * Extracts string value from an assignment expression if the variable matches.
 *
 * @param {Assign} expr - Assignment expression node.
 * @param {string} targetVar - Target variable name.
 * @returns {string | null} Assigned string value or null.
 */
function extractFromAssign(expr: Assign, targetVar: string): string | null {
    if (!isMatchingVariable(expr.left, targetVar)) {
        return null;
    }
    return getStringValue(expr.right);
}

/**
 * Obtains the Assign expression from an ExpressionStatement.
 *
 * @param {ExpressionStatement} stmt - Statement node.
 * @returns {Assign | null} Assign node or null.
 */
function getAssignExpression(stmt: ExpressionStatement): Assign | null {
    const expr = stmt.expression as Assign;
    return expr?.kind === 'assign' ? expr : null;
}

/**
 * Extracts string value from a candidate statement if it matches variable assignment.
 *
 * @param {Node} child - AST statement node.
 * @param {string} targetVar - Variable identifier.
 * @returns {string | null} Assigned string value or null.
 */
function extractFromStatement(child: Node, targetVar: string): string | null {
    if (child.kind !== 'expressionstatement') {
        return null;
    }
    const assign = getAssignExpression(child as ExpressionStatement);
    return assign ? extractFromAssign(assign, targetVar) : null;
}

/**
 * Iterates through AST children to locate the release variable assignment.
 *
 * @param {Node[]} children - Array of program children nodes.
 * @returns {string | null} Found release string or null.
 */
function searchChildrenForRelease(children: Node[]): string | null {
    for (const child of children) {
        const found = extractFromStatement(child, 'release');
        if (found) {
            return found;
        }
    }
    return null;
}

/**
 * Searches the program AST children for the $release variable assignment.
 *
 * @param {unknown} ast - Parsed AST of version.php.
 * @returns {string | null} Raw release string or null if not found.
 */
function extractReleaseString(ast: unknown): string | null {
    if (!isProgram(ast)) {
        return null;
    }
    return searchChildrenForRelease(ast.children);
}

/**
 * Sanitizes and extracts the semantic version numbers from a raw Moodle release string.
 *
 * @example
 * ```ts
 * cleanReleaseVersion('2.0.10 (Build: 20120706)'); // returns '2.0.10'
 * cleanReleaseVersion('3.11.2+ (Build: 20210618)'); // returns '3.11.2'
 * ```
 *
 * @param {string} rawRelease - Raw release string from version.php.
 * @returns {string | null} Clean semantic version or null if invalid.
 */
function cleanReleaseVersion(rawRelease: string): string | null {
    const match = rawRelease.trim().match(/^(\d+\.\d+(?:\.\d+)?)/);
    return match ? match[1] : null;
}

/**
 * Resolves and returns the semantic Moodle version from a repository root path.
 *
 * Reads and parses `version.php` quickly into an AST and extracts the `$release` variable.
 *
 * @example
 * ```ts
 * const version = await resolveVersion('/path/to/moodle');
 * // returns '4.5.0'
 * ```
 *
 * @param {string} moodlePath - Root path of the Moodle repository.
 * @returns {Promise<string>} Clean semantic version string (e.g. '2.0.10', '3.11.2', '5.2.2').
 * @throws {Error} When version.php is unreadable or does not contain a valid release variable.
 */
export async function resolveVersion(moodlePath: string): Promise<string> {
    const ast = await getAst('version.php', moodlePath).catch(() => {
        throw new Error(`Unable to resolve Moodle version: version.php not found in ${moodlePath}`);
    });

    const rawRelease = extractReleaseString(ast);
    if (!rawRelease) {
        throw new Error('Unable to resolve Moodle version from version.php: release variable is missing');
    }

    const cleanVersion = cleanReleaseVersion(rawRelease);
    if (!cleanVersion) {
        throw new Error(`Unable to resolve Moodle version from version.php: invalid release format "${rawRelease}"`);
    }

    return cleanVersion;
}
