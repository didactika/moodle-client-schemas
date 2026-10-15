/**
 * Saving schemas as JSON.
 *
 * Schemas are plain JSON-serializable objects. Writing them to disk lets other
 * tools (documentation, validators, other languages) use them without PHP, and
 * lets you diff the API between two Moodle versions.
 */
import { writeFile } from "node:fs/promises";
import { extractWebservice } from "@didactika/moodle-client-schemas";

const moodlePath = process.env.MOODLE_PATH ?? "./moodle";
const output = process.env.OUTPUT ?? "./moodle-schemas.json";

async function main() {
    const { schemas, errors } = await extractWebservice({ moodlePath });

    // Sorting makes the file stable, so version-to-version diffs stay small.
    const sorted = [...schemas].sort((a, b) => a.name.localeCompare(b.name));

    await writeFile(output, JSON.stringify({ moodlePath, schemas: sorted, errors }, null, 2));
    console.log(`${sorted.length} schemas written to ${output}`);
}

main();
