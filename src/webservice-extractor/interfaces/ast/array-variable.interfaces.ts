import { Entry } from 'php-parser';

/**
 * Statically tracked value of a PHP array variable while a file's statements are replayed.
 */
export interface TrackedArrayState {
    /** Name of the tracked variable, without the leading '$' (e.g. 'functions') */
    variableName: string;
    /** Current entries keyed by their string key, in PHP insertion order */
    entries: Map<string, Entry>;
}
