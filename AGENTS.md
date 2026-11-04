# AGENTS.md — working context for this repository

Orientation for coding agents and contributors. Not published to npm.

## What this is

`@didactika/moodle-client-schemas` is a standalone TypeScript library and headless AST/introspection engine designed to extract and normalize JSON Schema parameter and return contracts for Moodle LMS Web Services across all versions (Moodle 2.0 to 5.x+) without running PHP web servers, Apache, or a database, and to emit strongly typed TypeScript client code and declaration files.

- **Primary role:** Pure computational schema extraction and code generation library. Receives a local `moodlePath` and optional service filter patterns, returns strongly-typed `WebServiceSchema[]` objects in memory, and provides emitters to output TypeScript client declarations and barrel modules (`generateWebserviceFiles`).
- **Independence:** The library has no awareness of external remote Moodle instances, download pipelines, or version matrix states. It is completely isolated and stateless.

## Hard rules

1. **Cyclomatic complexity $\le$ 3.** Every function, method, and helper must strictly maintain a cyclomatic complexity of 3 or less (enforced by ESLint `complexity`). Break down logic into small, single-purpose functions.
2. **Zero unused code.** All variables, arguments, and imports must be used. Unused arguments must be explicitly prefixed with an underscore `_` (enforced by `@typescript-eslint/no-unused-vars` and `noUnusedLocals`).
3. **TDD Flow-First approach.** Follow the flow cycle:
   ```
   FLOW -> Integration Test -> Missing Component -> Unit Tests -> Implementation -> Connect to Flow
   ```
4. **Never write to the Moodle codebase.** The extraction core treats `moodlePath` as read-only. Scratch data (PHP dataroot, and for Moodle < 4.0 a normalized copy of the codebase) lives in a per-run temporary directory created by `prepareExtractionRuntime()` and removed by `disposeExtractionRuntime()`. In-memory caches are keyed by Moodle root and released only when no other `extractWebservice` call is running. File generation occurs strictly within the caller-specified output directory, and only generated files are ever deleted there.
5. **No inline interfaces in adapters/classes.** All TypeScript interfaces, payload types, and schema models must live inside `src/webservice-extractor/interfaces/` or `src/generator/interfaces/`.
6. **Object-Oriented & Single Responsibility.** Each phase (Scanner, AST Parser, ServiceExtractor, ClassResolver, PHP Adapter, Code Emitter, Orchestrator) lives in its own module with clean, transport-agnostic interfaces.
7. **Every change ships with tests.** Always provide unit tests for isolated classes and integration/flow tests for the pipeline.
8. **Strictly ZERO emojis.** No emojis in code, comments, CLI output, or documentation.
9. **Never report guessed signatures as success.** The PHP introspector must use the exact `{methodname}_parameters()` / `{methodname}_returns()` pair of the real class; missing classes or methods, exceptions, and dependencies on JIT-synthesized structures are reported as errors.

## Library Public API (`src/index.ts`)

### Extractor API

```typescript
export async function extractWebservice(
    options: ExtractWebserviceOptions
): Promise<ExtractWebserviceResult>;
```

- **`ExtractWebserviceOptions`**: Configuration containing `moodlePath: string`, `services?: string[]`, optional `concurrency?: number` (isolated fallback processes), `timeout?: number` (per-service inactivity, ms) and `progress?: ProgressOption`.
- **`ExtractWebserviceResult`**: Combined output contract `{ schemas: WebServiceSchema[], errors: WebServiceExtractionError[] }`.
- **`WebServiceExtractionError`**: Structured diagnostic `{ serviceName?, classname?, classFile?, code?, message, cause? }`.
- **`WebServiceErrorCode`**: Standardized error code union `'INVALID_MOODLE_PATH' | 'PHP_NOT_FOUND' | 'PHP_VERSION_UNSUPPORTED' | 'SERVICE_NOT_FOUND' | 'CLASS_NOT_FOUND' | 'INTROSPECTION_FAILED' | 'PERMISSION_DENIED'`.
- **`WebServiceSchema`**: Output contract containing `name: string`, `description?: string`, `parameters: WebServiceParametersSchema | null`, `returns: WebServiceReturnSchema | null`.
- **`WebServiceParametersSchema`**, **`WebServiceReturnSchema`**, **`WebServiceObjectSchema`**, **`WebServiceArraySchema`**, **`WebServiceValueSchema`**, **`WebServiceBaseSchema`**, **`WebServiceSchemaKind`**, **`PrimitiveType`**.

### Code Generator & Emitters

