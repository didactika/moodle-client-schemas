import { runWithConcurrency, normalizeConcurrency } from '../../../../src/webservice-extractor/utils/concurrency';

describe('Unit Test: concurrency utilities', () => {
    it('never runs more workers than the limit and processes every item', async () => {
        let active = 0;
        let peak = 0;
        const processed: number[] = [];
        const items = Array.from({ length: 20 }, (_, i) => i);

        await runWithConcurrency(items, 3, async (item) => {
            active += 1;
            peak = Math.max(peak, active);
            await new Promise((resolve) => setTimeout(resolve, 5));
            processed.push(item);
            active -= 1;
        });

        expect(peak).toBe(3);
        expect(processed.sort((a, b) => a - b)).toEqual(items);
    });

    it('handles empty input', async () => {
        await expect(runWithConcurrency([], 4, async () => {})).resolves.toBeUndefined();
    });

    it('falls back to the default for invalid limits', () => {
        expect(normalizeConcurrency(undefined, 8)).toBe(8);
        expect(normalizeConcurrency(0, 8)).toBe(8);
        expect(normalizeConcurrency(-2, 8)).toBe(8);
        expect(normalizeConcurrency(Number.NaN, 8)).toBe(8);
        expect(normalizeConcurrency(2.7, 8)).toBe(2);
    });
});
