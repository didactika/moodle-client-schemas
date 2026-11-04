# API Reference

Everything documented below is exported directly from the package root:

```ts
import {
    // Extraction
    extractWebservice,
    // Code generation
    generateWebserviceFiles,
    cleanPreviousWebserviceFiles,
    emitWebserviceCode,
    emitBarrelCode,
    hasRequiredParameters,
    resolveWebserviceFilePath,
    toFullPascalCase,
    // Utilities
    sanitizeDescription,
    resolvePrimitiveType,
    // Errors
    MoodleGeneratorError,
    formatError,
    mapExtractionErrorToGeneratorError,
} from "@didactika/moodle-client-schemas";

import type {
    ExtractWebserviceOptions,
    ExtractWebserviceResult,
    WebServiceSchema,
    WebServiceExtractionError,
    WebServiceErrorCode,
    WebServiceProgress,
    ProgressOption,
    WebServiceParametersSchema,
    WebServiceReturnSchema,
    WebServiceObjectSchema,
    WebServiceArraySchema,
    WebServiceValueSchema,
    WebServiceBaseSchema,
    WebServiceSchemaKind,
    PrimitiveType,
    GenerateWebserviceFilesOptions,
    BarrelEmitterOptions,
    GeneratedServiceMetadata,
    MoodleGeneratorErrorCode,
    MoodleGeneratorErrorOptions,
} from "@didactika/moodle-client-schemas";
```

Requirements: Node.js `>= 20` and the PHP CLI `>= 8.0` on the `PATH`. No database, web
server or installed Moodle site is needed: only the Moodle source code.

---

## Contents

