import { buildBox, reportProgressError } from '../../../src/generator/ui/progress-bar';
import { MoodleGeneratorError } from '../../../src/generator/errors/generator-error';

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

    describe('reportProgressError', () => {
        it('should output structured error block without emojis', () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const error = new MoodleGeneratorError({
                code: 'ERR_PHP_NOT_FOUND',
                title: 'PHP CLI Not Found',
                details: 'PHP CLI was not found on your system PATH.',
                action: 'Install PHP 7.4 or higher.'
            });

            reportProgressError(null, error);

            expect(consoleErrorSpy).toHaveBeenCalledWith(
                expect.stringContaining('[moodle-client] ERROR: PHP CLI Not Found (ERR_PHP_NOT_FOUND)')
            );
            const logged = consoleErrorSpy.mock.calls[0]?.[0] as string;
            expect(logged).not.toMatch(/[\u{1F300}-\u{1F9FF}\u{2700}-\u{27BF}\u{2600}-\u{26FF}✔✖]/u);
            consoleErrorSpy.mockRestore();
        });
    });
});
