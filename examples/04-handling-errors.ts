/**
 * Telling the failure cases apart.
 *
 * extractWebservice does not throw for codebase or environment problems: it
 * returns them in `errors`, next to whatever it could extract. Route on `code`,
 * never on `message`.
 */
import {
    extractWebservice,
    formatError,
    mapExtractionErrorToGeneratorError,
    type WebServiceErrorCode,
    type WebServiceExtractionError,
} from "@didactika/moodle-client-schemas";

const moodlePath = process.env.MOODLE_PATH ?? "./moodle";

// Nothing at all was extracted: the path or PHP is wrong.
const ENVIRONMENT: WebServiceErrorCode[] = ["INVALID_MOODLE_PATH", "PHP_NOT_FOUND", "PHP_VERSION_UNSUPPORTED"];

function groupByCode(errors: WebServiceExtractionError[]): Map<string, WebServiceExtractionError[]> {
    const groups = new Map<string, WebServiceExtractionError[]>();
    for (const error of errors) {
        const code = error.code ?? "UNKNOWN";
        groups.set(code, [...(groups.get(code) ?? []), error]);
    }
    return groups;
}

async function main() {
    const { schemas, errors } = await extractWebservice({
        moodlePath,
        services: ["core_user_*", "core_course_get_courses"],
    });

    const environmentError = errors.find((e) => e.code && ENVIRONMENT.includes(e.code));
    if (environmentError) {
        // Same "[moodle-client] ERROR / Details / Action" block the CLIs print.
        console.error(mapExtractionErrorToGeneratorError(environmentError, moodlePath).format());
        process.exit(1);
    }

    const groups = groupByCode(errors);

    // A requested service that does not exist is almost always a typo in your
    // own list: treat it as fatal.
    const missing = groups.get("SERVICE_NOT_FOUND") ?? [];
    if (missing.length > 0) {
        console.error(`unknown services: ${missing.map((e) => e.serviceName).join(", ")}`);
        process.exit(1);
    }

    // CLASS_NOT_FOUND / INTROSPECTION_FAILED usually come from broken or
    // incomplete plugins. Report them and keep the services that did work.
    for (const code of ["CLASS_NOT_FOUND", "INTROSPECTION_FAILED", "PERMISSION_DENIED"]) {
        for (const error of groups.get(code) ?? []) {
            console.warn(`[${code}] ${error.serviceName}: ${error.message}`);
        }
    }

    console.log(`${schemas.length} services usable`);
}

// Anything thrown (a bug, not a codebase problem) still gets a readable message.
main().catch((error) => {
    console.error(formatError(error));
    process.exit(1);
});
