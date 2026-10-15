/**
 * Building your own output with the emitters.
 *
 * generateWebserviceFiles covers the common case. The functions it is built
 * from are exported too, so you can produce a different layout: here, one
 * folder per Moodle component, each with its own barrel.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import {
    emitBarrelCode,
    emitWebserviceCode,
    extractWebservice,
    hasRequiredParameters,
    resolveWebserviceFilePath,
    type GeneratedServiceMetadata,
    type WebServiceSchema,
} from "@didactika/moodle-client-schemas";

const moodlePath = process.env.MOODLE_PATH ?? "./moodle";
const outDir = process.env.OUT_DIR ?? "./generated";

/** 'mod_assign_get_assignments' -> 'mod_assign' */
function componentOf(name: string): string {
    return name.split("_").slice(0, 2).join("_");
}

async function writeComponent(component: string, schemas: WebServiceSchema[]): Promise<void> {
    const root = join(outDir, component);
    const metadata: GeneratedServiceMetadata[] = [];

    for (const schema of schemas) {
        // 'mod/assign/get_assignments.webservice.d.ts' -> 'get_assignments.webservice.d.ts'
        const file = resolveWebserviceFilePath(schema.name).split("/").pop()!;
        await mkdir(dirname(join(root, file)), { recursive: true });
        await writeFile(join(root, file), emitWebserviceCode(schema));

        metadata.push({
            name: schema.name,
            relativeImportPath: `./${file.replace(/\.d\.ts$/, "")}`,
            hasRequiredParams: hasRequiredParameters(schema),
            description: schema.description,
        });
    }

    // Same options as generateWebserviceFiles: types only, no client augmentation.
    await writeFile(join(root, "index.d.ts"), emitBarrelCode(metadata));
}

async function main() {
    const { schemas } = await extractWebservice({ moodlePath, services: ["mod_assign_*", "mod_forum_*"] });

    const byComponent = new Map<string, WebServiceSchema[]>();
    for (const schema of schemas) {
        const component = componentOf(schema.name);
        byComponent.set(component, [...(byComponent.get(component) ?? []), schema]);
    }

    for (const [component, group] of byComponent) {
        await writeComponent(component, group);
        console.log(`${component}: ${group.length} services`);
    }
}

main();
