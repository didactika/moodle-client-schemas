<?php
declare(strict_types=1);

error_reporting(0);

/**
 * Normalizes legacy Moodle PHP syntax for PHP 8+ IN PLACE.
 *
 * Only ever invoked by the Node.js host on a disposable temporary copy of the codebase,
 * never on the user's original Moodle directory.
 *
 * Usage: php normalize-cli.php --moodle-root <disposable-copy>
 * Output: {"normalized": bool} on STDOUT.
 */

$moodleRoot = null;
$count = count($argv);
for ($i = 1; $i < $count; $i++) {
    if ($argv[$i] === '--moodle-root' && isset($argv[$i + 1])) {
        $moodleRoot = $argv[++$i];
    }
}

if ($moodleRoot === null || $moodleRoot === '') {
    fwrite(STDERR, json_encode(['success' => false, 'error' => 'Missing required parameter: --moodle-root']));
    exit(1);
}

require_once __DIR__ . '/bootstrap/syntax-normalizer.php';

$normalized = \Didactika\MoodleClientSchemas\Bootstrap\SyntaxNormalizer::normalize(realpath($moodleRoot) ?: $moodleRoot);
fwrite(STDOUT, json_encode(['normalized' => $normalized]));
exit(0);
