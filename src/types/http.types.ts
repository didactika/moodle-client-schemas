/**
 * Supported HTTP methods for Moodle Web Service requests.
 */
export type HttpMethod = "GET" | "POST";

/**
 * Standard response envelope for Moodle Web Service calls.
 */
export interface MoodleResponse<T = unknown> {
    data: T;
    status: number;
    headers: Headers;
    raw: Response;
}
