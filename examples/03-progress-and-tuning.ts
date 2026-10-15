/**
 * Reporting progress yourself, and tuning recovery for slow codebases.
 *
 * `progress: true` prints a ready-made terminal card. Pass a function instead to
 * feed your own logger, a progress bar, or a CI log that is not a TTY.
 */
import { extractWebservice, type WebServiceProgress } from "@didactika/moodle-client-schemas";

const moodlePath = process.env.MOODLE_PATH ?? "./moodle";

function logEveryTenPercent(): (progress: WebServiceProgress) => void {
    let lastBucket = -1;
    return ({ completed, total, percent, eta }) => {
        const bucket = Math.floor(percent / 10);
        if (bucket !== lastBucket) {
            lastBucket = bucket;
            console.log(`${completed}/${total} (${percent}%) ${eta}`);
        }
    };
}

async function main() {
    const { schemas, errors } = await extractWebservice({
        moodlePath,
        progress: logEveryTenPercent(),

        // A service may run up to 30 s without progress before it is reported
        // as INTROSPECTION_FAILED (default 15 s).
        timeout: 30_000,

        // If the batch PHP process crashes or stalls, the remaining services are
        // retried in isolated processes, at most this many at a time (default 8).
        concurrency: 4,
    });

    console.log(`done: ${schemas.length} schemas, ${errors.length} errors`);
}

main();
