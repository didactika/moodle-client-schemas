/**
 * Walking a schema tree.
 *
 * Every node is a value (`type`), an object (`keys`) or an array (`content`).
 * Narrowing on those fields works whether or not `kind` is present.
 */
import {
    extractWebservice,
    type WebServiceArraySchema,
    type WebServiceObjectSchema,
    type WebServiceReturnSchema,
    type WebServiceValueSchema,
} from "@didactika/moodle-client-schemas";

const moodlePath = process.env.MOODLE_PATH ?? "./moodle";

const isObject = (node: WebServiceReturnSchema): node is WebServiceObjectSchema => "keys" in node;
const isArray = (node: WebServiceReturnSchema): node is WebServiceArraySchema => "content" in node;

const REQUIRED_LABEL: Record<number, string> = { 1: "required", 2: "optional", 0: "has default" };

/** Prints one line per field, with its path, type and whether it must be sent. */
function walk(node: WebServiceReturnSchema, path: string): void {
    if (isObject(node)) {
        for (const [key, child] of Object.entries(node.keys)) {
            walk(child, path ? `${path}.${key}` : key);
        }
        return;
    }
    if (isArray(node)) {
        walk(node.content, `${path}[]`);
        return;
    }
    const value: WebServiceValueSchema = node;
    const label = REQUIRED_LABEL[value.required ?? 1];
    const extra = value.required === 0 ? ` = ${JSON.stringify(value.default)}` : "";
    console.log(`  ${path}: ${value.primitiveType} (PARAM_${value.type.toUpperCase()}, ${label}${extra})`);
}

async function main() {
    const { schemas } = await extractWebservice({ moodlePath, services: ["core_user_get_users_by_field"] });
    const [schema] = schemas;
    if (!schema) {
        console.error("service not found");
        process.exit(1);
    }

    console.log(`${schema.name}: ${schema.description ?? ""}`);
    console.log("parameters");
    if (schema.parameters) walk(schema.parameters, "");
    console.log("returns");
    if (schema.returns) walk(schema.returns, "");
}

main();
