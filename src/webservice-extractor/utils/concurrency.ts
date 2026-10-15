/**
 * Checks whether a number is a finite positive integer.
 *
 * @param {number} value - Candidate value.
 * @returns {boolean} True if positive and finite.
 */
function isPositiveInteger(value: number): boolean {
    return Number.isFinite(value) && value > 0;
}

/**
 * Normalizes a concurrency limit into a positive integer.
 *
 * @param {number | undefined} limit - Requested limit.
 * @param {number} fallback - Default limit when the request is invalid.
 * @returns {number} Positive integer limit.
 */
export function normalizeConcurrency(limit: number | undefined, fallback: number): number {
    const value = Math.floor(limit ?? fallback);
    return isPositiveInteger(value) ? value : fallback;
}

/**
 * Runs a single worker loop pulling items from a shared cursor until exhausted.
 *
 * @param {T[]} items - Items to process.
 * @param {{ next: number }} cursor - Shared cursor.
 * @param {(item: T) => Promise<void>} worker - Async worker.
 * @returns {Promise<void>}
 */
async function drainQueue<T>(
    items: T[],
    cursor: { next: number },
    worker: (item: T) => Promise<void>
): Promise<void> {
    while (cursor.next < items.length) {
        const item = items[cursor.next];
        cursor.next += 1;
        await worker(item);
    }
}

/**
 * Processes items with at most `limit` workers running concurrently.
 *
 * @example
 * ```ts
 * await runWithConcurrency(files, 4, async (file) => process(file));
 * ```
 *
 * @param {T[]} items - Items to process.
 * @param {number} limit - Maximum concurrent workers.
 * @param {(item: T) => Promise<void>} worker - Async worker.
 * @returns {Promise<void>}
 */
export async function runWithConcurrency<T>(
    items: T[],
    limit: number,
    worker: (item: T) => Promise<void>
): Promise<void> {
    const cursor = { next: 0 };
    const workerCount = Math.min(normalizeConcurrency(limit, 1), items.length);
    const workers = Array.from({ length: workerCount }, () => drainQueue(items, cursor, worker));
    await Promise.all(workers);
}
