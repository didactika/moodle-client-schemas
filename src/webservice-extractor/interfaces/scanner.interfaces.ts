/**
 * Mutable state shared by every step of a single filesystem scan.
 */
export interface ScanContext {
    /** Root of the scan; relative pattern matching is computed against it */
    basePath: string;
    /** Compiled path patterns a file must match to be collected */
    regexes: RegExp[];
    /** Directory names pruned from the walk */
    ignoredSet: Set<string>;
    /** Real paths of directories already walked; stops symlink cycles and duplicate visits */
    visitedDirs: Set<string>;
    /** Matching non-empty files, reported by their path under basePath (symlinks are not resolved) */
    collected: string[];
}

/**
 * What a directory entry resolves to once symbolic links are followed.
 */
export type ScanEntryKind = 'directory' | 'file' | 'other';
