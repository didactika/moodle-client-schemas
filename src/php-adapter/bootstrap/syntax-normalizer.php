<?php
declare(strict_types=1);

namespace Didactika\MoodleClientSchemas\Bootstrap;

/**
 * Normalizes legacy Moodle PHP 5/7 syntax for compatibility with modern PHP 8+ runtimes.
 */
class SyntaxNormalizer {
    /**
     * Adapts all legacy PHP files in the target Moodle root directory.
     *
     * @param string $moodleRoot Absolute path to Moodle root directory.
     * @return void
     */
    public static function normalize(string $moodleRoot): void {
        if (PHP_VERSION_ID < 80000 || !is_dir($moodleRoot)) {
            return;
        }

        $marker = $moodleRoot . '/.php8_normalized';
        if (file_exists($marker)) {
            return;
        }

        self::scanAndNormalizeDirectory($moodleRoot);
        @file_put_contents($marker, '1');
    }

    /**
     * Recursively scans and normalizes PHP files.
     *
     * @param string $dir Directory path to scan.
     * @return void
     */
    private static function scanAndNormalizeDirectory(string $dir): void {
        $items = @scandir($dir);
        if ($items === false) {
            return;
        }

        foreach ($items as $item) {
            if ($item === '.' || $item === '..' || $item === '.git') {
                continue;
            }

            $path = $dir . '/' . $item;
            if (is_dir($path)) {
                self::scanAndNormalizeDirectory($path);
            } elseif (str_ends_with($item, '.php')) {
                self::normalizePhpFile($path);
            }
        }
    }

    /**
     * Normalizes a single PHP file content if legacy syntax is detected.
     *
     * @param string $filePath Absolute path to the PHP file.
     * @return void
     */
    public static function normalizePhpFile(string $filePath): void {
        $content = @file_get_contents($filePath);
        if ($content === false) {
            return;
        }

        $modified = false;

        if (str_contains($content, 'class object extends stdClass')) {
            $content = preg_replace('/class\s+object\s+extends\s+stdClass\s*\{[^}]*\};?/i', '', $content);
            $modified = true;
        }

        if (str_contains($content, '{') && preg_match('/\$[a-zA-Z0-9_]+\s*\{/', $content)) {
            $content = preg_replace('/(\$[a-zA-Z0-9_]+)\{([^}]+)\}/', '$1[$2]', $content);
            $modified = true;
        }

        if ($modified) {
            @file_put_contents($filePath, $content);
        }
    }
}