- [`extractWebservice(options)`](#extractwebserviceoptions)
  - [`ExtractWebserviceOptions`](#extractwebserviceoptions-1)
  - [`ExtractWebserviceResult`](#extractwebserviceresult)
  - [Service filters](#service-filters)
  - [Progress reporting](#progress-reporting)
  - [How a service is extracted](#how-a-service-is-extracted)
- [Schema types](#schema-types)
  - [`WebServiceSchema`](#webserviceschema)
  - [Schema nodes](#schema-nodes)
  - [Field dictionary](#field-dictionary)
  - [Telling node kinds apart](#telling-node-kinds-apart)
- [Code generation](#code-generation)
  - [`generateWebserviceFiles(schemas, targetDir, options?)`](#generatewebservicefilesschemas-targetdir-options)
  - [What gets generated](#what-gets-generated)
  - [Using the generated types](#using-the-generated-types)
  - [Typed methods on your client (`augmentClient`)](#typed-methods-on-your-client-augmentclient)
  - [`cleanPreviousWebserviceFiles(dir, isRoot?)`](#cleanpreviouswebservicefilesdir-isroot)
  - [`emitWebserviceCode(schema)`](#emitwebservicecodeschema)
  - [`emitBarrelCode(services, options?)`](#emitbarrelcodeservices-options)
  - [`resolveWebserviceFilePath(name)`](#resolvewebservicefilepathname)
  - [`toFullPascalCase(name)`](#tofullpascalcasename)
  - [`hasRequiredParameters(schema)`](#hasrequiredparametersschema)
- [Utilities](#utilities)
  - [`resolvePrimitiveType(type)`](#resolveprimitivetypetype)
  - [`sanitizeDescription(text)`](#sanitizedescriptiontext)
- [Errors](#errors)

---

## `extractWebservice(options)`

Scans a local Moodle codebase and returns the parameter and return schemas of its web
services.

```ts
function extractWebservice(options: ExtractWebserviceOptions): Promise<ExtractWebserviceResult>;
```

It **never rejects because of the codebase**. Every problem (invalid path, missing PHP,
unknown service, failed introspection) is reported as an entry of `result.errors`, and every
service that could be extracted is still returned in `result.schemas`. A single run can
therefore give you both schemas and errors.

```ts
const { schemas, errors } = await extractWebservice({
    moodlePath: "~/moodle",
    services: ["core_user_*"],
});
```

The Moodle directory is treated as read-only. Scratch data (a PHP dataroot, and for
Moodle < 4.0 a PHP 8-compatible copy of the codebase) lives in a private temporary
directory that is removed when the call ends, so concurrent calls do not interfere with
each other.

### `ExtractWebserviceOptions`

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `moodlePath` | `string` | required | Root of the Moodle source code. Absolute, relative to `process.cwd()`, or starting with `~`. The Moodle 5.1+ layout with a `public/` web root is detected automatically. |
| `services` | `string[]` | `['*']` | Services to extract. See [Service filters](#service-filters). |
| `concurrency` | `number` | `8` | Maximum number of isolated PHP processes used to retry services after the batch process crashed or stalled. |
| `timeout` | `number` | `15000` | Milliseconds the PHP sandbox may spend on one service without progress. The stalled service is reported as `INTROSPECTION_FAILED` and the rest are retried in isolated processes. |
| `progress` | `boolean \| (p: WebServiceProgress) => void` | off | `true` prints a live progress card on the terminal; a function receives progress snapshots instead. |

`moodlePath` must point at the Moodle root, the directory containing `version.php`
(or `public/version.php`). A parent directory that contains one or more Moodle
installations is rejected with `INVALID_MOODLE_PATH` and a message naming the
subdirectories found.

### `ExtractWebserviceResult`

```ts
interface ExtractWebserviceResult {
    /** Successfully extracted services */
    schemas: WebServiceSchema[];
    /** Everything that failed: environment, filters, class resolution, introspection */
    errors: WebServiceExtractionError[];
}
```

`WebServiceExtractionError` and every error code are described in
[errors.md](errors.md).

When the environment itself is unusable (bad `moodlePath`, no PHP, PHP < 8.0, no
`db/services.php` anywhere) the result is `{ schemas: [], errors: [oneError] }`. Check for
that case before treating an empty `schemas` array as "nothing matched":

```ts
const ENVIRONMENT_CODES = new Set(["INVALID_MOODLE_PATH", "PHP_NOT_FOUND", "PHP_VERSION_UNSUPPORTED"]);
const fatal = errors.find((e) => e.code && ENVIRONMENT_CODES.has(e.code) && !e.serviceName);
```

### Service filters

| Filter | Matches |
| --- | --- |
| `'*'` (or omitting `services`) | every declared service |
| `'core_user_get_users'` | exactly that service |
| `'core_user_*'` | every service whose name starts with `core_user_` |

- Only a **trailing** `*` is a wildcard. `'*_get_users'` or `'core_*_users'` match
  literally and will not match anything.
- Filters are combined with OR, and duplicates are extracted once.
- A filter that matches no declared service produces a `SERVICE_NOT_FOUND` error whose
  `serviceName` is the filter itself. The other filters are still processed.

```ts
await extractWebservice({
    moodlePath: "./moodle",
    services: ["core_course_*", "mod_assign_get_assignments", "local_myplugin_*"],
});
```

### Progress reporting

```ts
interface WebServiceProgress {
    total: number;           // services queued for introspection
    completed: number;       // services finished, successfully or not
    currentService?: string; // last service processed
    percent: number;         // 0 to 100
    eta: string;             // e.g. '~3s left'
}
```

```ts
await extractWebservice({
    moodlePath: "./moodle",
    progress: (p) => process.stdout.write(`\r${p.percent}% ${p.eta}   `),
});
```

`progress: true` renders the built-in terminal card instead. Leave it off in CI logs or
when stdout is not a TTY.

### How a service is extracted

1. **Scan** every `**/db/services.php`. `node_modules`, `vendor`, `.git`, `tests`,
   `fixtures`, `localcache`, `pix`, `lang` and `install` are skipped. Symlinked plugin
   directories are followed, and each real directory is visited once.
2. **Read `$functions`** statically. Literal arrays, `$functions['x'] = [...]`, `+=`,
   `array_merge()` / `array_replace()`, `unset()` and declarations inside `if` blocks
   are all understood (every branch of an `if` is included).
3. **Resolve the class file**, through `classpath`, PSR-4 autoloading of `classes/`,
   subplugins (`db/subplugins.json` / `.php`) and core subsystems. In Moodle 4.0+, a
   missing `methodname` defaults to `execute`.
4. **Introspect** each service in a headless PHP sandbox. The sandbox calls the real
   `{methodname}_parameters()` and `{methodname}_returns()` and serializes the
   `external_description` tree they return.

A service is only returned in `schemas` when **both** methods exist on the real class, run
without throwing, and do not depend on classes that are missing from the codebase.
Anything else is an error. The library never returns an empty or borrowed signature as a
success.

---

## Schema types

### `WebServiceSchema`

```ts
interface WebServiceSchema {
    /** Service name as declared in db/services.php, e.g. 'core_user_get_users' */
    name: string;
    /** 'description' from db/services.php, whitespace-normalized */
    description?: string;
    /** Result of {method}_parameters() */
    parameters: WebServiceParametersSchema | null;
    /** Result of {method}_returns(); null when Moodle returns null (no return value) */
    returns: WebServiceReturnSchema | null;
}
```

### Schema nodes

Moodle describes parameters and returns with three classes. Each one maps to one node type:

| Moodle class | Node type | Distinguishing field |
| --- | --- | --- |
| `external_value` | `WebServiceValueSchema` | `type` |
| `external_single_structure`, `external_function_parameters` | `WebServiceObjectSchema` | `keys` |
| `external_multiple_structure` | `WebServiceArraySchema` | `content` |

```ts
interface WebServiceBaseSchema {
    kind?: WebServiceSchemaKind; // 'parameters' | 'object' | 'array' | 'value' | 'description'
    description?: string;
    /** @deprecated use description */
    desc?: string;
    required?: number;
    default?: unknown;
    allownull?: boolean;
}

interface WebServiceValueSchema extends WebServiceBaseSchema {
    kind?: "value";
    type: string;                  // 'int', 'text', 'bool', 'raw', 'alphanumext', ...
    primitiveType?: PrimitiveType; // 'string' | 'number' | 'boolean'
}

interface WebServiceObjectSchema extends WebServiceBaseSchema {
    kind?: "parameters" | "object";
    keys: Record<string, WebServiceReturnSchema>;
}

interface WebServiceArraySchema extends WebServiceBaseSchema {
    kind?: "array";
    content: WebServiceReturnSchema;
}

type WebServiceParametersSchema = WebServiceObjectSchema;
type WebServiceReturnSchema = WebServiceValueSchema | WebServiceObjectSchema | WebServiceArraySchema;
```

### Field dictionary

| Field | Meaning |
| --- | --- |
| `kind` | Node classification, filled in for every extracted node. |
| `description` | Text the Moodle developer wrote for the field (`$desc` in PHP). Absent when empty. |
| `type` | Value of the `PARAM_*` constant, lowercase (`PARAM_INT` is `'int'`, `PARAM_RAW_TRIMMED` is `'raw_trimmed'`). |
| `primitiveType` | JSON primitive the value travels as. See [`resolvePrimitiveType`](#resolveprimitivetypetype). |
| `required` | `1` = `VALUE_REQUIRED`, `2` = `VALUE_OPTIONAL`, `0` = `VALUE_DEFAULT` (optional, Moodle fills in `default`). |
| `default` | Value Moodle uses when a `VALUE_DEFAULT` parameter is omitted; `null` otherwise. |
| `allownull` | Whether `null` is accepted (`NULL_ALLOWED`). Moodle's default for `external_value` is `true`. |
| `keys` | Child nodes of an object, in declaration order. |
| `content` | Node describing every element of an array. |

A real extracted schema:

```json
{
  "name": "mod_sample_get_items",
  "description": "Get sample items from fixture",
  "parameters": {
    "kind": "object",
    "required": 1,
    "default": null,
    "allownull": false,
    "keys": {
      "courseid": {
        "kind": "value",
        "type": "int",
        "primitiveType": "number",
        "required": 1,
        "default": null,
        "allownull": true,
        "description": "Course ID to filter"
      },
      "filter": {
        "kind": "value",
        "type": "text",
        "primitiveType": "string",
        "required": 0,
        "default": "",
        "allownull": true,
        "description": "Optional text filter"
      }
    }
  },
  "returns": {
    "kind": "object",
    "required": 1,
    "default": null,
    "allownull": false,
    "keys": {
      "items": {
        "kind": "array",
        "required": 1,
        "default": null,
        "allownull": false,
        "content": {
          "kind": "object",
          "required": 1,
          "default": null,
          "allownull": false,
          "description": "Read structure",
          "keys": {
            "id": { "kind": "value", "type": "int", "primitiveType": "number", "required": 1, "default": null, "allownull": true },
            "title": { "kind": "value", "type": "text", "primitiveType": "string", "required": 1, "default": null, "allownull": true }
          }
        }
      }
    }
  }
}
```

### Telling node kinds apart

`kind` is optional in the type, so narrow on the distinguishing field instead. That works
whether `kind` is present or not:

```ts
import type {
    WebServiceArraySchema,
    WebServiceObjectSchema,
    WebServiceReturnSchema,
} from "@didactika/moodle-client-schemas";

const isObject = (n: WebServiceReturnSchema): n is WebServiceObjectSchema => "keys" in n;
const isArray = (n: WebServiceReturnSchema): n is WebServiceArraySchema => "content" in n;
// anything else is a WebServiceValueSchema
```

[examples/07-walking-a-schema.ts](../examples/07-walking-a-schema.ts) shows a full
recursive walk.

---

## Code generation

### `generateWebserviceFiles(schemas, targetDir, options?)`

Writes one `.webservice.d.ts` per schema plus an `index.d.ts` barrel into `targetDir`.
The output is **declarations only**: types you can use with any HTTP client. Nothing in it
runs.

```ts
function generateWebserviceFiles(
    schemas: WebServiceSchema[],
    targetDir: string,
    options?: GenerateWebserviceFilesOptions
): Promise<void>;

interface GenerateWebserviceFilesOptions {
    /** Module that provides HttpMethod and MoodleResponse<T>. Default '@didactika/moodle-client' */
    importSource?: string;
    /** Add typed methods to the MoodleClient of importSource. Default false */
    augmentClient?: boolean;
}
```

| Option | Default | Effect |
| --- | --- | --- |
| `importSource` | `'@didactika/moodle-client'` | Module the barrel imports the `HttpMethod` and `MoodleResponse<T>` types from. Any module that exports them works. |
| `augmentClient` | `false` | When `true`, the barrel also declares that the `MoodleClient` of `importSource` has one method per service. See [Typed methods on your client](#typed-methods-on-your-client-augmentclient). |

- `targetDir` is created if it does not exist.
- Files generated by a previous run are removed first (see
  [`cleanPreviousWebserviceFiles`](#cleanpreviouswebservicefilesdir-isroot)). Your own
  files in the same directory are left alone.
- Throws [`MoodleGeneratorError`](errors.md#moodlegeneratorerror) with code
  `ERR_WRITE_PERMISSION_DENIED` when the directory is not writable. Any other filesystem
  error is rethrown unchanged.

```ts
const { schemas } = await extractWebservice({ moodlePath: "./moodle", services: ["core_user_*"] });
await generateWebserviceFiles(schemas, "./src/moodle-types");
```

### What gets generated

For `mod_sample_get_items`, the file `mod/sample/get_items.webservice.d.ts`:

```ts
/** Get sample items from fixture */
export interface ModSampleGetItemsParams {
    /** Course ID to filter */
    courseid: number | null;
    /** Optional text filter */
    filter?: string | null;
}

export interface ModSampleGetItemsReturns {
    items: Array<{
        id: number | null;
        title: string | null;
    }>;
}

export type ModSampleGetItemsReturn = ModSampleGetItemsReturns;
export type mod_sample_get_items_returns = ModSampleGetItemsReturns;
```

Mapping rules:

| Schema | TypeScript |
| --- | --- |
| `required: 1` | required property |
| `required: 0` or `2` | optional property (`?`) |
| `allownull: true` | `\| null` added to the type |
| `primitiveType` | `string`, `number` or `boolean` |
| array node | `T[]`, or `Array<...>` when the element type is an object or a union |
| object node | inline object type, or an `interface` at the top level |
| `returns: null` | `type XReturns = unknown` |
| `description` | JSDoc comment |

The `index.d.ts` barrel re-exports every file and describes all services in one
interface:

```ts
import type { MoodleResponse, HttpMethod } from "@didactika/moodle-client";
export * from './mod/sample/get_items.webservice';

import type { ModSampleGetItemsParams, ModSampleGetItemsReturns } from './mod/sample/get_items.webservice';

export interface GeneratedMoodleServices {
    mod_sample_get_items(params: ModSampleGetItemsParams, method?: HttpMethod): Promise<MoodleResponse<ModSampleGetItemsReturns>>;
}
```

`params` is optional in a method signature when the service has no required parameter.

### Using the generated types

By default the generated files only **describe** services. Use them with whatever client
you already have:

```ts
import type { CoreCourseGetCoursesParams, CoreCourseGetCoursesReturns } from "./moodle-types";

const params: CoreCourseGetCoursesParams = { options: { ids: [1] } };
const courses = await myClient.call<CoreCourseGetCoursesReturns>("core_course_get_courses", params);
```

`GeneratedMoodleServices` is also usable on its own, for example to type a wrapper object
or to look up a service's types by name:

```ts
import type { GeneratedMoodleServices } from "./moodle-types";

type CourseCall = GeneratedMoodleServices["core_course_get_courses"];
```

### Typed methods on your client (`augmentClient`)

With `augmentClient: true`, the barrel ends with a
[module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation):

```ts
declare module "<importSource>" {
    interface MoodleClient extends GeneratedMoodleServices {}
}
```

This tells TypeScript that the `MoodleClient` exported by `importSource` has one method per
service, so `client.core_course_get_courses(params)` type-checks with typed parameters and
response. **It only adds types.** The method must also exist on the client object when the
program runs; otherwise the call compiles and then throws
`TypeError: client.core_course_get_courses is not a function`. That is why this option is off
by default.

Enable it only when the client answers every service name with a function, typically
through a `Proxy`. [examples/09-custom-client](../examples/09-custom-client/) is a complete,
tested implementation.

#### What the `importSource` module must provide

`importSource` is copied verbatim into `index.d.ts`. It can be a package name
(`'@acme/moodle'`). A relative path also works, but it is resolved **from
`targetDir/index.d.ts`**, not from your script. So with `targetDir = './src/moodle-types'`, a
client in `./src/my-client.ts` needs `importSource: '../my-client'`.

| The module... | Result |
| --- | --- |
| cannot be resolved | `TS2307: Cannot find module '…'` in `index.d.ts` |
| does not export `HttpMethod` or `MoodleResponse` | `TS2305` / `TS2459` in `index.d.ts` |
| does not export `MoodleClient` (with `augmentClient: true`) | **no error**: the augmentation silently declares a new, unused `MoodleClient` interface, and your client gets no methods |
| exports all three | the methods appear on `MoodleClient` with typed parameters and responses |

`MoodleResponse` must be generic (`MoodleResponse<T>`). The barrel also has to be part of
the compilation: list `targetDir` in your `tsconfig.json` `include`, or add
`import type {} from './moodle-types'` in a file that is compiled.

#### At runtime

| Client | With `augmentClient: true` |
| --- | --- |
| Answers any service name with a function (e.g. a `Proxy`, as in example 09) | Works |
| Exposes services some other way, e.g. under a namespace (`client.webservice.x()`) | Compiles, then throws `TypeError: ... is not a function`. Leave `augmentClient` off and use the types as shown in [Using the generated types](#using-the-generated-types) |
| Has no per-service methods at all | Compiles, then throws the same `TypeError` |

### `cleanPreviousWebserviceFiles(dir, isRoot?)`

```ts
function cleanPreviousWebserviceFiles(dir: string, isRoot?: boolean): Promise<boolean>;
```

Removes what a previous generation produced. It returns `true` if anything was removed.

- It deletes `*.webservice.ts`, `*.webservice.d.ts`, `*.webservice-client.ts` and
  `*.webservice-client.d.ts` at any depth.
- It deletes `index.ts`, `index.d.ts` and `index.d.mts` **only at the root** and only when
  they contain a generated barrel.
- It prunes directories only when they became empty because of those deletions.
- It never touches other files or directories, including empty directories you created.

`generateWebserviceFiles` already calls this. Call it yourself to delete generated types
without regenerating them.

### `emitWebserviceCode(schema)`

```ts
function emitWebserviceCode(schema: WebServiceSchema): string;
```

Returns the source of one `.webservice.d.ts` file, as shown above, without touching the
disk.

### `emitBarrelCode(services, options?)`

```ts
function emitBarrelCode(services: GeneratedServiceMetadata[], options?: BarrelEmitterOptions): string;

// Same options as generateWebserviceFiles
interface BarrelEmitterOptions {
    importSource?: string;
    augmentClient?: boolean;
}

interface GeneratedServiceMetadata {
    name: string;               // 'core_course_get_courses'
    relativeImportPath: string; // './core/course/get_courses.webservice'
    hasRequiredParams: boolean;
    description?: string;
    paramsDescription?: string;
    returnsDescription?: string;
}
```

Returns the source of the barrel. Combine it with `emitWebserviceCode` when you need a
layout that `generateWebserviceFiles` does not produce, for example one file per
component (see [examples/08-custom-output.ts](../examples/08-custom-output.ts)).

### `resolveWebserviceFilePath(name)`

```ts
resolveWebserviceFilePath("core_course_get_courses"); // 'core/course/get_courses.webservice.d.ts'
resolveWebserviceFilePath("tool_mobile_call");        // 'tool/mobile/call.webservice.d.ts'
resolveWebserviceFilePath("local_sync");              // 'local/sync.webservice.d.ts'
resolveWebserviceFilePath("ping");                    // 'ping.webservice.d.ts'
```

The first two `_`-separated segments become directories.

### `toFullPascalCase(name)`

```ts
toFullPascalCase("core_course_get_courses"); // 'CoreCourseGetCourses'
```

This is the prefix of the generated `...Params` / `...Returns` names. Nothing is
abbreviated.

### `hasRequiredParameters(schema)`

```ts
function hasRequiredParameters(schema: WebServiceSchema): boolean;
```

`true` when at least one top-level parameter has `required: 1`.

---

## Utilities

### `resolvePrimitiveType(type)`

```ts
resolvePrimitiveType("int");       // 'number'
resolvePrimitiveType("PARAM_FLOAT"); // 'number'
resolvePrimitiveType("bool");      // 'boolean'
resolvePrimitiveType("notags");    // 'string'
resolvePrimitiveType(undefined);   // 'string'
```

`int`, `integer`, `float` and `number` (with or without a `param_` prefix, any case) map
to `'number'`. `bool` and `boolean` map to `'boolean'`. Everything else maps to `'string'`.
Extracted value nodes already carry the result in `primitiveType`.

### `sanitizeDescription(text)`

```ts
sanitizeDescription("List of items.\n   Indented text."); // 'List of items. Indented text.'
sanitizeDescription("  \n\t ");                            // undefined
```

Collapses newlines, tabs and repeated spaces. Returns `undefined` for blank text or a
non-string. Extracted descriptions have already been through it.

---

## Errors

- `extractWebservice` reports failures as data: `WebServiceExtractionError` objects with a
  `WebServiceErrorCode`.
- `generateWebserviceFiles` throws a `MoodleGeneratorError`.
- `mapExtractionErrorToGeneratorError` and `formatError` turn either kind into a
  user-facing message.

All of them are covered in [errors.md](errors.md).
