# @didactika/moodle-client-schemas

[![npm version](https://img.shields.io/npm/v/@didactika/moodle-client-schemas.svg?logo=npm)](https://www.npmjs.com/package/@didactika/moodle-client-schemas)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node-20%20%7C%2022%20%7C%2024-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Moodle](https://img.shields.io/badge/Moodle-2.0%20%E2%86%92%205.x+-F98012?logo=moodle&logoColor=white)](https://moodle.org/)

> High-performance AST analysis and headless introspection engine to extract strict, strongly-typed JSON Schemas and parameter contracts for **Moodle LMS Web Services** across all versions (Moodle 2.0 to 5.x+) with **zero database, Apache server, or running Moodle instance required**.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [`extractWebservice(options)`](#extractwebserviceoptions)
  - [`generateWebserviceFiles(schemas, targetDir, options)`](#generatewebservicefilesschemas-targetdir-options)
  - [Specifying the Moodle Path (`moodlePath`)](#specifying-the-moodle-path-moodlepath)
  - [Exported TypeScript Interfaces](#exported-typescript-interfaces)
  - [Concrete Schema Example](#concrete-schema-example)
- [Documentation](#documentation)
- [Usage Examples](#usage-examples)
- [Architecture & Extraction Flow](#architecture--extraction-flow)
  - [Pipeline Overview](#pipeline-overview)
- [Service Filtering](#service-filtering)
- [Schema Generation Error Codes](#schema-generation-error-codes)
- [Development & Verification](#development--verification)
- [Contributors](#contributors)
- [License](#license)

---

## Overview

Moodle LMS contains hundreds of Web Services scattered across its core subsystem (`core_*`) and dozens of modular plugins (`mod_*`, `enrol_*`, `block_*`, `tool_*`, `auth_*`, `qtype_*`, etc.). Historically, retrieving their parameter contracts and return signatures required a running LAMP stack, an active database, and an authenticated administrator token.

**`@didactika/moodle-client-schemas`** is a standalone, purely computational library that extracts full parameter and return schemas directly from any local Moodle source code folder. It combines static Abstract Syntax Tree (AST) analysis via `php-parser` with an ephemeral, headless PHP reflection sandbox to generate pure, structured TypeScript schema objects in memory.

---

## Key Features

- **Read-Only on Your Codebase:** The Moodle directory is never modified. Each run uses a private temporary directory (PHP scratch dataroot and, for Moodle < 4.0 only, a PHP 8-normalized copy of the codebase) that is removed when the run ends. Concurrent extractions in the same process are isolated from each other.
- **Strict Signatures:** A service is only reported as extracted when its real class exposes both `{method}_parameters()` and `{method}_returns()` and neither depends on synthetic stubs. Missing classes, missing methods and exceptions are reported as errors instead of empty or borrowed schemas.
- **Fine-Grained Service Filtering:** Extract all services (`['*']`), specific components (`['core_*']`, `['mod_assign_*']`), or individual webservice names (`['core_user_get_users']`).
- **High-Throughput Concurrency:** Multi-process parallel introspection powered by worker concurrency control (700+ webservices introspected in seconds).
- **Multi-Strategy Class Resolution:** Seamlessly handles Frankenstyle PSR-4 namespaces, explicit classpaths (`enrol/externallib.php`, `backup/externallib.php`), legacy monolithic classes (`grades_external.php`), and Moodle 5+ structures (`lib/external/externallib.php`).
- **Headless Mock Runtime:** Fully isolated PHP execution environment that mocks globals (`$CFG`, `$DB`, `$PAGE`, `$USER`), normalizes syntax differences, and uses JIT autoloading to resolve classes without requiring database connections.
- **Strongly-Typed Contracts:** Emits strongly typed AST schema trees (`WebServiceObjectSchema`, `WebServiceArraySchema`, `WebServiceValueSchema`) with Moodle type descriptions and resolved `primitiveType` mappings.
- **TypeScript Code Generation:** Provides emitters (`generateWebserviceFiles`, `emitWebserviceCode`, `emitBarrelCode`) to output production-ready TypeScript client modules, parameter interfaces, and centralized barrel exports.

---

## Installation

```bash
npm install @didactika/moodle-client-schemas
```

*Requirements:* Node.js `>= 20.0.0` and PHP CLI `>= 8.0` on the host system.

---

## Quick Start

```typescript
import {
    extractWebservice,
    ExtractWebserviceResult,
    WebServiceSchema,
    WebServiceExtractionError
} from '@didactika/moodle-client-schemas';

async function main() {
    // Extract all core and forum webservices from a local Moodle source directory
    const { schemas, errors }: ExtractWebserviceResult = await extractWebservice({
        moodlePath: '~/tmp/moodle',
        services: ['core_user_*', 'mod_forum_get_forum_access_information'],
        progress: true
    });

    console.log(`Successfully extracted ${schemas.length} webservices.`);
    for (const schema of schemas) {
        console.log(`- Webservice: ${schema.name}`);
    }

    if (errors.length > 0) {
        console.warn(`Encountered ${errors.length} extraction warnings/errors:`);
        for (const err of errors) {
            console.warn(`  [${err.code ?? 'ERROR'}] ${err.serviceName ?? 'General'}: ${err.message}`);
        }
    }
}

main().catch(console.error);
```

---

## API Reference

### `extractWebservice(options)`

The primary entry point of the library. Validates the environment, scans the specified Moodle repository, resolves class files, introspects method signatures, and returns typed schema objects alongside any structured error diagnostics.

```typescript
function extractWebservice(options: ExtractWebserviceOptions): Promise<ExtractWebserviceResult>;
```

#### `ExtractWebserviceOptions`

| Property | Type | Default | Description |
|---|---|---|---|
| `moodlePath` | `string` | *Required* | Absolute or relative path to the local Moodle source codebase (supports `~` expansion). |
| `services` | `string[]` | `['*']` | Filter list of webservices to extract. Supports exact names (`'core_user_get_users'`) and wildcard prefixes (`'core_*'`, `'mod_assign_*'`). Pass `['*']` or omit to extract all available webservices. |
| `concurrency` | `number` | `8` | Maximum number of concurrent isolated PHP processes used to retry services left pending after a crash or stall of the batch runner. |
| `timeout` | `number` | `15000` | Maximum time (ms) the PHP sandbox may spend on a single service without progress. The stalled service is reported as `INTROSPECTION_FAILED`; the remaining ones are retried in isolated processes. |
| `progress` | `boolean \| (progress: WebServiceProgress) => void` | `undefined` | `true` renders a terminal progress card; a function receives progress snapshots. |

---

### `generateWebserviceFiles(schemas, targetDir, options)`

Generates strongly typed TypeScript declaration files (`.webservice.d.ts`) alongside a central barrel (`index.d.ts`) directly from extracted schemas into a target directory.

Before writing, previously generated files are cleaned selectively: `*.webservice(.d).ts` and `*.webservice-client(.d).ts` files anywhere in the tree, plus `index.ts` / `index.d.ts` / `index.d.mts` **only at the root and only if they are generated barrels**. Directories are pruned only when they became empty because generated files were removed. Any other file or directory (including your own `index.ts` files in subfolders) is left untouched.

```typescript
function generateWebserviceFiles(
    schemas: WebServiceSchema[],
    targetDir: string,
    options?: GenerateWebserviceFilesOptions
): Promise<void>;
```

#### `GenerateWebserviceFilesOptions`

| Property | Type | Default | Description |
|---|---|---|---|
| `importSource` | `string` | `'@didactika/moodle-client'` | Module the barrel imports the `HttpMethod` and `MoodleResponse<T>` types from. Any module exporting both works; this library does not define them. A relative path is resolved from `targetDir/index.d.ts`. |
| `augmentClient` | `boolean` | `false` | When `true`, the barrel also emits `declare module "<importSource>" { interface MoodleClient extends GeneratedMoodleServices {} }`, so `client.<service>(params)` type-checks. |

#### What the generated files do, and what they do not do

The output is **types only**. By default it describes every service (`CoreCourseGetCoursesParams`, `CoreCourseGetCoursesReturns`, and a `GeneratedMoodleServices` interface with all of them) and attaches nothing to any client. Use the types with whatever client you have.

`augmentClient: true` additionally tells TypeScript that the `MoodleClient` of `importSource` has one method per service. It still adds no runtime code, so it is only safe when that client answers every service name with a function:

| Client | `augmentClient: true` |
|---|---|
| Answers any service name with a function (e.g. a `Proxy`) | Works. See [examples/09-custom-client](examples/09-custom-client/). |
| Exposes services some other way (a namespace such as `client.webservice.x()`, or only `call(name, params)`) | Compiles, then throws `TypeError: ... is not a function`. Keep the default (`false`). |
| `importSource` does not export `MoodleClient` | Compiles silently; the methods land on an unused interface. |

Full details: [docs/api-reference.md](docs/api-reference.md#typed-methods-on-your-client-augmentclient).

---

### Specifying the Moodle Path (`moodlePath`)

The `moodlePath` option specifies the local filesystem directory containing the target Moodle codebase. The library automatically normalizes and resolves all path formats:

1. **System Absolute Path:**
   ```typescript
   await extractWebservice({
       moodlePath: '/var/www/moodle'
   });
   ```

2. **Home Directory Path (`~` expansion):**
   ```typescript
   await extractWebservice({
       moodlePath: '~/tmp/moodle'
   });
   ```

3. **Relative Path (relative to the current working directory):**
   ```typescript
   await extractWebservice({
       moodlePath: './moodle-source'
   });
   ```

4. **Multi-level Relative Path (navigating parent directories):**
   ```typescript
   await extractWebservice({
       moodlePath: '../../external/moodle/5.1'
   });
   ```

> **Moodle 5+ Support:** The library automatically detects standard Moodle layouts as well as modern Moodle 5+ structures containing a `public/` web root (e.g. `/path/to/moodle/public/lib`), resolving all component paths transparently without extra configuration.

---

### Exported TypeScript Interfaces

The library exports the primary data contracts representing extracted webservice schemas and diagnostic errors:

```typescript
import {
    // Extractor
    extractWebservice,
    ExtractWebserviceOptions,
    ExtractWebserviceResult,
    WebServiceSchema,
    WebServiceExtractionError,
    WebServiceErrorCode,
    WebServiceParametersSchema,
    WebServiceReturnSchema,
    WebServiceObjectSchema,
    WebServiceArraySchema,
    WebServiceValueSchema,
    WebServiceBaseSchema,
    WebServiceSchemaKind,
    PrimitiveType,

    // Code Generator & Emitters
    generateWebserviceFiles,
    GenerateWebserviceFilesOptions,
    emitWebserviceCode,
    hasRequiredParameters,
    emitBarrelCode,
    BarrelEmitterOptions,
    resolveWebserviceFilePath,
    toFullPascalCase,
    GeneratedServiceMetadata,

    // Diagnostics & Errors
    MoodleGeneratorError,
    MoodleGeneratorErrorCode,
    MoodleGeneratorErrorOptions,
    formatError,
    mapExtractionErrorToGeneratorError
} from '@didactika/moodle-client-schemas';
```

#### `ExtractWebserviceResult`

The structured result returned by `extractWebservice`:

```typescript
export interface ExtractWebserviceResult {
    /** List of successfully extracted and normalized Web Service schemas */
    schemas: WebServiceSchema[];
    /** List of non-fatal errors or skipped services encountered during execution */
    errors: WebServiceExtractionError[];
}
```

#### `WebServiceExtractionError`

Detailed error information for environment issues or individual unresolvable webservices:

```typescript
export type WebServiceErrorCode =
    | 'INVALID_MOODLE_PATH'
    | 'PHP_NOT_FOUND'
    | 'PHP_VERSION_UNSUPPORTED'
    | 'SERVICE_NOT_FOUND'
    | 'CLASS_NOT_FOUND'
    | 'INTROSPECTION_FAILED'
    | 'PERMISSION_DENIED';

export interface WebServiceExtractionError {
    /** Target Web Service function name if applicable */
    serviceName?: string;
    /** Target PHP class name if applicable */
    classname?: string;
    /** Target PHP class file path if applicable */
    classFile?: string;
    /** Standardized error category code */
    code?: WebServiceErrorCode;
    /** Human-readable explanation of what failed */
    message: string;
    /** Raw underlying error message or stack trace */
    cause?: string;
}
```

#### `WebServiceSchema`

The final structured contract for an extracted Moodle Web Service:

```typescript
export interface WebServiceSchema {
    /** Webservice function name (e.g. 'core_user_get_users') */
    name: string;
    /** Human-readable description extracted from services.php or docblocks */
    description?: string;
    /** Parameter contract structure (maps to external_function_parameters) */
    parameters: WebServiceParametersSchema | null;
    /** Return value contract structure (maps to external_description) */
    returns: WebServiceReturnSchema | null;
}
```

#### Schema Structure Hierarchy

Moodle Web Service parameters and returns are modeled as recursive typed schema definitions:

```typescript
/** Base attributes shared across all schema node types */
export interface WebServiceBaseSchema {
    kind?: WebServiceSchemaKind;
    desc?: string;
    description?: string;
    required?: number;
    default?: unknown;
    allownull?: boolean;
}

/** Primitive leaf value schema (e.g., PARAM_INT, PARAM_TEXT, PARAM_BOOL) */
export interface WebServiceValueSchema extends WebServiceBaseSchema {
    kind?: 'value';
    /** Value of the PARAM_* constant, lowercase (PARAM_INT is 'int', PARAM_RAW_TRIMMED is 'raw_trimmed') */
    type: string;
    /** JSON primitive the value travels as */
    primitiveType?: PrimitiveType; // 'string' | 'number' | 'boolean'
}

/** Associative object structure with property keys (maps to external_single_structure) */
export interface WebServiceObjectSchema extends WebServiceBaseSchema {
    kind?: 'parameters' | 'object';
    /** Map of property names to child schemas */
    keys: Record<string, WebServiceReturnSchema>;
}

/** Parameter structure schema root (maps to external_function_parameters) */
export type WebServiceParametersSchema = WebServiceObjectSchema;

/** Array list structure containing homogeneous items (maps to external_multiple_structure) */
export interface WebServiceArraySchema extends WebServiceBaseSchema {
    kind?: 'array';
    /** Schema node definition of the elements contained in the array */
    content: WebServiceReturnSchema;
}

/** Return schema union representing any valid Moodle return structure */
export type WebServiceReturnSchema =
    | WebServiceValueSchema
    | WebServiceObjectSchema
    | WebServiceArraySchema;
```

#### Schema Field Dictionary

Every schema node contains descriptive metadata derived directly from Moodle's internal `external_description` reflection API:

| Field           | Type                                             | Description                                                                                                                                                                                                          |
|-----------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `kind`          | `'parameters' \| 'object' \| 'array' \| 'value'` | Structural classification of the node in the schema tree.                                                                                                                                                            |
| `description`   | `string`                                         | **Human-readable parameter description** written by the Moodle core/plugin author (maps to `$this->desc` in PHP).                                                                                                    |
| `type`          | `string`                                         | Moodle sanitation type string originating from Moodle's `PARAM_*` constants, evaluated at runtime to lowercase values (e.g., `'int'`, `'text'`, `'raw'`, `'raw_trimmed'`, `'bool'`, `'username'`, `'email'`, `'alphanumext'`). |
| `primitiveType` | `'string' \| 'number' \| 'boolean'`              | Standard primitive scalar TypeScript data type mapped from Moodle parameter types.                                                                                                                                   |
| `required`      | `number`                                         | Requirement rule defined by Moodle constants:<br>• `1` (`VALUE_REQUIRED`): Mandatory parameter.<br>• `2` (`VALUE_OPTIONAL`): Optional parameter.<br>• `0` (`VALUE_DEFAULT`): Parameter has a fallback default value. |
| `default`       | `unknown`                                        | Fallback value used by Moodle when an optional parameter is omitted by the caller (or `null` if none).                                                                                                              |
| `allownull`     | `boolean`                                        | Indicates whether `null` is explicitly permitted (`NULL_ALLOWED = true`, `NULL_NOT_ALLOWED = false`).                                                                                                                |
| `keys`          | `Record<string, WebServiceReturnSchema>`         | Dictionary mapping property names to their child schemas for `object` and `parameters` nodes.                                                                                                                        |
| `content`       | `WebServiceReturnSchema`                         | Definition of the element schema for homogeneous `array` nodes.                                                                                                                                                      |

#### Concrete Schema Example

Here is how an extracted `core_user_create_users` schema looks in runtime memory:

```json
{
  "name": "core_user_create_users",
  "description": "Create users.",
  "parameters": {
    "kind": "parameters",
    "keys": {
      "users": {
        "required": 1,
        "default": null,
        "allownull": false,
        "kind": "array",
        "description": "The array of users to create",
        "content": {
          "required": 1,
          "default": null,
          "allownull": false,
          "kind": "object",
          "keys": {
            "username": {
              "required": 1,
              "default": null,
              "allownull": true,
              "type": "username",
              "kind": "value",
              "primitiveType": "string",
              "description": "Username policy is defined in Moodle security config."
            },
            "password": {
              "required": 2,
              "default": null,
              "allownull": true,
              "type": "raw",
              "kind": "value",
              "primitiveType": "string",
              "description": "Plain text password consisting of any characters"
            },
            "firstname": {
              "required": 1,
              "default": null,
              "allownull": true,
              "type": "notags",
              "kind": "value",
              "primitiveType": "string",
              "description": "The first name(s) of the user"
            },
            "lastname": {
              "required": 1,
              "default": null,
              "allownull": true,
              "type": "notags",
              "kind": "value",
              "primitiveType": "string",
              "description": "The family name of the user"
            },
            "email": {
              "required": 1,
              "default": null,
              "allownull": true,
              "type": "raw_trimmed",
              "kind": "value",
              "primitiveType": "string",
              "description": "A valid and unique email address"
            }
          }
        }
      }
    }
  },
  "returns": {
    "required": 1,
    "default": null,
    "allownull": false,
    "kind": "array",
    "content": {
      "required": 1,
      "default": null,
      "allownull": false,
      "kind": "object",
      "keys": {
        "id": {
          "required": 1,
          "default": null,
          "allownull": true,
          "type": "int",
          "kind": "value",
          "primitiveType": "number",
          "description": "user id"
        },
        "username": {
          "required": 1,
          "default": null,
          "allownull": true,
          "type": "username",
          "kind": "value",
          "primitiveType": "string",
          "description": "user name"
        }
      }
    }
  }
}
```

---

## Documentation

| | |
| --- | --- |
| [docs/api-reference.md](docs/api-reference.md) | every exported function and type, schema format and generated output |
| [docs/errors.md](docs/errors.md) | every error code, what causes it and how to fix it |
| [examples/](examples/) | runnable scripts: extraction, filtering, error handling, code generation |

---

## Usage Examples

### 1. Extract All Web Services in the Repository

```typescript
import { extractWebservice } from '@didactika/moodle-client-schemas';

const { schemas, errors } = await extractWebservice({
    moodlePath: '/var/www/moodle'
});

console.log(`Successfully extracted ${schemas.length} webservices, ${errors.length} errors.`);
```

### 2. Filter by Component Prefix with Wildcards

```typescript
const { schemas, errors } = await extractWebservice({
    moodlePath: '~/moodle',
    services: [
        'core_user_*',
        'core_course_*',
        'mod_forum_*',
        'mod_assign_*'
    ]
});
```

### 3. Extract Specific Web Services by Exact Name

```typescript
const { schemas, errors } = await extractWebservice({
    moodlePath: './moodle',
    services: [
        'core_user_get_users',
        'core_enrol_get_users_courses',
        'mod_forum_get_forum_access_information'
    ]
});
```

### 4. Tuning Recovery for Large or Slow Codebases

All services are introspected by a single streaming PHP batch process. If it crashes or a service stalls longer than `timeout`, the affected service is reported and the remaining ones are retried in isolated processes, at most `concurrency` at a time:

```typescript
const { schemas, errors } = await extractWebservice({
    moodlePath: '/var/www/moodle',
    services: ['*'],
    timeout: 30000,  // allow up to 30 s per service without progress
    concurrency: 16  // up to 16 isolated fallback PHP processes
});
```

### 5. Generate TypeScript Declarations

Emit `.webservice.d.ts` files and an `index.d.ts` barrel from extracted schemas. The files contain types only (see [What the generated files do](#what-the-generated-files-do-and-what-they-do-not-do)).

```typescript
import { extractWebservice, generateWebserviceFiles } from '@didactika/moodle-client-schemas';

const { schemas } = await extractWebservice({
    moodlePath: '/var/www/moodle',
    services: ['core_course_get_courses']
});

await generateWebserviceFiles(schemas, './src/moodle-types');
// ./src/moodle-types/core/course/get_courses.webservice.d.ts
// ./src/moodle-types/index.d.ts
```

For typed methods directly on your own client, see `augmentClient` and [examples/09-custom-client](examples/09-custom-client/).

More scripts in [examples/](examples/).

---

## Architecture & Extraction Flow

### Pipeline Overview

```
                      Local Moodle Repository
                                 │
                                 ▼
                     Scanner (**/db/services.php)
                                 │
                                 ▼
                   In-Memory AST Parser (php-parser)
                                 │
                                 ▼
              ServiceExtractor (Declared $functions)
                                 │
                                 ▼
                 Service Filter (['*'], ['core_*'])
                                 │
                                 ▼
             ClassResolver (PSR-4 / Classpath / Legacy)
                                 │
                                 ▼
         Headless PHP Adapter (cli-executor + JIT Autoloader)
                                 │
                                 ▼
             Typed WebServiceSchema[] (Pure JSON in RAM)
```

1. **Scanner:** Recursively discovers all `**/db/services.php` entry points, skipping `node_modules`, `vendor`, `.git`, `tests`, `fixtures`, `localcache`, `pix`, `lang` and `install`. Symlinked plugin directories are followed, each real directory once.
2. **In-Memory AST Parser:** Parses PHP files into AST representations using `php-parser` and caches nodes in RAM during the extraction lifecycle.
3. **Service Extractor:** Replays the `$functions` assignments of each file (literal arrays, `$functions['x'] = [...]`, `+=`, `array_merge()`, `unset()`, every branch of `if` blocks), normalizing modern Moodle 4.x/5.x rules (such as optional `methodname` defaulting to `'execute'`).
4. **Class Resolver:** Multi-tier path discovery:
   - **Explicit Classpath:** Directly resolves explicit `classpath` attributes relative to repository root.
   - **Modern PSR-4:** Resolves component namespaces using `lib/components.json` or `core_component` class mapping.
   - **Subplugin Hierarchy:** Dynamically discovers subplugin directories from `db/subplugins.json`.
   - **Core Subsystems:** Locates subsystem handlers in `lib/classes/*_external.php` or modern `lib/external/externallib.php`.
5. **Sandboxed PHP Introspector:** Streams every service through one `batch-cli-executor.php` process (inactivity watchdog per service) on top of `headless-bootstrap.php`, invoking `classname::methodname_parameters()` and `classname::methodname_returns()` strictly. Services left pending by a crash or stall are retried with `cli-executor.php` in isolated processes (bounded by `concurrency`). For Moodle < 4.0, `normalize-cli.php` first rewrites a disposable copy of the codebase for PHP 8 syntax compatibility.

---

## Service Filtering

You can pass precise service filters to optimize performance and extract only what your application requires:

```typescript
// 1. Extract EVERYTHING
await extractWebservice({ moodlePath: './moodle', services: ['*'] });

// 2. Extract specific subsystems
await extractWebservice({ moodlePath: './moodle', services: ['core_course_*', 'core_user_*'] });

// 3. Extract exact individual functions
await extractWebservice({
    moodlePath: './moodle',
    services: [
        'core_enrol_get_users_courses',
        'mod_quiz_get_user_attempts'
    ]
});
```

---

## Schema Generation Error Codes

When extracting or generating schemas (via `extractWebservice`, `generateWebserviceFiles`, or higher-level CLIs), all failures are captured and presented as structured diagnostics without stack traces:

```text
[moodle-client] ERROR: <Title> (<CODE>)
Details: <Clear description of the issue>
Action:  <Exact action required to resolve it>
```

### PHP CLI Environment

| Code | Title | Description & Recommended Action |
|---|---|---|
| `ERR_PHP_NOT_FOUND` | PHP CLI Not Found | The `php` executable was not found in system `PATH`. Install PHP 8.0 or higher and ensure `php` is in your `PATH`. |
| `ERR_PHP_VERSION_UNSUPPORTED` | Unsupported PHP Version | Detected PHP version is lower than 8.0. Moodle schema extraction requires PHP 8.0+. Upgrade your PHP CLI installation. |

### Remote Archive Download & Network

| Code | Title | Description & Recommended Action |
|---|---|---|
| `ERR_NETWORK_DISCONNECTED` | Network Disconnected | Failed to reach GitHub to download Moodle repository archive (DNS resolution failed, connection timeout, or offline). Check your internet connection or use a local codebase via `moodlePath`. |
| `ERR_ARCHIVE_EXTRACTION_FAILED` | Archive Extraction Failed | Downloaded tarball archive could not be unpacked (corrupted stream or extraction failure). Check network stability and disk space. |
| `ERR_GIT_NOT_FOUND` | Git Executable Not Found | Fast tarball download failed and Git is not installed in system `PATH` to perform fallback shallow clone. Install Git or restore network connectivity. |

### Local Moodle Codebase Validation

| Code | Title | Description & Recommended Action |
|---|---|---|
| `ERR_MOODLE_PATH_NOT_FOUND` | Moodle Path Not Found | The path specified in `moodlePath` does not exist on disk. Check that the directory path is spelled correctly. |
| `ERR_MOODLE_PATH_NOT_ROOT` | Invalid Moodle Root Directory | The directory specified in `moodlePath` has no `version.php` at its root (nor under `public/`). Set `moodlePath` to the direct root of the Moodle installation. |
| `ERR_MOODLE_PATH_MULTIPLE_INSTANCES` | Multiple Moodle Instances Detected | The directory contains multiple Moodle installations in subdirectories. Specify the exact subdirectory of the desired instance in `moodlePath`. |
| `ERR_MOODLE_PATH_PERMISSION_DENIED` | Moodle Path Permission Denied | Permission denied when reading the local Moodle codebase. Check read permissions for the current user. |
| `ERR_NO_SERVICES_FOUND` | No Web Services Found | Scanned codebase has 0 `db/services.php` files. Verify that the Moodle installation is complete. |

### Web Service Resolution & Introspection

| Code | Title | Description & Recommended Action |
|---|---|---|
| `ERR_SERVICE_NOT_FOUND` | Web Service Not Found | A pattern specified in the `webservices` filter array did not match any declared web service in `db/services.php`. Check service names or wildcards in `moodle-client.config.json`. |
| `ERR_CLASS_NOT_FOUND` | Web Service Class Not Found | The PHP class declaring the external function could not be resolved on disk. Verify that the plugin containing the class is installed. |
| `ERR_INTROSPECTION_FAILED` | Web Service Introspection Failed | PHP reflection threw a fatal error or uncaught exception while executing `_parameters()` or `_returns()`. Check PHP syntax and runtime dependencies in the external class. |

### Configuration & Output Filesystem

| Code | Title | Description & Recommended Action |
|---|---|---|
| `ERR_CONFIG_INVALID_JSON` | Invalid Configuration File | `moodle-client.config.json` contains malformed JSON. Fix syntax errors or remove the file to regenerate default configuration. |
| `ERR_CONFIG_MISSING_OUTDIR_LOCAL` | Missing outDir in Local Mode | When `moodlePath` is defined, `outDir` is mandatory to avoid overwriting internal schemas. Add `"outDir": "./moodle-schemas"` to `moodle-client.config.json`. |
| `ERR_CONFIG_FILE_NOT_FOUND` | Configuration File Not Found | The file specified via `--config <path>` does not exist on disk. Check the file path or omit `--config`. |
| `ERR_MOODLE_VERSION_UNSUPPORTED` | Unsupported Moodle Version | Configured Moodle version is lower than 2.0. Web services schema generation requires Moodle 2.0 or higher. Set `"version"` to a supported version (e.g. `"4.5"`). |
| `ERR_WRITE_PERMISSION_DENIED` | Write Permission Denied | Permission denied when writing generated schemas to destination directory. Check filesystem write permissions. |

---

## Development & Verification

The codebase strictly enforces ESLint rules, TypeScript strict typing, and a maximum cyclomatic complexity of $\le 3$ per function:

```bash
npm run build      # Compile dual CJS/ESM distribution and TypeScript declarations (.d.ts)
npm run lint       # Validate code style, complexity <= 3, and zero unused variables
npm run typecheck  # Validate types with tsc --noEmit
npm test           # Run full verification (43 unit & integration test suites, 287 tests)
```

---

## Contributors

Contributions, issues, and feature requests are welcome!

* **Eduardo Cubias** ([@Eduardo-Cubiasss](https://github.com/Eduardo-Cubiasss))

---

## License

[MIT](LICENSE) © [Didactika - Educational Technology Open Source](https://github.com/didactika)
