# 09: typed methods on your own client

By default `generateWebserviceFiles` only writes types. This example turns on
`augmentClient: true` so that a client of your own gets one typed method per service,
`client.core_course_get_courses(params)`, and shows what that client must provide for the
methods to work when the program runs.

| File | Role |
| --- | --- |
| [my-client.ts](my-client.ts) | a ~70-line Moodle REST client that fulfils the barrel's contract |
| [generate.ts](generate.ts) | extracts two services and writes `moodle-types/` with `importSource: '../my-client'` and `augmentClient: true` |
| [usage.ts](usage.ts) | calls `moodle.core_webservice_get_site_info()` and `moodle.core_course_get_courses({...})`, fully typed |

## Running it

```console
export MOODLE_PATH="$HOME/src/moodle"
npx tsx examples/09-custom-client/generate.ts

export MOODLE_URL="https://moodle.example.org"
export MOODLE_TOKEN="aeb315e6dd3affc18352fe46124cdd48"
npx tsx examples/09-custom-client/usage.ts
```

`usage.ts` does not compile until `generate.ts` has run, because it imports
`./moodle-types`, which is git-ignored.

## What happens, step by step

### 1. `generate.ts` writes the files

```text
09-custom-client/
├── my-client.ts
├── generate.ts
├── usage.ts
└── moodle-types/                                  <- targetDir, created
    ├── index.d.ts                                 <- barrel
    └── core/
        ├── course/get_courses.webservice.d.ts     <- CoreCourseGetCoursesParams / Returns
        └── webservice/get_site_info.webservice.d.ts
```

Running it again deletes and rewrites only these generated files.

### 2. The barrel points at your module

```ts
import type { MoodleResponse, HttpMethod } from "../my-client";   // (a) importSource
export * from './core/course/get_courses.webservice';
export * from './core/webservice/get_site_info.webservice';

import type { CoreCourseGetCoursesParams, CoreCourseGetCoursesReturns } from './core/course/get_courses.webservice';
import type { CoreWebserviceGetSiteInfoParams, CoreWebserviceGetSiteInfoReturns } from './core/webservice/get_site_info.webservice';

export interface GeneratedMoodleServices {
    core_course_get_courses(params?: CoreCourseGetCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetCoursesReturns>>;
    core_webservice_get_site_info(params?: CoreWebserviceGetSiteInfoParams, method?: HttpMethod): Promise<MoodleResponse<CoreWebserviceGetSiteInfoReturns>>;
}

declare module "../my-client" {                                    // (b) only with augmentClient: true
    interface MoodleClient extends GeneratedMoodleServices {}
}
```

- **(a)** `importSource` is written verbatim and resolved from `moodle-types/index.d.ts`,
  so `'../my-client'` means `09-custom-client/my-client.ts`. If your client is published
  as a package, use its name instead, e.g. `'@acme/moodle'`.
- **(b)** Without `augmentClient: true` this block is not emitted and the barrel ends at
  `GeneratedMoodleServices`. With it, TypeScript merges `GeneratedMoodleServices` into
  your `MoodleClient` class and knows that `moodle.core_course_get_courses` exists, and
  what it takes and returns.

### 3. The contract `my-client.ts` fulfils

| Export | Why it is needed | If it is missing |
| --- | --- | --- |
| `type HttpMethod` | used for the optional `method` argument | `TS2305`/`TS2459` in `index.d.ts` |
| `interface MoodleResponse<T>` | wraps every return type | `TS2305`/`TS2459` in `index.d.ts` |
| `class MoodleClient` | the target of the augmentation | **no error at all**: TypeScript creates an empty, unrelated `MoodleClient` and your class gets no methods |
| a function for every service name **at runtime** | the barrel adds types, not code | compiles, then `TypeError: moodle.x is not a function` |

`my-client.ts` covers the last row with a `Proxy`. Any property the class does not define
becomes `(params, method) => this.call(name, params, method)`, so every generated service
works without generated runtime code.

### 4. `usage.ts` gets typed calls

```ts
const { data: courses } = await moodle.core_course_get_courses({ options: { ids: [1] } });
//            ^? CoreCourseGetCoursesReturns

moodle.core_course_get_courses({ options: { ids: ["1"] } });
// error TS2322: Type 'string' is not assignable to type 'number'.

moodle.core_course_get_course({});
// error TS2551: Property 'core_course_get_course' does not exist on type 'MoodleClient'.
//               Did you mean 'core_course_get_courses'?
```

Both errors above were produced by running `tsc` on this example against Moodle 5.3.

## When not to use `augmentClient`

If your client exposes services some other way (for example under a namespace,
`client.webservice.core_course_get_courses()`, or only through a generic
`call(name, params)`), leave `augmentClient` off. The calls would type-check, then fail at
runtime with `TypeError: ... is not a function`. Use the generated types directly instead,
as in [05-generating-typescript.ts](../05-generating-typescript.ts).
