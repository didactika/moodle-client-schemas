/**
 * A minimal Moodle REST client written for the generated barrel.
 *
 * The barrel produced by generateWebserviceFiles needs three things from the
 * module named in `importSource`:
 *
 *   1. an exported `HttpMethod` type;
 *   2. an exported generic `MoodleResponse<T>` type;
 *   3. an exported `MoodleClient` class or interface, which the barrel extends
 *      with one method per service: `client.core_user_get_users(params)`.
 *
 * The barrel only adds *types*. The methods must also exist at runtime, which
 * is what the Proxy below does: any unknown property becomes a function that
 * calls the web service of the same name.
 */

export type HttpMethod = "GET" | "POST";

export interface MoodleResponse<T> {
    data: T;
    status: number;
}

/** Moodle's REST protocol expects nested parameters as `users[0][id]=5`. */
function flatten(value: unknown, prefix: string, out: URLSearchParams): void {
    if (value === null || value === undefined) {
        return;
    }
    if (typeof value === "object") {
        for (const [key, child] of Object.entries(value)) {
            flatten(child, prefix ? `${prefix}[${key}]` : key, out);
        }
        return;
    }
    out.append(prefix, String(value));
}

export class MoodleClient {
    constructor(
        private readonly rootURL: string,
        private readonly token: string,
    ) {
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (typeof prop === "symbol" || prop in target) {
                    return Reflect.get(target, prop, receiver);
                }
                return (params?: object, method?: HttpMethod) => target.call(prop, params, method);
            },
        });
    }

    async call<T>(wsfunction: string, params: object = {}, method: HttpMethod = "POST"): Promise<MoodleResponse<T>> {
        const url = new URL(`${this.rootURL}/webservice/rest/server.php`);
        const query = new URLSearchParams({ wstoken: this.token, wsfunction, moodlewsrestformat: "json" });
        const body = new URLSearchParams();
        flatten(params, "", method === "GET" ? query : body);
        url.search = query.toString();

        const res = await fetch(url, { method, body: method === "GET" ? undefined : body });
        const data = (await res.json()) as T & { exception?: string; message?: string };
        if (data && typeof data === "object" && "exception" in data) {
            throw new Error(`${data.exception}: ${data.message}`);
        }
        return { data, status: res.status };
    }
}
