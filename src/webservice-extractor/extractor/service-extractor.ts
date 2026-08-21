import { Entry, Array as PhpArray, Node } from 'php-parser';
import { MoodleService } from '../interfaces/service-extractor.interfaces';
import {
    findVariableAssignment,
    extractArrayEntriesMap,
    extractEntryKey,
    extractFieldValue,
    extractStringLiteral
} from '../parser/ast-utils';

/**
 * Assigns optional classpath property to the service if present in the definition map.
 *
 * @param {MoodleService} service - Web service instance being constructed.
 * @param {Map<string, Node>} fields - Associative properties map.
 */
function assignClasspath(service: MoodleService, fields: Map<string, Node>): void {
    if (fields.has('classpath')) {
        service.classpath = extractFieldValue(fields.get('classpath'));
    }
}

/**
 * Assigns optional description property to the service if present in the definition map.
 *
 * @param {MoodleService} service - Web service instance being constructed.
 * @param {Map<string, Node>} fields - Associative properties map.
 */
function assignDescription(service: MoodleService, fields: Map<string, Node>): void {
    if (fields.has('description')) {
        service.description = extractFieldValue(fields.get('description'));
    }
}

/**
 * Assigns optional type property to the service if present in the definition map.
 *
 * @param {MoodleService} service - Web service instance being constructed.
 * @param {Map<string, Node>} fields - Associative properties map.
 */
function assignType(service: MoodleService, fields: Map<string, Node>): void {
    if (fields.has('type')) {
        service.type = extractFieldValue(fields.get('type'));
    }
}

/**
 * Checks if the value of an Entry node is a valid array.
 *
 * @param {Entry} entry - Associative Entry to check.
 * @returns {boolean} True if the value is a valid array node.
 */
function isValidEntryValue(entry: Entry): boolean {
    if (!entry.value) {
        return false;
    }
    return entry.value.kind === 'array';
}

/**
 * Checks if the Entry name and value are valid for a service definition.
 *
 * @param {string | null} name - Extracted entry key name.
 * @param {Entry} entry - Associative Entry to check.
 * @returns {boolean} True if the entry has a valid name and array value.
 */
function isValidServiceEntry(name: string | null, entry: Entry): boolean {
    if (!name) {
        return false;
    }
    return isValidEntryValue(entry);
}

/**
 * Resolves the method name from the fields map or defaults to 'execute'.
 *
 * @param {Map<string, Node>} fields - Associative properties map.
 * @returns {string} The method name.
 */
function getMethodName(fields: Map<string, Node>): string {
    const name = extractStringLiteral(fields.get('methodname'));
    if (name) {
        return name;
    }
    return 'execute';
}

/**
 * Parses a single associative array Entry node representing a Moodle Web Service definition.
 *
 * @param {Entry} entry - Associative Entry representing a service in $functions.
 * @returns {MoodleService | null} Parsed MoodleService object or null if invalid/incomplete.
 */
function parseServiceEntry(entry: Entry): MoodleService | null {
    const name = extractEntryKey(entry);
    if (!isValidServiceEntry(name, entry)) {
        return null;
    }

    const fields = extractArrayEntriesMap(entry.value as PhpArray);
    const classname = extractStringLiteral(fields.get('classname'));
    if (!classname) {
        return null;
    }

    const methodname = getMethodName(fields);
    const service: MoodleService = { name: name as string, classname, methodname };

    assignClasspath(service, fields);
    assignDescription(service, fields);
    assignType(service, fields);

    return service;
}

/**
 * Checks if an unknown item is a valid AST entry node.
 *
 * @param {unknown} item - Item to inspect.
 * @returns {boolean} True if the item is an Entry node.
 */
function isEntryNode(item: unknown): boolean {
    if (!item) {
        return false;
    }
    return (item as Node).kind === 'entry';
}

/**
 * Processes an AST item and adds it to the services list if valid.
 *
 * @param {unknown} item - AST node to process.
 * @param {MoodleService[]} services - Array to push valid services to.
 */
function processAndPushService(item: unknown, services: MoodleService[]): void {
    if (!isEntryNode(item)) {
        return;
    }
    const parsed = parseServiceEntry(item as Entry);
    if (parsed) {
        services.push(parsed);
    }
}

/**
 * Iterates through AST array items and collects all valid MoodleService objects.
 *
 * @param {unknown[]} items - List of AST nodes from the $functions array.
 * @returns {MoodleService[]} List of successfully extracted Moodle Web Services.
 */
function collectServices(items: unknown[]): MoodleService[] {
    const services: MoodleService[] = [];
    for (const item of items) {
        processAndPushService(item, services);
    }
    return services;
}

/**
 * Validates if the provided AST represents an object structure.
 *
 * @param {unknown} ast - AST to validate.
 * @returns {boolean} True if AST is a valid object.
 */
function isObjectAST(ast: unknown): boolean {
    if (!ast) {
        return false;
    }
    return typeof ast === 'object';
}

/**
 * Checks if the extracted functions array has valid iterable items.
 *
 * @param {PhpArray | null} array - PHP Array node to check.
 * @returns {array is PhpArray} True if the array contains items and is not null.
 */
function isValidFunctionsArray(array: PhpArray | null): array is PhpArray {
    if (!array) {
        return false;
    }
    return Array.isArray(array.items);
}

/**
 * Extracts Web Service definitions declared in the $functions array of a services.php AST.
 *
 * @param {unknown} ast - Abstract Syntax Tree of a services.php file.
 * @returns {MoodleService[]} Array of extracted service definitions.
 */
export function extractServices(ast: unknown): MoodleService[] {
    if (!isObjectAST(ast)) {
        return [];
    }

    const functionsArray = findVariableAssignment(ast as Node, 'functions');
    if (!isValidFunctionsArray(functionsArray)) {
        return [];
    }

    return collectServices(functionsArray.items);
}