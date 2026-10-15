import {
    Program,
    Node,
    Entry,
    Assign,
    Array as PhpArray,
    OffsetLookup,
    Variable,
    Call,
    Name,
    If,
    Block,
    ExpressionStatement
} from 'php-parser';
import { TrackedArrayState } from '../interfaces/ast/array-variable.interfaces';
import { isProgram, extractEntryKey } from './ast-utils';

type StatementHandler = (node: Node, state: TrackedArrayState) => void;
type AssignHandler = (assign: Assign, state: TrackedArrayState) => void;

const MERGE_FUNCTIONS = new Set(['array_merge', 'array_replace']);

/**
 * Checks whether a node is the tracked variable itself (e.g. `$functions`).
 *
 * @param {Node | null | undefined} node - Node to inspect.
 * @param {TrackedArrayState} state - Tracking state.
 * @returns {boolean} True if the node references the tracked variable.
 */
function isTrackedVariable(node: Node | null | undefined, state: TrackedArrayState): boolean {
    if (node?.kind !== 'variable') {
        return false;
    }
    return (node as Variable).name === state.variableName;
}

/**
 * Checks whether a node is an offset lookup on the tracked variable (`$functions[...]`).
 *
 * @param {Node | null | undefined} node - Node to inspect.
 * @param {TrackedArrayState} state - Tracking state.
 * @returns {boolean} True for `$functions[...]`.
 */
function isTrackedOffsetLookup(node: Node | null | undefined, state: TrackedArrayState): boolean {
    if (!node || node.kind !== 'offsetlookup') {
        return false;
    }
    return isTrackedVariable((node as OffsetLookup).what, state);
}

/**
 * Reads a literal string offset, or null for dynamic offsets (`$functions[$name]`).
 *
 * @param {OffsetLookup} lookup - Offset lookup node.
 * @returns {string | null} Literal key or null.
 */
function literalOffsetKey(lookup: OffsetLookup): string | null {
    const offset = lookup.offset;
    if (!offset || offset.kind !== 'string') {
        return null;
    }
    return (offset as unknown as { value: string }).value;
}

/**
 * Resolves the string key of `$functions['key']`, or null when the node is not such a lookup.
 *
 * @param {Node | null | undefined} node - Node to inspect.
 * @param {TrackedArrayState} state - Tracking state.
 * @returns {string | null} Literal offset key or null.
 */
function resolveTrackedOffset(node: Node | null | undefined, state: TrackedArrayState): string | null {
    if (!isTrackedOffsetLookup(node, state)) {
        return null;
    }
    return literalOffsetKey(node as OffsetLookup);
}

/**
 * Reads the literal key of an array item, or null for keyless items and spreads.
 *
 * @param {Entry | null} item - Array item.
 * @returns {string | null} Literal key or null.
 */
function literalEntryKey(item: Entry | null): string | null {
    if (!item || item.kind !== 'entry') {
        return null;
    }
    return extractEntryKey(item);
}

/**
 * Lists the string-keyed entries of an array literal; entries without a literal key are skipped.
 *
 * @param {PhpArray} array - Array literal node.
 * @returns {Array<[string, Entry]>} Key/entry pairs in source order.
 */
function keyedEntries(array: PhpArray): Array<[string, Entry]> {
    const pairs: Array<[string, Entry]> = [];
    for (const item of array.items as Entry[]) {
        const key = literalEntryKey(item);
        if (key !== null) {
            pairs.push([key, item]);
        }
    }
    return pairs;
}

/**
 * Writes array literal entries into a target map; later keys override earlier ones like PHP.
 *
 * @param {Map<string, Entry>} target - Map receiving the entries.
 * @param {PhpArray} array - Array literal node.
 */
function writeEntries(target: Map<string, Entry>, array: PhpArray): void {
    for (const [key, entry] of keyedEntries(array)) {
        target.set(key, entry);
    }
}

/**
 * Applies one argument of array_merge()/array_replace() to the merged result.
 * The tracked variable contributes its current entries; array literals add or override keys.
 *
 * @param {Node} argument - Call argument.
 * @param {Map<string, Entry>} merged - Merge result being built.
 * @param {TrackedArrayState} state - Tracking state.
 */
