/**
 * Extracting only the services you call.
 *
 * Filters are exact names or prefixes ending in `*`. Extracting a handful of
 * services is much faster than extracting the hundreds a full Moodle declares.
 */
import { extractWebservice } from "@didactika/moodle-client-schemas";

const moodlePath = process.env.MOODLE_PATH ?? "./moodle";

async function main() {
    const { schemas, errors } = await extractWebservice({
        moodlePath,
        services: [
            "core_webservice_get_site_info", // exact name
            "core_course_get_*",             // every service starting with core_course_get_
            "mod_assign_*",                  // a whole plugin
            "local_doesnotexist_*",          // matches nothing: reported, not thrown
        ],
    });

    console.log(schemas.map((schema) => schema.name).sort().join("\n"));

    // A filter that matched nothing comes back as SERVICE_NOT_FOUND, with the
    // filter itself in `serviceName`. The other filters are unaffected.
    for (const error of errors.filter((e) => e.code === "SERVICE_NOT_FOUND")) {
        console.warn(`no service matches '${error.serviceName}'`);
    }
}

main();
