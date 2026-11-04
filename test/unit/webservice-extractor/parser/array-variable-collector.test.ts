import { Engine } from 'php-parser';
import { collectArrayVariableEntries } from '../../../../src/webservice-extractor/parser/array-variable-collector';
import { extractEntryKey } from '../../../../src/webservice-extractor/parser/ast-utils';
import { extractServices } from '../../../../src/webservice-extractor/extractor/service-extractor';

const engine = new Engine({ parser: { suppressErrors: true }, ast: { withPositions: false } });

function keysOf(source: string): (string | null)[] {
    return collectArrayVariableEntries(engine.parseCode(source, ''), 'functions').map(extractEntryKey);
}

describe('Unit Test: array-variable-collector', () => {

    it('reads a single assignment', () => {
        expect(keysOf("<?php $functions = ['a' => [], 'b' => []];")).toEqual(['a', 'b']);
    });

    it('keeps services added through element assignments after the initial array', () => {
        expect(keysOf("<?php $functions = [];\n$functions['a'] = [];\n$functions['b'] = [];")).toEqual(['a', 'b']);
    });

    it('lets a later reassignment replace earlier services', () => {
        expect(keysOf("<?php $functions = ['a' => []];\n$functions = ['b' => []];")).toEqual(['b']);
    });

    it('applies += with PHP union semantics (existing keys win)', () => {
        const source = "<?php $functions = ['a' => ['classname' => 'first']];\n$functions += ['a' => ['classname' => 'second'], 'b' => []];";
        const entries = collectArrayVariableEntries(engine.parseCode(source, ''), 'functions');
        expect(entries.map(extractEntryKey)).toEqual(['a', 'b']);
        expect(extractServices(engine.parseCode(source, ''))[0].classname).toBe('first');
    });

    it('applies array_merge and array_replace with later keys overriding', () => {
        const source = "<?php $functions = ['a' => ['classname' => 'first']];\n" +
            "$functions = array_merge($functions, ['a' => ['classname' => 'second'], 'b' => []]);\n" +
            "$functions = array_replace(['z' => []], $functions);";
        const services = extractServices(engine.parseCode(source, ''));
        expect(keysOf(source)).toEqual(['z', 'a', 'b']);
        expect(services.find((s) => s.name === 'a')?.classname).toBe('second');
    });

    it('overwrites an element in place, keeping its insertion position', () => {
        expect(keysOf("<?php $functions = ['a' => [], 'b' => []];\n$functions['a'] = ['x' => 1];")).toEqual(['a', 'b']);
    });

    it('includes services declared in every conditional branch', () => {
        const source = "<?php $functions = ['a' => []];\n" +
            "if ($CFG->branch >= 400) { $functions['b'] = []; } elseif ($x) { $functions['c'] = []; } else $functions['d'] = [];";
        expect(keysOf(source)).toEqual(['a', 'b', 'c', 'd']);
    });

    it('honours unset() of individual services', () => {
        expect(keysOf("<?php $functions = ['a' => [], 'b' => []];\nunset($functions['a']);")).toEqual(['b']);
    });

    it('ignores other variables, dynamic offsets and keyless items', () => {
        const source = "<?php $services = ['s' => []];\n$functions = ['a' => [], []];\n$functions[$name] = [];\n$other['x'] = [];";
        expect(keysOf(source)).toEqual(['a']);
    });

    it('treats unresolvable reassignments as replacing the array', () => {
        expect(keysOf("<?php $functions = ['a' => []];\n$functions = local_x_get_functions();")).toEqual([]);
    });

    it('returns nothing for non-program input', () => {
        expect(collectArrayVariableEntries({ kind: 'array' } as never, 'functions')).toEqual([]);
    });

    it('extracts complete services from element assignments', () => {
        const source = "<?php\ndefined('MOODLE_INTERNAL') || die();\n$functions = [];\n" +
            "$functions['local_x_get'] = ['classname' => 'local_x\\\\external\\\\get', 'description' => 'Get', 'type' => 'read'];";
        expect(extractServices(engine.parseCode(source, ''))).toEqual([
            { name: 'local_x_get', classname: 'local_x\\external\\get', methodname: 'execute', description: 'Get', type: 'read' }
        ]);
    });
});
