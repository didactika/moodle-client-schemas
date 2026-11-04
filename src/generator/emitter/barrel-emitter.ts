import { toFullPascalCase } from '../resolver/path-resolver';
import { escapeJsDocText } from './jsdoc-utils';
import { BarrelEmitterOptions, GeneratedServiceMetadata } from '../interfaces/generator.interfaces';

const DEFAULT_IMPORT_SOURCE = '@didactika/moodle-client';

/**
 * Formats a multi-line JSDoc block for a generated webservice method.
 *
 * @param {GeneratedServiceMetadata} service - Service metadata
 * @param {string} pascalName - PascalCase name of the webservice
 * @returns {string[]} Array of lines for the JSDoc comment
 */
function formatMethodJsDoc(service: GeneratedServiceMetadata, pascalName: string): string[] {
    const docLines: string[] = [];
    docLines.push('    /**');

    if (service.description && service.description.trim().length > 0) {
        const descLines = service.description.trim().split('\n');
        for (const dl of descLines) {
            docLines.push(`     * ${escapeJsDocText(dl.trim())}`);
        }
        docLines.push('     *');
    }

    const paramTag = service.hasRequiredParams
        ? `     * @param {${pascalName}Params} params`
        : `     * @param {${pascalName}Params} [params]`;
    const paramDesc = service.paramsDescription && service.paramsDescription.trim().length > 0
        ? ` - ${escapeJsDocText(service.paramsDescription.replace(/\n/g, ' ').trim())}`
        : '';
    docLines.push(`${paramTag}${paramDesc}`);

    docLines.push("     * @param {HttpMethod} [method] - Optional HTTP method override (defaults to the client's method)");

    const returnDesc = service.returnsDescription && service.returnsDescription.trim().length > 0
        ? ` - ${escapeJsDocText(service.returnsDescription.replace(/\n/g, ' ').trim())}`
        : '';
    docLines.push(`     * @returns {Promise<MoodleResponse<${pascalName}Returns>>}${returnDesc}`);

    docLines.push('     */');
    return docLines;
}

/**
 * Formats the module augmentation that attaches every generated service to MoodleClient.
 *
 * @param {string} importSource - Module whose MoodleClient is augmented
 * @returns {string[]} Lines of the declare module block
 */
function formatClientAugmentation(importSource: string): string[] {
    return [
        `declare module "${importSource}" {`,
        '    interface MoodleClient extends GeneratedMoodleServices {}',
        '}',
        ''
    ];
}

/**
 * Emits central barrel file (index.d.ts) that re-exports all generated webservice types and
 * declares GeneratedMoodleServices. Only when `augmentClient` is true does it also merge those
 * methods into the MoodleClient of `importSource` via TypeScript declaration merging.
 *
 * @param {GeneratedServiceMetadata[]} services - List of all emitted webservices metadata
 * @param {BarrelEmitterOptions} [options] - Optional configuration for imports
 * @returns {string} Source code for index.ts
 */
export function emitBarrelCode(
    services: GeneratedServiceMetadata[],
    options?: BarrelEmitterOptions
): string {
    const importSource = options?.importSource ?? DEFAULT_IMPORT_SOURCE;
    const lines: string[] = [];

    lines.push(`import type { MoodleResponse, HttpMethod } from "${importSource}";`);

    // 1. Re-export all webservice files
    for (const service of services) {
        lines.push(`export * from '${service.relativeImportPath}';`);
    }

    lines.push('');

    // 2. Import types for GeneratedMoodleServices interface
    for (const service of services) {
        const pascal = toFullPascalCase(service.name);
        lines.push(
            `import type { ${pascal}Params, ${pascal}Returns } from '${service.relativeImportPath}';`
        );
    }

    lines.push('');

    // 3. GeneratedMoodleServices interface
    lines.push('/**');
    lines.push(' * Typed Moodle Web Service operations available on MoodleClient.');
    lines.push(' */');
    lines.push('export interface GeneratedMoodleServices {');

    for (const service of services) {
        const pascal = toFullPascalCase(service.name);
        lines.push(...formatMethodJsDoc(service, pascal));
        const optParam = service.hasRequiredParams ? '' : '?';
        lines.push(
            `    ${service.name}(params${optParam}: ${pascal}Params, method?: HttpMethod): Promise<MoodleResponse<${pascal}Returns>>;`
        );
    }

    lines.push('}');
    lines.push('');

    // 4. Opt-in declaration merging with MoodleClient
    if (options?.augmentClient === true) {
        lines.push(...formatClientAugmentation(importSource));
    }

    return lines.join('\n');
}
