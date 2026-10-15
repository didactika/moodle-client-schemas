/**
 * Step 2: use the generated methods on your own client.
 *
 *   MOODLE_URL=https://moodle.example.org MOODLE_TOKEN=... npx tsx examples/09-custom-client/usage.ts
 */
import { MoodleClient } from "./my-client";
// Loads the module augmentation in moodle-types/index.d.ts. Without this import
// (or including the folder in tsconfig), the methods below do not type-check.
import type {} from "./moodle-types";

const moodle = new MoodleClient(process.env.MOODLE_URL!, process.env.MOODLE_TOKEN!);

async function main() {
    // `params` is optional: this service has no required parameter.
    const { data: site } = await moodle.core_webservice_get_site_info();
    console.log(`${site.sitename}, Moodle ${site.release}`);

    // Parameters and the response are typed from the Moodle source code.
    const { data: courses } = await moodle.core_course_get_courses({ options: { ids: [1] } });
    for (const course of courses) {
        console.log(course.id, course.fullname);
    }

    // Compile-time errors, not runtime surprises:
    // moodle.core_course_get_courses({ options: { ids: ["1"] } }); // string is not number
    // moodle.core_course_get_course({});                           // no such service
}

main();
