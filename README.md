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
  - [Specifying the Moodle Path (`moodlePath`)](#specifying-the-moodle-path-moodlepath)
  - [Exported TypeScript Interface](#exported-typescript-interface)
- [Usage Examples](#usage-examples)
- [Architecture & Extraction Flow](#architecture--extraction-flow)
  - [Pipeline Overview](#pipeline-overview)
  - [Sandboxed PHP Adapter](#sandboxed-php-adapter)
- [Service Filtering](#service-filtering)
- [Development & Verification](#development--verification)
- [Contributors](#contributors)
- [License](#license)

---

## Overview

Moodle LMS contains hundreds of Web Services scattered across its core subsystem (`core_*`) and dozens of modular plugins (`mod_*`, `enrol_*`, `block_*`, `tool_*`, `auth_*`, `qtype_*`, etc.). Historically, retrieving their parameter contracts and return signatures required a running LAMP stack, an active database, and an authenticated administrator token.

**`@didactika/moodle-client-schemas`** is a standalone, purely computational library that extracts full parameter and return schemas directly from any local Moodle source code folder. It combines static Abstract Syntax Tree (AST) analysis via `php-parser` with an ephemeral, headless PHP reflection sandbox to generate pure, structured TypeScript schema objects in memory.

---

## Key Features

- ⚡ **Pure In-Memory Execution:** Completely ephemeral AST and reflection lifecycle. Zero persistent disk pollution or state leak between extractions.
- 🎯 **Fine-Grained Service Filtering:** Extract all services (`['*']`), specific components (`['core_*']`, `['mod_assign_*']`), or individual webservice names (`['core_user_get_users']`).
- 🚀 **High-Throughput Concurrency:** Multi-process parallel introspection powered by worker concurrency control (700+ webservices introspected in seconds).
- 🔍 **Multi-Strategy Class Resolution:** Seamlessly handles Frankenstyle PSR-4 namespaces, explicit classpaths (`enrol/externallib.php`, `backup/externallib.php`), legacy monolithic classes (`grades_external.php`), and Moodle 5+ structures (`lib/external/externallib.php`).
- 🛡️ **Headless Mock Runtime:** Fully isolated PHP execution environment that mocks globals (`$CFG`, `$DB`, `$PAGE`, `$USER`), normalizes syntax differences, and uses JIT autoloading to resolve classes without requiring database connections.
- 📦 **Strongly-Typed Contracts:** Emits strongly typed AST schema trees (`ObjectSchemaNode`, `ArraySchemaNode`, `ValueSchemaNode`) with Moodle `PARAM_*` type descriptions.

---

## Installation

```bash
npm install @didactika/moodle-client-schemas
```

*Requirements:* Node.js `>= 20.0.0` and PHP CLI `>= 7.4` on the host system.

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
        concurrency: 16
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
| `concurrency` | `number` | `8` | Maximum number of concurrent PHP introspection sub-processes. |

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
    WebServiceSchemaKind
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
    /** Moodle parameter type constant (e.g. 'PARAM_INT', 'PARAM_TEXT', 'PARAM_RAW') */
    type: string;
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

| Field | Type | Description |
|---|---|---|
| `kind` | `'parameters' \| 'object' \| 'array' \| 'value'` | Structural classification of the node in the schema tree. |
| `description` | `string` | **Human-readable parameter description** written by the Moodle core/plugin author (maps to `$this->desc` in PHP). |
| `type` | `string` | Moodle sanitation constant (e.g., `PARAM_INT`, `PARAM_TEXT`, `PARAM_RAW`, `PARAM_BOOL`, `PARAM_EMAIL`, `PARAM_USERNAME`, `PARAM_ALPHANUM`). |
| `required` | `number` | Requirement rule defined by Moodle constants:<br>• `1` (`VALUE_REQUIRED`): Mandatory parameter.<br>• `2` (`VALUE_OPTIONAL`): Optional parameter.<br>• `0` (`VALUE_DEFAULT`): Parameter has a fallback default value. |
| `default` | `unknown` | Fallback value used by Moodle when an optional parameter is omitted by the caller. |
| `allownull` | `boolean` | Indicates whether `null` is explicitly permitted (`NULL_ALLOWED = true`, `NULL_NOT_ALLOWED = false`). |
| `keys` | `Record<string, WebServiceReturnSchema>` | Dictionary mapping property names to their child schemas for `object` and `parameters` nodes. |
| `content` | `WebServiceReturnSchema` | Definition of the element schema for homogeneous `array` nodes. |

#### Concrete Schema Example

Here is how an extracted `core_user_create_users` schema looks in runtime memory:

```json
{
  "name": "core_user_create_users",
  "description": "Create users in Moodle",
  "parameters": {
    "kind": "parameters",
    "keys": {
      "users": {
        "kind": "array",
        "description": "List of user objects to create",
        "required": 1,
        "content": {
          "kind": "object",
          "keys": {
            "username": {
              "kind": "value",
              "type": "PARAM_USERNAME",
              "description": "Username in lowercase",
              "required": 1
            },
            "password": {
              "kind": "value",
              "type": "PARAM_RAW",
              "description": "Plain text password",
              "required": 1
            },
            "email": {
              "kind": "value",
              "type": "PARAM_EMAIL",
              "description": "User valid email address",
              "required": 1
            }
          }
        }
      }
    }
  },
  "returns": {
    "kind": "array",
    "description": "List of created user identifiers",
    "content": {
      "kind": "object",
      "keys": {
        "id": {
          "kind": "value",
          "type": "PARAM_INT",
          "description": "Created user ID"
        },
        "username": {
          "kind": "value",
          "type": "PARAM_USERNAME",
          "description": "Username"
        }
      }
    }
  }
}
```

---

## Usage Examples

### 1. Extract All Web Services in the Repository

```typescript
import { extractWebservice } from '@didactika/moodle-client-schemas';

const schemas = await extractWebservice({
    moodlePath: '/var/www/moodle'
});

console.log(`Successfully extracted ${schemas.length} webservices.`);
```

### 2. Filter by Component Prefix with Wildcards

```typescript
const schemas = await extractWebservice({
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
const schemas = await extractWebservice({
    moodlePath: './moodle',
    services: [
        'core_user_get_users',
        'core_enrol_get_users_courses',
        'mod_forum_get_forum_access_information'
    ]
});
```

### 4. High-Throughput Parallel Processing

For large Moodle installations with 700+ webservices, set `concurrency` to utilize available CPU cores:

```typescript
const schemas = await extractWebservice({
    moodlePath: '/var/www/moodle',
    services: ['*'],
    concurrency: 16 // Uses 16 parallel PHP introspection workers
});
```

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

1. **Scanner:** Recursively discovers all `**/db/services.php` entry points, ignoring irrelevant folders (`node_modules`, `vendor`, `.git`, `cache`).
2. **In-Memory AST Parser:** Parses PHP files into AST representations using `php-parser` and caches nodes in RAM during the extraction lifecycle.
3. **Service Extractor:** Analyzes AST arrays to extract declared `$functions` configurations, normalizing modern Moodle 4.x/5.x rules (such as optional `methodname` defaulting to `'execute'`).
4. **Class Resolver:** Multi-tier path discovery:
   - **Explicit Classpath:** Directly resolves explicit `classpath` attributes relative to repository root.
   - **Modern PSR-4:** Resolves component namespaces using `lib/components.json` or `core_component` class mapping.
   - **Subplugin Hierarchy:** Dynamically discovers subplugin directories from `db/subplugins.json`.
   - **Core Subsystems:** Locates subsystem handlers in `lib/classes/*_external.php` or modern `lib/external/externallib.php`.
5. **Sandboxed PHP Introspector:** Spawns worker sub-processes via `p-limit` executing `cli-executor.php` against `headless-bootstrap.php`, invoking `classname::methodname_parameters()` and `classname::methodname_returns()`.

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

## Development & Verification

The codebase strictly enforces ESLint rules, TypeScript strict typing, and a maximum cyclomatic complexity of $\le 3$ per function:

```bash
npm run build      # Compile dual CJS/ESM distribution and TypeScript declarations (.d.ts)
npm run lint       # Validate code style, complexity <= 3, and zero unused variables
npm run typecheck  # Validate types with tsc --noEmit
npm test           # Run full verification (lint + typecheck + 23 unit & integration test suites)
```

---

## Contributors

Contributions, issues, and feature requests are welcome!

* **Eduardo Cubias** ([@Eduardo-Cubiasss](https://github.com/Eduardo-Cubiasss))
* **Hector Arrechea** ([@hectorlazaroarrechea](https://github.com/hectorlazaroarrechea))

---

## License

[MIT](LICENSE) © [Didactika - Educational Technology Open Source](https://github.com/didactika)
