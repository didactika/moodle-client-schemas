# Examples

Runnable scripts, in the order they are worth reading.

| | |
| --- | --- |
| [01-extract-services.ts](01-extract-services.ts) | extract every service of a codebase: run this first to prove your setup |
| [02-filtering-services.ts](02-filtering-services.ts) | exact names and `prefix_*` filters, and what an unmatched filter returns |
| [03-progress-and-tuning.ts](03-progress-and-tuning.ts) | your own progress callback, `timeout` and `concurrency` |
| [04-handling-errors.ts](04-handling-errors.ts) | telling environment, filter and per-service failures apart |
| [05-generating-typescript.ts](05-generating-typescript.ts) | `.d.ts` files with `generateWebserviceFiles`, used with any client |
| [06-exporting-json.ts](06-exporting-json.ts) | saving schemas as a stable JSON file |
| [07-walking-a-schema.ts](07-walking-a-schema.ts) | recursively reading parameters and returns |
| [08-custom-output.ts](08-custom-output.ts) | a custom file layout built from the lower-level emitters |
| [09-custom-client/](09-custom-client/) | `importSource` + `augmentClient: true`: typed `client.service()` methods on your own client, and what that client must provide |

They import `@didactika/moodle-client-schemas` by name, exactly as your own
code would, so they can be copied out of here unchanged. That also means they
are not type-checked as part of this repository's `npm run typecheck`, which
only covers `src/` and `test/`.

## Requirements

- Node.js 20 or later.
- PHP CLI 8.0 or later on the `PATH` (`php -v`).
- The **source code** of a Moodle site, any version from 2.0 on: a git clone or
  an unpacked release. No database, web server or installation is needed.

## Running them

Point `MOODLE_PATH` at the Moodle root (the directory containing `version.php`),
then run whichever one you want:

```console
export MOODLE_PATH="$HOME/src/moodle"

npx tsx examples/01-extract-services.ts
```

On PowerShell:

```console
$env:MOODLE_PATH = "$HOME\src\moodle"

npx tsx examples/01-extract-services.ts
```

`MOODLE_PATH` defaults to `./moodle`. Scripts that write files also read
`OUT_DIR` (05, 08) or `OUTPUT` (06). Example 09 has its own
[README](09-custom-client/README.md).

If every service fails, check the PHP setup first. [docs/errors.md](../docs/errors.md)
lists every error code and what to do about it.
