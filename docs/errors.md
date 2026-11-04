# Errors

The library reports failures in two ways:

| Where | How | Type |
| --- | --- | --- |
| `extractWebservice` | **returned** in `result.errors`, never thrown for codebase or environment problems | `WebServiceExtractionError` |
| `generateWebserviceFiles` | **thrown** | `MoodleGeneratorError` |

`mapExtractionErrorToGeneratorError` converts the first kind into the second, and
`formatError` renders either one as a CLI message.

---

## Contents

- [Extraction errors](#extraction-errors)
  - [`WebServiceExtractionError`](#webserviceextractionerror)
  - [Error codes](#error-codes)
  - [Environment errors](#environment-errors)
  - [Per-service errors](#per-service-errors)
  - [Handling them](#handling-them)
- [Generator errors](#generator-errors)
  - [`MoodleGeneratorError`](#moodlegeneratorerror)
  - [From extraction code to generator code](#from-extraction-code-to-generator-code)
  - [All generator codes](#all-generator-codes)
  - [`formatError(error)`](#formaterrorerror)
- [Troubleshooting](#troubleshooting)

---

## Extraction errors

### `WebServiceExtractionError`

```ts
interface WebServiceExtractionError {
    /** Service the error belongs to; for SERVICE_NOT_FOUND, the filter that matched nothing */
    serviceName?: string;
    /** PHP class declared for the service */
    classname?: string;
    /** File involved, e.g. a db/services.php that could not be read */
    classFile?: string;
    /** Machine-readable category, see below */
    code?: WebServiceErrorCode;
    /** Human-readable explanation */
    message: string;
    /** Underlying error message, when there is one */
    cause?: string;
}
```

Route on `code`, never on `message`. Messages are meant for people and may change
between versions. Codes are part of the public API.

### Error codes

```ts
type WebServiceErrorCode =
    | "INVALID_MOODLE_PATH"
    | "PHP_NOT_FOUND"
    | "PHP_VERSION_UNSUPPORTED"
    | "PERMISSION_DENIED"
    | "SERVICE_NOT_FOUND"
    | "CLASS_NOT_FOUND"
    | "INTROSPECTION_FAILED";
```

| Code | Scope | Meaning |
| --- | --- | --- |
| `INVALID_MOODLE_PATH` | environment | `moodlePath` is not a usable Moodle root. |
| `PHP_NOT_FOUND` | environment | No `php` executable on the `PATH`. |
| `PHP_VERSION_UNSUPPORTED` | environment | PHP is older than 8.0. |
| `PERMISSION_DENIED` | environment or service | A directory or file could not be read. |
| `SERVICE_NOT_FOUND` | filter | A `services` filter matched no declared service. |
| `CLASS_NOT_FOUND` | service | The class file or class of a service does not exist. |
| `INTROSPECTION_FAILED` | service | The class exists, but its signature could not be extracted faithfully. |

### Environment errors

These stop the run before any service is processed. The result is then
`{ schemas: [], errors: [error] }`, and the error has no `serviceName`.

| Code | `message` starts with | Fix |
| --- | --- | --- |
| `INVALID_MOODLE_PATH` | `The provided Moodle path does not exist on disk` | Check the spelling. `~` is expanded; relative paths are resolved from `process.cwd()`. |
| `INVALID_MOODLE_PATH` | `The provided Moodle path is a file, not a directory` | Point at the directory containing `version.php`. |
| `INVALID_MOODLE_PATH` | `The provided directory is not a valid Moodle codebase (no version.php found at root)` | Point at the Moodle root, not at a plugin or a parent folder. |
| `INVALID_MOODLE_PATH` | `The provided path '…' is not a direct Moodle root. A Moodle codebase was detected in '…'` | Use the subdirectory named in the message. |
| `INVALID_MOODLE_PATH` | `The provided path '…' contains multiple Moodle installations` | Choose one of the subdirectories listed in the message. |
| `INVALID_MOODLE_PATH` | `The provided directory is not a valid Moodle codebase (no services.php files discovered)` | The checkout is incomplete, or everything sits under ignored folders such as `vendor/` or `tests/`. |
| `INVALID_MOODLE_PATH` | `Cannot read directory at '…'` | Unexpected filesystem error; `cause` has the details. |
| `PERMISSION_DENIED` | `Permission denied: Cannot access Moodle directory` / `Cannot read contents of Moodle directory` | Give the current user read and execute permission on the directory. |
| `PHP_NOT_FOUND` | `PHP CLI was not found on your system PATH` / `PHP CLI is not installed or not accessible` | Install PHP 8.0+ CLI, check `php -v` from the same shell. |
| `PHP_VERSION_UNSUPPORTED` | `Unsupported PHP version detected (x.y)` | Upgrade the PHP CLI to 8.0+. Older Moodle codebases are supported; only the CLI version matters. |

### Per-service errors

These affect one service, or one filter. Every other service is still extracted, and
successful schemas are returned next to the errors.

#### `SERVICE_NOT_FOUND`

```json
{
  "serviceName": "core_nope_*",
  "code": "SERVICE_NOT_FOUND",
  "message": "Web service or filter pattern 'core_nope_*' was not found in any declared db/services.php."
}
```

- The name is misspelled, or the service belongs to a different Moodle version.
- The plugin is not present in this codebase.
- The wildcard is not at the end. Only a trailing `*` is a wildcard.

#### `CLASS_NOT_FOUND`

The service is declared in `db/services.php`, but its code cannot be found.

| `message` contains | Cause |
| --- | --- |
| `Could not resolve class file on disk for class '…'` | No file was found for `classname` (via `classpath`, `classes/` autoloading, subplugins or core subsystems). |
| `Class file not found on disk` | The resolved path does not exist. |
| `Class '…' was not found in the Moodle codebase` | The file loads, but does not define that class. This is usually a typo in `classname` or a namespace mismatch. |

The library does not create a placeholder class in these cases. A missing class is always
an error.

#### `INTROSPECTION_FAILED`

The class exists, but no trustworthy signature could be obtained.

| `message` contains | Cause | What to do |
| --- | --- | --- |
| `Method X::m_parameters() does not exist` / `m_returns() does not exist` | `methodname` is wrong, or one of the two methods is missing. In Moodle 4.0+ an omitted `methodname` means `execute`. | Fix `db/services.php` or the class. |
| `X::m_returns() threw SomeException: …` | The method throws while building its description, often because it needs the database or the session. | Make `_parameters()` / `_returns()` pure: they should only build the description. |
| `Signature depends on classes missing from the Moodle codebase (synthetic stubs used: …)` | The description uses a class, for example an exporter, that does not exist in this codebase. The message lists what was missing. | Add the missing plugin or class. |
| `Execution timed out after N ms without progress` | The service blocked the sandbox for longer than `timeout`. | Raise `timeout`, or find what the method waits on. |
| `Could not read service definitions from '…'` | A `db/services.php` could not be parsed. `classFile` names it. | Fix the PHP syntax of that file. |

A failed service is never returned in `schemas`. In particular, the library never reports
an empty or guessed signature as a success.

#### `PERMISSION_DENIED` (per service)

A class file or a `db/services.php` exists but is not readable by the current user. The
message names the file.

### Handling them

```ts
import { extractWebservice, type WebServiceExtractionError } from "@didactika/moodle-client-schemas";

const { schemas, errors } = await extractWebservice({ moodlePath: "./moodle" });

const byCode = new Map<string, WebServiceExtractionError[]>();
for (const error of errors) {
    const code = error.code ?? "UNKNOWN";
    byCode.set(code, [...(byCode.get(code) ?? []), error]);
}

if (byCode.has("PHP_NOT_FOUND") || byCode.has("INVALID_MOODLE_PATH")) {
    // environment problem: nothing was extracted, report and stop
}

for (const error of byCode.get("INTROSPECTION_FAILED") ?? []) {
    console.warn(`${error.serviceName}: ${error.message}`);
}
```

In a large Moodle codebase a few `INTROSPECTION_FAILED` entries are normal, typically
from third-party plugins with broken definitions. Decide yourself whether they should fail
your build. [examples/04-handling-errors.ts](../examples/04-handling-errors.ts) shows a
complete policy.

---

## Generator errors

### `MoodleGeneratorError`

```ts
class MoodleGeneratorError extends Error {
    readonly name: "MoodleGeneratorError";
    readonly code: MoodleGeneratorErrorCode;
    readonly title: string;   // 'Write Permission Denied'
    readonly details: string; // what happened
    readonly action: string;  // what the user should do
    cause?: unknown;          // original error, when there is one
    format(): string;
}
```

`message` and `format()` both produce:

```text
[moodle-client] ERROR: Write Permission Denied (ERR_WRITE_PERMISSION_DENIED)
Details: Permission denied when writing schemas to destination directory: './out'.
Action:  Ensure the current user has write permissions to create and modify files in the destination directory.
```

`generateWebserviceFiles` throws one with `ERR_WRITE_PERMISSION_DENIED` when the target
directory cannot be written (`EACCES` / `EPERM`). Other filesystem errors are rethrown
as they are.

```ts
try {
    await generateWebserviceFiles(schemas, "./src/moodle-types");
} catch (error) {
    if (error instanceof MoodleGeneratorError && error.code === "ERR_WRITE_PERMISSION_DENIED") {
        // ...
    }
    throw error;
}
```

### From extraction code to generator code

```ts
function mapExtractionErrorToGeneratorError(
    err: { code?: string; message: string; serviceName?: string; classname?: string },
    moodlePath?: string
): MoodleGeneratorError;
```

Use this function to show an extraction error with a title and a recommended action:

| `WebServiceErrorCode` | `MoodleGeneratorErrorCode` |
| --- | --- |
| `PHP_NOT_FOUND` | `ERR_PHP_NOT_FOUND` |
| `PHP_VERSION_UNSUPPORTED` | `ERR_PHP_VERSION_UNSUPPORTED` |
| `PERMISSION_DENIED` | `ERR_MOODLE_PATH_PERMISSION_DENIED` |
| `SERVICE_NOT_FOUND` | `ERR_SERVICE_NOT_FOUND` |
| `CLASS_NOT_FOUND` | `ERR_CLASS_NOT_FOUND` |
| `INTROSPECTION_FAILED` | `ERR_INTROSPECTION_FAILED` |
| `INVALID_MOODLE_PATH`, multiple installations | `ERR_MOODLE_PATH_MULTIPLE_INSTANCES` |
| `INVALID_MOODLE_PATH`, no `services.php` | `ERR_NO_SERVICES_FOUND` |
| `INVALID_MOODLE_PATH`, path missing | `ERR_MOODLE_PATH_NOT_FOUND` |
| `INVALID_MOODLE_PATH`, anything else, or no code | `ERR_MOODLE_PATH_NOT_ROOT` |

```ts
const { errors } = await extractWebservice({ moodlePath: "./moodle" });
for (const error of errors) {
    console.error(mapExtractionErrorToGeneratorError(error, "./moodle").format());
}
```

### All generator codes

`MoodleGeneratorErrorCode` is shared with the tools built on this library (the
`@didactika/moodle-client` CLIs). Some codes are only produced by those tools.

| Code | Title | Produced by | Action |
| --- | --- | --- | --- |
| `ERR_PHP_NOT_FOUND` | PHP CLI Not Found | mapping | Install PHP 8.0+ and put `php` on the `PATH`. |
| `ERR_PHP_VERSION_UNSUPPORTED` | Unsupported PHP Version | mapping | Upgrade the PHP CLI to 8.0+. |
| `ERR_MOODLE_PATH_NOT_FOUND` | Moodle Path Not Found | mapping | Check that `moodlePath` exists. |
| `ERR_MOODLE_PATH_NOT_ROOT` | Invalid Moodle Root Directory | mapping | Point `moodlePath` at the directory with `version.php`. |
| `ERR_MOODLE_PATH_MULTIPLE_INSTANCES` | Multiple Moodle Instances Detected | mapping | Point at one installation's subdirectory. |
| `ERR_MOODLE_PATH_PERMISSION_DENIED` | Moodle Path Permission Denied | mapping | Grant read permission on the codebase. |
| `ERR_NO_SERVICES_FOUND` | No Web Services Found | mapping | Use a complete Moodle checkout. |
| `ERR_SERVICE_NOT_FOUND` | Web Service Not Found | mapping | Fix the service name or wildcard. |
| `ERR_CLASS_NOT_FOUND` | Web Service Class Not Found | mapping | Install the plugin that declares the class. |
| `ERR_INTROSPECTION_FAILED` | Web Service Introspection Failed | mapping | Make `_parameters()` / `_returns()` run cleanly. |
| `ERR_WRITE_PERMISSION_DENIED` | Write Permission Denied | `generateWebserviceFiles` | Grant write permission on the output directory. |
| `ERR_GIT_NOT_FOUND` | Git Executable Not Found | consumer CLIs | Install Git. |
| `ERR_NETWORK_DISCONNECTED` | Network Disconnected | consumer CLIs | Check connectivity, or use a local `moodlePath`. |
| `ERR_ARCHIVE_EXTRACTION_FAILED` | Archive Extraction Failed | consumer CLIs | Retry; check disk space. |
| `ERR_CONFIG_INVALID_JSON` | Invalid Configuration File | consumer CLIs | Fix the configuration JSON. |
| `ERR_CONFIG_MISSING_OUTDIR_LOCAL` | Missing outDir in Local Mode | consumer CLIs | Add `outDir`. |
| `ERR_CONFIG_FILE_NOT_FOUND` | Configuration File Not Found | consumer CLIs | Check the `--config` path. |
| `ERR_MOODLE_VERSION_UNSUPPORTED` | Unsupported Moodle Version | consumer CLIs | Use Moodle 2.0 or later. |

You can also create your own `MoodleGeneratorError`, so your errors look like the
library's:

```ts
throw new MoodleGeneratorError({
    code: "ERR_CONFIG_FILE_NOT_FOUND",
    title: "Configuration File Not Found",
    details: `No file at '${configPath}'.`,
    action: "Check the path passed to --config.",
});
```

### `formatError(error)`

```ts
function formatError(error: unknown): string;
```

- A `MoodleGeneratorError` is formatted with `format()`.
- Anything else is wrapped as `Generation Failed (ERR_UNKNOWN)`, using its `message`.

Use it in the top-level `catch` of a script:

```ts
main().catch((error) => {
    console.error(formatError(error));
    process.exit(1);
});
```

---

## Troubleshooting

**Every service fails with `INTROSPECTION_FAILED`.** The sandbox itself cannot start.
Run `php -v` in the same environment as your script, and look for startup warnings
from `php.ini`. The `cause` of the first error usually contains the PHP output.

**A plugin's services are missing, with no error.** Check whether the plugin lives under
an ignored directory name (`vendor`, `tests`, `fixtures`, `install`, …). Also check whether
it is declared in a file other than `db/services.php`. Only that file is read.

**The run is slow or ends in timeouts on a big codebase.** Raise `timeout` (for example
`30000`) and filter `services` to the components you actually call.

**The same service extracts on one Moodle version and not another.** Introspection runs
the real code of each version. A class or exporter that was removed in one version
produces `CLASS_NOT_FOUND` or `INTROSPECTION_FAILED` there, which is the expected
behavior.
