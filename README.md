# moodle-client-schemas

<!-- Package -->
[![npm version](https://img.shields.io/npm/v/@didactika/moodle-client-schemas.svg?logo=npm)](https://www.npmjs.com/package/@didactika/moodle-client-schemas)
[![CI](https://img.shields.io/github/actions/workflow/status/didactika/moodle-client-schemas/ci.yml?branch=main&logo=github&label=CI)](https://github.com/didactika/moodle-client-schemas/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<!-- Runtime & Ecosystem -->
[![Node](https://img.shields.io/badge/Node-20%20%7C%2022%20%7C%2024-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/en/about/previous-releases)
[![Moodle](https://img.shields.io/badge/Moodle-2.5%20%E2%86%92%204.5+-F98012?logo=moodle&logoColor=white)](https://moodle.org/)
[![Spec](https://img.shields.io/badge/Spec-JSON%20Schema%20%C2%B7%20OpenAPI%203.0-005571)](#schema-format)

> Static AST-based extractor and typed contract catalog for **Moodle LMS Web Services**, requiring zero PHP runtime, Apache server, or database setup.

```ts
import { MoodleSchemaSync } from '@didactika/moodle-client-schemas';

const syncer = new MoodleSchemaSync();
await syncer.syncVersions();
```

---

## Table of contents

- [Overview](#overview)
- [Key features](#key-features)
- [Compatibility](#compatibility)
- [Installation](#installation)
- [Engine architecture](#engine-architecture)
  - [Extraction pipeline](#extraction-pipeline)
  - [System modules](#system-modules)
- [Static CDN consumption](#static-cdn-consumption)
- [Schema format](#schema-format)
- [Persistent AST cache (Content-Hashing)](#persistent-ast-cache-content-hashing)
- [Development commands](#development-commands)
- [Roadmap](#roadmap)
- [Contributors](#contributors)
- [License](#license)

---

## Overview

Moodle includes hundreds of Web Services scattered across its core (`core_*`) and dozens of submodules and plugins (`mod_*`, `enrol_*`, `block_*`, etc.). However, it lacks native OpenAPI specifications or static, easily queryable per-version contracts.

**`@didactika/moodle-client-schemas`** solves this by statically analyzing PHP source code using Abstract Syntax Trees (AST) in Node.js, producing formal **JSON Schema** and **OpenAPI 3.0** contracts ready to:
* Generate TypeScript SDKs and strict types without un-typed API calls or `any` fallbacks.
* Validate request parameters and responses before hitting the LMS server.
* Power interactive API documentation and endpoint explorers across Moodle releases.

---

## Key features

- 🌳 **Pure static AST analysis** — uses `php-parser` in Node.js to inspect PHP source code as plain text, eliminating the need to install or run Moodle.
- ⚡ **Pre-AST dependency graph** — builds the reachable class and exporter graph before deep AST conversion to prune unneeded repository files.
- 📦 **Content-hashed (MD5) AST cache** — perfect deduplication and rollback tolerance across versions managed via logical epochs (`registry.json`).
- 🧩 **Exporter & inheritance support** — inspects `Exporter::get_read_structure()`, resolving `define_properties()`, `define_other_properties()`, and base class inheritance.
- 🔍 **Multi-strategy class resolver** — locates class files via explicit `classpath`, PSR-4 / Frankenstyle namespaces, and legacy Moodle patterns (`externallib.php`).
- 🏷️ **Strict type mapping** — translates Moodle constants (`PARAM_INT`, `PARAM_TEXT`, `VALUE_REQUIRED`, `external_single_structure`, etc.) to standard native types.
- 🌐 **Serverless distribution** — prebuilt schemas ready for instant CDN consumption via jsDelivr or GitHub Pages.

---

## Compatibility

| Environment | Supported versions | Notes |
|---|---|---|
| **Node.js** | `20.x` · `22.x` · `24.x` | Active LTS releases |
| **Moodle LMS** | `2.5` $\rightarrow$ `4.5+` | Legacy and modern Web Service structures |
| **TypeScript** | `5.x` | Dual CJS + ESM + `.d.ts` builds via `tsup` |

---

## Installation

```bash
npm install @didactika/moodle-client-schemas
```

---

## Engine architecture

### Extraction pipeline

```text
                     MOODLE SOURCE
                          │
                          ▼
                 **/db/services.php
                          │
                          ▼
                   Directed Scanner
                          │
                          ▼
              AST Parser (php-parser) ◄───► Content-Hash Cache (MD5)
                          │
                          ▼
                 Service Extractor ($functions)
                          │
                          ▼
            Class Resolver (Classpath | PSR-4 | Legacy)
                          │
                          ▼
                  Dependency Graph ──► Repository Pruning (KEEP SET)
                          │
                          ▼
                  Schema Extractor
                   ├── Direct Schema (external_single_structure / external_value)
                   └── Exporter Extractor (get_read_structure -> define_properties)
                          │
                          ▼
             JSON Schema / OpenAPI 3.0 Generator
```

### System modules

| Module | Responsibility |
|---|---|
| **Scanner** (`src/scanner/`) | Discovers `**/db/services.php` entry points, ignoring `vendor/`, `node_modules/`, and `.git/`. Returns `ServiceFile { path, component }`. |
| **Parser** (`src/parser/`) | Converts PHP source files to AST on demand to minimize memory overhead. |
| **Service Extractor** (`src/service-extractor/`) | Parses `$functions` arrays from `services.php` (`name`, `classname`, `methodname` with fallback to `'execute'`, `description`). |
| **Class Resolver** (`src/resolver/`) | Resolves physical file paths using explicit `classpath`, PSR-4 namespaces, or `externallib.php`. |
| **Dependency Graph** (`src/graph/`) | Tracks reachable files (`service`, `external`, `exporter`, `helper`, `include`) to safely prune unused files. |
| **Schema Extractor** (`src/extractor/`) | Extracts `_parameters()` and `_returns()` into an intermediate structured representation (`SchemaNode`). |
| **AST Cache** (`src/cache/`) | Stores MD5-hashed serialized ASTs and runs epoch-based garbage collection (`MAX_EPOCH_AGE`). |
| **Orchestrator** (`src/orchestrator/`) | Coordinates multi-phase execution, queues pending files, and outputs the final contract. |

---

## Static CDN consumption

Pre-extracted schemas are published statically and can be consumed directly by version:

```http
# Schema for Moodle 4.5
https://cdn.jsdelivr.net/gh/didactika/moodle-client-schemas@main/schemas/v/4.5.json

# Schema for Moodle 4.4
https://cdn.jsdelivr.net/gh/didactika/moodle-client-schemas@main/schemas/v/4.4.json
```

---

## Schema format

Each version file (`schemas/v/{version}.json`) contains structured Web Service definitions:

```json
[
  {
    "name": "core_user_create_users",
    "description": "Create one or more users in Moodle",
    "parameters": {
      "users": {
        "type": "array",
        "required": true,
        "description": "Users list",
        "items": {
          "type": "object",
          "properties": {
            "username": { "type": "string", "required": true },
            "password": { "type": "string", "required": true },
            "firstname": { "type": "string", "required": true },
            "lastname": { "type": "string", "required": true },
            "email": { "type": "string", "required": true },
            "auth": { "type": "string", "required": false, "default": "manual" }
          }
        }
      }
    },
    "returns": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "integer", "required": true, "description": "User ID" },
          "username": { "type": "string", "required": true, "description": "Username" }
        }
      }
    }
  }
]
```

---

## Persistent AST cache (Content-Hashing)

To accelerate multi-version runs and support code rollbacks (`git revert`), the engine uses a pure content-hash strategy:

1. **MD5 Content Hashing:** Cache keys are calculated strictly from the plain PHP file contents.
2. **Pure Data Files:** `.ast_cache/<hash>.json` files store pure serialized AST without injected metadata.
3. **Epoch Registry (`registry.json`):** A logical clock (`currentEpoch`) tracks when each hash was last accessed; an epoch cleaner removes entries exceeding `MAX_EPOCH_AGE`.

---

## Development commands

```bash
# Install dependencies
npm install

# Build dual CJS + ESM package with .d.ts declarations
npm run build

# Lint code and enforce complexity rules (<= 3)
npm run lint

# Auto-fix linting issues and enforce curly braces
npm run lint:fix

# Type check TypeScript codebase
npm run typecheck

# Run unit and integration tests
npm run test:unit
npm run test:integration

# Full verification (lint + typecheck + test)
npm test
```

---

## Roadmap

- [x] Static AST extractor for Core and Plugin Web Services.
- [x] Exporter support and class inheritance resolution.
- [x] Content-hashed AST cache with epoch-based cleaner.
- [ ] **Dynamic URL Client SDK (Planned):** Ability to instantiate a client with a remote Moodle instance URL and token (`new MoodleClient({ url, token })`) to extract, discover, and validate schemas for customized Moodle deployments.

---

## Contributors

Thanks to the contributors of this project:

* **Eduardo Cubias** ([@Eduardo-Cubiasss](https://github.com/Eduardo-Cubiasss))
* **Hector Arrechea** ([@hectorlazaroarrechea](https://github.com/hectorlazaroarrechea))

---

## License

This project is licensed under the [MIT](LICENSE) License — © [Didactika - Educational Technology Open Source](https://github.com/didactika).