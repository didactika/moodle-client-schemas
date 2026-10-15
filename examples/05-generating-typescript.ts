/**
 * Generating TypeScript declarations from a Moodle codebase.
 *
 * Writes one `<component>/<area>/<action>.webservice.d.ts` per service plus an
 * `index.d.ts` barrel. Re-running it replaces the generated files and leaves
 * your own files in the same directory alone.
 *
 * The output is types only: use them with whatever HTTP client you have. To get
 * typed methods directly on a client object (`client.core_course_get_courses()`),
 * see 09-custom-client/.
 */
import {
    extractWebservice,
    formatError,
    generateWebserviceFiles,
    MoodleGeneratorError,
} from "@didactika/moodle-client-schemas";

const moodlePath = process.env.MOODLE_PATH ?? "./moodle";
const outDir = process.env.OUT_DIR ?? "./src/moodle-types";

async function main() {
    const { schemas, errors } = await extractWebservice({
        moodlePath,
        services: ["core_webservice_get_site_info", "core_course_get_courses", "core_user_*"],
    });

    if (schemas.length === 0) {
        console.error("nothing to generate", errors);
        process.exit(1);
    }

    try {
        // importSource: module the barrel takes `HttpMethod` and `MoodleResponse<T>`
        // from. Any module exporting both works.
        await generateWebserviceFiles(schemas, outDir, { importSource: "@didactika/moodle-client" });
    } catch (error) {
        if (error instanceof MoodleGeneratorError && error.code === "ERR_WRITE_PERMISSION_DENIED") {
            console.error(error.format());
            process.exit(1);
        }
        throw error;
    }

    console.log(`${schemas.length} services written to ${outDir}`);
    // Then, in your application:
    //
    //   import type { CoreCourseGetCoursesParams, CoreCourseGetCoursesReturns } from "./src/moodle-types";
    //
    //   const params: CoreCourseGetCoursesParams = { options: { ids: [1] } };
    //   const courses = await myClient.call<CoreCourseGetCoursesReturns>("core_course_get_courses", params);
}

main().catch((error) => {
    console.error(formatError(error));
    process.exit(1);
});