function applyMergeArgument(argument: Node, merged: Map<string, Entry>, state: TrackedArrayState): void {
    if (isTrackedVariable(argument, state)) {
        state.entries.forEach((entry, key) => merged.set(key, entry));
    } else if (argument.kind === 'array') {
        writeEntries(merged, argument as PhpArray);
    }
}

/**
 * Checks whether a node is a call to array_merge() or array_replace().
 *
 * @param {Node} node - Node to inspect.
 * @returns {boolean} True for supported merge calls.
 */
function isMergeCall(node: Node): boolean {
    if (node.kind !== 'call') {
        return false;
    }
    return MERGE_FUNCTIONS.has(((node as Call).what as Name)?.name);
}

/**
 * Evaluates the right-hand side of `$functions = ...` into the new set of entries.
 * Values that cannot be resolved statically (e.g. function calls) yield an empty set, like a fresh assignment.
 *
 * @param {Node} value - Assigned expression.
 * @param {TrackedArrayState} state - Tracking state.
 * @returns {Map<string, Entry>} Resulting entries.
 */
function evaluateAssignedValue(value: Node, state: TrackedArrayState): Map<string, Entry> {
    const result = new Map<string, Entry>();
    if (value.kind === 'array') {
        writeEntries(result, value as PhpArray);
    } else if (isMergeCall(value)) {
        (value as Call).arguments.forEach((argument) => applyMergeArgument(argument, result, state));
    }
    return result;
}

/**
 * Handles `$functions = ...`.
 *
 * @param {Assign} assign - Assignment node.
 * @param {TrackedArrayState} state - Tracking state.
 */
function assignWhole(assign: Assign, state: TrackedArrayState): void {
    state.entries = evaluateAssignedValue(assign.right, state);
}

/**
 * Handles `$functions += [...]`: only keys not yet defined are added, like PHP's array union.
 *
 * @param {Assign} assign - Assignment node.
 * @param {TrackedArrayState} state - Tracking state.
 */
function unionWhole(assign: Assign, state: TrackedArrayState): void {
    for (const [key, entry] of evaluateAssignedValue(assign.right, state)) {
        if (!state.entries.has(key)) {
            state.entries.set(key, entry);
        }
    }
}

/**
 * Reads the assignment operator; hand-built ASTs without one are treated as a plain `=`.
 *
 * @param {Assign} assign - Assignment node.
 * @returns {string} Operator such as '=' or '+='.
 */
function assignOperator(assign: Assign): string {
    return assign.operator ?? '=';
}

const WHOLE_ASSIGN_HANDLERS: Record<string, AssignHandler> = {
    '=': assignWhole,
    '+=': unionWhole
};

/**
 * Handles `$functions['name'] = [...]` by synthesizing the equivalent array entry.
 *
 * @param {Assign} assign - Assignment node.
 * @param {string} key - Literal offset key.
 * @param {TrackedArrayState} state - Tracking state.
 */
function assignOffset(assign: Assign, key: string, state: TrackedArrayState): void {
    if (assignOperator(assign) !== '=') {
        return;
    }
    const left = assign.left as OffsetLookup;
    const entry = { kind: 'entry', key: left.offset, value: assign.right, byRef: false, unpack: false } as unknown as Entry;
    state.entries.set(key, entry);
}

/**
 * Applies `=` or `+=` on the tracked variable itself; other operators and variables are ignored.
 *
 * @param {Assign} assign - Assignment node.
 * @param {TrackedArrayState} state - Tracking state.
 */
function handleWholeAssign(assign: Assign, state: TrackedArrayState): void {
    if (!isTrackedVariable(assign.left, state)) {
        return;
    }
    WHOLE_ASSIGN_HANDLERS[assignOperator(assign)]?.(assign, state);
}

/**
 * Applies an assignment to the tracked variable or one of its offsets; other assignments are ignored.
 *
 * @param {Assign} assign - Assignment node.
 * @param {TrackedArrayState} state - Tracking state.
 */
