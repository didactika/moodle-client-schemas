/**
 * Step 1: generate the types into ./moodle-types and attach them to ./my-client.
 *
 *   MOODLE_PATH=~/src/moodle npx tsx examples/09-custom-client/generate.ts
 */
import { join } from "node:path";
import { extractWebservice, generateWebserviceFiles } from "@didactika/moodle-client-schemas";

const moodlePath = process.env.MOODLE_PATH ?? "./moodle";
const outDir = join(__dirname, "moodle-types");

async function main() {
    const { schemas, errors } = await extractWebservice({
        moodlePath,
        services: ["core_webservice_get_site_info", "core_course_get_courses"],
    });
    if (errors.length > 0) {
        console.error(errors);
        process.exit(1);
    }

    await generateWebserviceFiles(schemas, outDir, {
        // Written verbatim into moodle-types/index.d.ts, so a relative path is
        // resolved from *that* file: '../my-client' is ./my-client.ts.
        // A package name ('@acme/moodle') works the same way.
        importSource: "../my-client",
        // Off by default. Turn it on only because my-client.ts answers every
        // service name with a function at runtime (see its Proxy).
        augmentClient: true,
    });

    console.log(`${schemas.length} services generated in ${outDir}`);
}

main();
