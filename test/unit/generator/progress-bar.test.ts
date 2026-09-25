import { buildBox } from '../../../src/generator/ui/progress-bar';

describe('Progress Bar UI - buildBox', () => {
    it('should wrap lines in a box with borders and padding', () => {
        const lines = [
            'Test line 1',
            'Another longer test line'
        ];

        const box = buildBox(lines);

        expect(box.length).toBe(lines.length + 4);
        expect(box[0]).toMatch(/^┌─+┐$/);
        expect(box[1]).toMatch(/^│ +│$/);
        expect(box[box.length - 2]).toMatch(/^│ +│$/);
        expect(box[box.length - 1]).toMatch(/^└─+┘$/);

        // Every line should have equal length
        const width = box[0].length;
        for (const line of box) {
            expect(line.length).toBe(width);
        }

        // Inner lines contain original content
        expect(box[2]).toContain('Test line 1');
        expect(box[3]).toContain('Another longer test line');
    });

    it('should respect a minimum width for short content', () => {
        const box = buildBox(['Short']);
        // width = max(content + 4, 60), so line length = 60 + 2 = 62
        expect(box[0].length).toBe(62);
    });
});