```typescript
export async function generateWebserviceFiles(
    schemas: WebServiceSchema[],
    targetDir: string,
    options?: GenerateWebserviceFilesOptions
): Promise<void>;

export function emitWebserviceCode(schema: WebServiceSchema): string;
export function emitBarrelCode(metadataList: GeneratedServiceMetadata[], options?: BarrelEmitterOptions): string;
// GenerateWebserviceFilesOptions = BarrelEmitterOptions = { importSource?: string; augmentClient?: boolean }
export function resolveWebserviceFilePath(serviceName: string): string;
export function toFullPascalCase(str: string): string;
export function hasRequiredParameters(schema: WebServiceSchema): boolean;
```

### Diagnostic Errors & Formatting

```typescript
export class MoodleGeneratorError extends Error { ... }
export function formatError(error: unknown): string;
export function mapExtractionErrorToGeneratorError(err: { code?: string; message: string; serviceName?: string; classname?: string }, moodlePath?: string): MoodleGeneratorError;
```

### Transport Types

Not defined here. `HttpMethod` and `MoodleResponse<T>` are imported by the generated barrel from the module given in `importSource` (default `@didactika/moodle-client`), which owns them.

## Pipeline Architecture

```
Moodle Repository Path
    │
    ▼
Scanner (**/db/services.php) ──► In-Memory AST Parser (php-parser)
    │
    ▼
ServiceExtractor ($functions) ──► Service Filter (['*'], ['core_*'])
    │
    ▼
ClassResolver (PSR-4 / Classpath / Frankenstyle / Subplugins / Core)
    │
    ▼
PHP Sandboxed Introspector (cli-executor.php + JIT Autoloader + Headless Bootstrap)
    │
    ▼
Typed WebServiceSchema[] (Pure RAM Output)
    │
    ▼ (Optional)
Code Generator Pipeline (generateWebserviceFiles ──► .webservice.ts/.d.ts + index.ts)
```

## Directory Structure

```
src/
├── index.ts                      Main library entrypoint (exports extraction, generation, and types)
├── generator/                    TypeScript code emitter and file generation pipeline
│   ├── emitter/
│   │   ├── barrel-emitter.ts     Emits central index.d.ts barrel; MoodleClient augmentation only with augmentClient
│   │   ├── jsdoc-utils.ts        Escapes JSDoc text and quotes non-identifier property names
│   │   └── ts-code-emitter.ts    Emits typed Params/Returns declarations for one webservice
│   ├── errors/
│   │   └── generator-error.ts    MoodleGeneratorError class and diagnostic CLI formatters
│   ├── interfaces/
│   │   └── generator.interfaces.ts
│   ├── resolver/
│   │   └── path-resolver.ts      Resolves output file paths and PascalCase naming
│   └── generator-pipeline.ts     generateWebserviceFiles orchestrator and selective cleanup
├── php-adapter/                  Isolated PHP reflection sandbox and mock environment
│   ├── autoloader/
│   │   └── jit-autoloader.php    JIT classloader synthesizing missing Moodle classes, with protect/fallback tracking
│   ├── bootstrap/
│   │   ├── headless-bootstrap.php Mocks $CFG, $DB, $PAGE, $USER and defines dummy globals
│   │   └── syntax-normalizer.php Normalizes PHP 7.x/8.x syntax compatibility
│   ├── introspection/
│   │   └── signature-introspector.php Strict {method}_parameters/_returns introspection and IntrospectionException codes
│   ├── batch-cli-executor.php    Streaming NDJSON batch introspection executor
│   ├── cli-executor.php          Single-service fallback executor emitting JSON to stdout
│   └── normalize-cli.php         Rewrites the disposable copy of Moodle < 4.0 for PHP 8
├── types/
│   └── moodle-client.d.ts        Ambient forward declaration of @didactika/moodle-client for declaration merging
└── webservice-extractor/         AST parser, scanner, and headless introspection
    ├── index.ts                  Core orchestrator implementing extractWebservice
    ├── adapter/
    │   ├── batch-signature-extractor.ts Batch executor with idle watchdog and isolated fallback
    │   ├── extraction-runtime.ts Per-run temporary dataroot and legacy codebase copy
    │   ├── php-runtime.ts        PHP detection and version validation
    │   ├── php-signature-extractor.ts Single-service child process executor
    │   ├── script-locator.ts     Locates PHP adapter scripts across source and dist builds
    │   └── signature-extraction-error.ts Error carrying a WebServiceErrorCode
    ├── cache/
    │   └── ast-manager.ts        In-memory execution cache with clearAstCache()
    ├── extractor/
    │   └── service-extractor.ts  Builds MoodleService entries from $functions
    ├── interfaces/
    │   ├── ast/                  AST parser and tracked-array interfaces
    │   ├── batch.interfaces.ts
    │   ├── component-resolver.interfaces.ts
    │   ├── runtime.interfaces.ts
    │   ├── scanner.interfaces.ts
    │   ├── schema-extractor.interfaces.ts
    │   ├── service-extractor.interfaces.ts
    │   └── signature.interfaces.ts
    ├── parser/
    │   ├── array-variable-collector.ts Statically replays $functions assignments (=, +=, merge, unset, if)
    │   ├── ast-parser.ts         PHP AST parser using php-parser
    │   └── ast-utils.ts          AST node navigation and expression evaluation helpers
    ├── resolver/
    │   ├── class-resolver.ts     Locates class files on disk across PSR-4 and legacy patterns
    │   ├── component-resolver.ts Resolves component directories across Moodle 2.x - 5.x
    │   ├── version-resolver.ts   Detects Moodle release version from version.php
    │   └── component/
    │       ├── class-component-resolver.ts
    │       ├── json-component-resolver.ts
    │       ├── legacy-moodlelib-resolver.ts
    │       ├── subcomponent-resolver.ts
    │       └── subsystem-resolver.ts
    ├── scanner/
    │   └── scanner.ts            Symlink-aware recursive finder for **/db/services.php
    ├── types/
    │   └── component-resolver.types.ts
    └── utils/
        ├── concurrency.ts        Bounded concurrency helper (replaces p-limit)
        ├── console-progress.ts   Terminal progress reporting helpers
        ├── description-utils.ts  HTML description sanitization utilities
        ├── error-code-utils.ts   resolveErrorCode: maps errors to WebServiceErrorCode without reading messages
        ├── type-utils.ts         PARAM_* constant resolution to primitive types
        └── version-utils.ts      Semver normalization and version comparison helpers
docs/
├── api-reference.md              Public API, schema format and generated output
└── errors.md                     WebServiceErrorCode and MoodleGeneratorError catalogue
examples/                         Runnable usage scripts (import the package by name; not type-checked by npm run typecheck)
└── 09-custom-client/             generateWebserviceFiles with importSource pointing at a custom client
scripts/
└── test-moodle-5.3.mjs           Full extraction against a local Moodle 5.3 checkout (npm run extract:moodle-5.3)
test/
├── fixtures/                     Static fixtures for mock Moodle versions and services
├── integration/                  Pipeline integration tests (Live PHP adapter, component flows, E2E)
└── unit/                         Unit test suites for isolated classes, generators, and helpers
```

