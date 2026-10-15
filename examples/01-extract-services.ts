/**
 * Extracting every web service of a Moodle codebase.
 *
 * Only the Moodle source code is needed: no database, web server or installed
 * site. The PHP CLI (>= 8.0) must be on the PATH.
 */
import { extractWebservice } from "@didactika/moodle-client-schemas";

const moodlePath = process.env.MOODLE_PATH ?? "./moodle";

async function main() {
    // No `services` filter: every service declared in any db/services.php.
    const { schemas, errors } = await extractWebservice({ moodlePath, progress: true });

    console.log(`${schemas.length} services extracted, ${errors.length} errors`);

    for (const schema of schemas.slice(0, 10)) {
        const params = Object.keys(schema.parameters?.keys ?? {});
        console.log(`- ${schema.name}(${params.join(", ")})`);
    }

    // The call does not throw for a bad path or a missing PHP: those come back as
    // errors too. See 04-handling-errors.ts for telling them apart.
    for (const error of errors.slice(0, 10)) {
        console.warn(`[${error.code}] ${error.serviceName ?? moodlePath}: ${error.message}`);
    }
}

main();