function handleAssign(assign: Assign, state: TrackedArrayState): void {
    const offsetKey = resolveTrackedOffset(assign.left, state);
    if (offsetKey !== null) {
        assignOffset(assign, offsetKey, state);
        return;
    }
    handleWholeAssign(assign, state);
}

/**
 * Handles an expression statement, which is where Moodle declares services.
 *
 * @param {Node} node - Expression statement node.
 * @param {TrackedArrayState} state - Tracking state.
 */
function handleExpressionStatement(node: Node, state: TrackedArrayState): void {
    const expression = (node as ExpressionStatement).expression;
    if (expression?.kind === 'assign') {
        handleAssign(expression as Assign, state);
    }
}

/**
 * Handles `unset($functions['name'])`.
 *
 * @param {Node} node - Unset node.
 * @param {TrackedArrayState} state - Tracking state.
 */
function handleUnset(node: Node, state: TrackedArrayState): void {
    for (const variable of (node as unknown as { variables: Node[] }).variables) {
        const key = resolveTrackedOffset(variable, state);
        if (key !== null) {
            state.entries.delete(key);
        }
    }
}

/**
 * Handles a block by replaying its statements.
 *
 * @param {Node} node - Block node.
 * @param {TrackedArrayState} state - Tracking state.
 */
function handleBlock(node: Node, state: TrackedArrayState): void {
    replayStatements((node as Block).children, state);
}

/**
 * Handles conditional declarations. Conditions cannot be evaluated statically, so every branch is
 * replayed in order and services declared in any branch are kept.
 *
 * @param {Node} node - If node.
 * @param {TrackedArrayState} state - Tracking state.
 */
function handleIf(node: Node, state: TrackedArrayState): void {
    const conditional = node as If;
    replayStatement(conditional.body, state);
    replayStatement(conditional.alternate, state);
}

const STATEMENT_HANDLERS: Record<string, StatementHandler> = {
    expressionstatement: handleExpressionStatement,
    unset: handleUnset,
    block: handleBlock,
    if: handleIf
};

/**
 * Replays a single statement against the tracked state.
 *
 * @param {Node | null | undefined} node - Statement node.
 * @param {TrackedArrayState} state - Tracking state.
 */
function replayStatement(node: Node | null | undefined, state: TrackedArrayState): void {
    if (node) {
        STATEMENT_HANDLERS[node.kind]?.(node, state);
    }
}

/**
 * Replays statements in source order against the tracked state.
 *
 * @param {Node[]} statements - Statement nodes.
 * @param {TrackedArrayState} state - Tracking state.
 */
function replayStatements(statements: Node[], state: TrackedArrayState): void {
    for (const statement of statements) {
        replayStatement(statement, state);
    }
}

/**
 * Statically computes the final string-keyed entries of a PHP array variable after a file runs,
 * following every way Moodle plugins build `$functions`:
 *
 * @example
 * ```php
 * $functions = ['a' => [...]];                        // assignment
 * $functions['b'] = [...];                             // element assignment
 * $functions += ['c' => [...]];                        // union (existing keys win)
 * $functions = array_merge($functions, ['d' => [...]]); // merge (later keys win)
 * if ($CFG->branch >= 400) { $functions['e'] = [...]; } // every branch is included
 * unset($functions['a']);                              // removal
 * ```
 * ```ts
 * collectArrayVariableEntries(ast, 'functions').map(extractEntryKey); // ['b', 'c', 'd', 'e']
 * ```
 *
 * @param {Program | Node} program - Root Program AST node.
 * @param {string} variableName - Variable name without '$' (e.g. 'functions').
 * @returns {Entry[]} Final entries in PHP insertion order.
 */
export function collectArrayVariableEntries(program: Program | Node, variableName: string): Entry[] {
    if (!isProgram(program)) {
        return [];
    }
    const state: TrackedArrayState = { variableName, entries: new Map() };
    replayStatements(program.children, state);
    return [...state.entries.values()];
}