## Commands

```bash
npm run build              # Compile dual CJS/ESM package and .d.ts types via tsup
npm run lint               # Validate code style, cyclomatic complexity <= 3, and unused vars
npm run lint:fix           # Automatically fix lint issues and enforce curly braces
npm run typecheck          # Type check entire codebase with tsc --noEmit
npm run format             # Format source files with Prettier
npm run test:unit          # Run unit test suites
npm run test:coverage      # Run test suites with coverage report
npm test                   # Run full verification (43 unit & integration test suites, 287 tests)
```

## Gotchas & Rules

- **Optional `methodname` in Moodle 4.x+:** In Moodle 4.0+, `$functions` entries in `services.php` may omit `methodname`. In such cases, default to `'execute'`.
- **`core_external` in Moodle 5.x+:** Located at `lib/external/externallib.php` instead of `lib/externallib.php`. Handled in `class-resolver.ts`.
- **Zero I/O disk pollution during extraction:** Never write output JSON files or AST cache to disk inside the extractor core.
- **Complexity $\le 3$:** Always extract compound conditional checks into separate helper functions to strictly adhere to cyclomatic complexity $\le 3$.
- **PHP 8.0+ runtime:** The sandbox scripts rely on PHP 8 functions (`str_starts_with`, `str_contains`, ...). Legacy Moodle (< 4.0) runs on PHP 8 thanks to `normalize-cli.php`, which only ever rewrites the disposable copy.
- **Shared fixture is read-only:** suites run in parallel Jest workers, so a test that needs to plant or modify files must `fs.cpSync` `test/fixtures/mock_moodle` into an `os.tmpdir()` copy (see `batch-chaos-isolation.test.ts`).
- **Error codes are structured:** PHP reports `errorCode` (`IntrospectionException::codeOf`) and TypeScript maps errors via `resolveErrorCode` (`utils/error-code-utils.ts`). Never classify failures by matching message text.
- **Keep docs in sync:** a change to the public API or to an error code updates `docs/api-reference.md` / `docs/errors.md`, and the affected script in `examples/`.
- **Generated barrels add types, not methods:** the `declare module "<importSource>"` block is opt-in (`augmentClient`, default `false`) because it makes `client.<service>()` type-check whether or not the client implements it at runtime. This library stays independent of any client: do not add consumer-specific barrel shapes or post-processing here. Keep `docs/api-reference.md` and `examples/09-custom-client` in sync with any change to the barrel shape.
- **No test hooks in production code:** tests that bypass PHP mock `adapter/batch-signature-extractor` (`extractBatchSignatures`) instead of relying on runtime mock detection.
