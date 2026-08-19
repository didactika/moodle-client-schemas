# AGENTS.md — working context for this repository

Orientation for coding agents and new contributors. Not published to npm.

## What this is

`@didactika/moodle-client-schemas` is a TypeScript library and AST-based engine designed to extract, standardize, and maintain JSON Schemas and OpenAPI contracts for Moodle LMS Web Services across versions without running PHP, Apache, or a database.

- **Current focus:** Static extraction, AST caching, and automated version synchronization from Moodle source repositories.
- **Future roadmap (Declared):** Dynamic client SDK enabling users to provide a remote Moodle instance URL and token to extract, discover, or validate instance-specific schemas on demand. *(Architecture is declared for this extension point, but no runtime implementation is active yet).*

## Hard rules

1. **Cyclomatic complexity $\le$ 3.** Every function, method, and helper must strictly maintain a cyclomatic complexity of 3 or less (enforced by ESLint `complexity`). Break down logic into small, single-purpose functions.
2. **Zero unused code.** All variables, arguments, and imports must be used. Unused arguments must be explicitly prefixed with an underscore `_` (enforced by `@typescript-eslint/no-unused-vars` and `noUnusedLocals`).
3. **TDD Flow-First approach.** Never develop isolated classes in a vacuum. Follow the flow cycle:
   ```
   FLOW -> Integration Test -> Missing Component -> Unit Tests -> Implementation -> Connect to Flow
   ```
4. **AST Cache Purity & Content-Hashing.** Cache files (`.ast_cache/<hash>.json`) must contain only the raw AST with zero injected metadata or timestamps. Cache keys are computed via MD5 content-hashing of plain PHP source code. Cache lifetime is tracked through logical epochs in `registry.json` with an epoch-based cleaner for rollback tolerance.
5. **The Dependency Graph precedes deep AST conversion.** Build the reachability graph of classes, exporters, and helpers before attempting deep AST parsing to prune unused repository files.
6. **Object-Oriented & Single Responsibility.** Each phase (Scanner, Parser, ServiceExtractor, ClassResolver, DependencyGraph, SchemaExtractor, Cache, Orchestrator) lives in its own module with clean, transport-agnostic interfaces.
7. **Every change ships with tests.** Always provide unit tests for isolated classes and integration/flow tests for the pipeline.

## Pipeline

```
Moodle Repository → Scanner (**/db/services.php) → Parser (php-parser AST)
    → ServiceExtractor ($functions) → ClassResolver (PSR-4 / classpath / legacy)
    → DependencyGraph (Helpers, Exporters) → SchemaExtractor (parameters / returns)
    → AST Cache / Epoch Cleaner → Normalized JSON Schema / OpenAPI 3.0
```

## Layout

```
src/
├── scanner/              Scans repository locating **/db/services.php entry points
├── parser/               Converts PHP source code to AST representation (php-parser)
├── service-extractor/    Extracts $functions definitions from services.php AST
├── resolver/             Resolves class file paths via classpath, PSR-4, and legacy patterns
├── graph/                Constructs reachability dependency graph
├── extractor/            Extracts parameters and returns AST into intermediate SchemaNode
├── cache/                Content-hashed (MD5) AST cache and epoch cleaner
├── orchestrator/         Coordinates multi-phase extraction and version processing
├── version-sync/         Synchronizes and detects remote/local Moodle version tags
├── client/               (Future reserved) Dynamic Moodle URL/instance schema client
└── types/                TypeScript declarations, interfaces, and contracts
test/
├── unit/                 Isolated unit tests for individual modules
└── integration/          Pipeline and flow integration tests
```

## Extension points

| To add... | Do this |
|---|---|
| A class resolution strategy | Implement a strategy in `resolver/` and register it in `ClassResolver`. |
| A schema output format | Implement a serializer in `output/` (JSON Schema, OpenAPI 3.0, TypeScript d.ts). |
| A remote instance client *(Future)* | Extend `client/` implementing dynamic schema discovery against live Moodle endpoints. |

## Commands

```bash
npm run build              # Compile dual CJS/ESM package and d.ts types via tsup
npm run lint               # Validate code style, cyclomatic complexity <= 3, and unused vars
npm run lint:fix           # Automatically fix lint issues and enforce curly braces
npm run typecheck          # Type check entire codebase with tsc --noEmit
npm run test:unit          # Run unit test suites
npm run test:integration   # Run integration and pipeline flow test suites
npm test                   # Run full verification: lint + typecheck + test
```

## Gotchas

- **Optional `methodname` in Moodle 4.x+:** In Moodle 4.0+, `$functions` entries in `services.php` may omit `methodname`. In such cases, default to `'execute'`.
- **ESM-only packages (`p-limit`, `yocto-queue`):** When running Jest in CommonJS mode, ensure `transformIgnorePatterns` allows `p-limit` and `yocto-queue` to be transformed by `ts-jest`.
- **Pure AST Cache:** Never write version strings or filesystem dates inside AST cache files; all metadata belongs in `.ast_cache/registry.json`.
- **Moodle Type Mapping:** `PARAM_*` constants and structures (`external_value`, `external_single_structure`, `external_multiple_structure`) must map to strict TypeScript primitives and JSON Schema nodes without running PHP code.
