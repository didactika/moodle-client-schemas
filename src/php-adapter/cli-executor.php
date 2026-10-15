<?php
declare(strict_types=1);

error_reporting(0);
/**
 * Emits a structured JSON error payload to STDERR and terminates the process.
 *
 * @param int $code Exit error code.
 * @param string $message Descriptive error message.
 * @param Throwable|null $e Optional exception instance.
 * @param string $file Optional source file path.
 * @param int $line Optional source line number.
 * @param string $errorCode Machine-readable WebServiceErrorCode.
 * @return void
 */
function emit_cli_error(int $code, string $message, ?Throwable $e = null, string $file = '', int $line = 0, string $errorCode = 'INTROSPECTION_FAILED'): void {
    if (ob_get_level() > 0) {
        ob_end_clean();
    }

    $payload = [
        'success'   => false,
        'code'      => $code,
        'error'     => $message,
        'errorCode' => $errorCode,
        'exception' => $e ? get_class($e) : 'Error',
        'file'      => $e ? $e->getFile() : $file,
        'line'      => $e ? $e->getLine() : $line,
        'trace'     => $e ? explode("\n", $e->getTraceAsString()) : []
    ];

    fwrite(STDERR, json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE));
    exit($code);
}

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR])) {
        emit_cli_error(3, "Fatal PHP Error: " . $error['message'], null, $error['file'], $error['line']);
    }
});

set_exception_handler(function (\Throwable $e) {
    emit_cli_error(3, "Uncaught Exception " . get_class($e) . ": " . $e->getMessage(), $e, $e->getFile(), $e->getLine());
});

/**
 * Parses options from CLI argument list.
 *
 * @param array $argv CLI arguments.
 * @return array Parsed key-value options.
 */
function parse_cli_arguments(array $argv): array {
    $options = [];
    $count = count($argv);

    for ($i = 1; $i < $count; $i++) {
        $arg = $argv[$i];
        if ($arg === '--moodle-root' && isset($argv[$i + 1])) {
            $options['moodle-root'] = $argv[++$i];
        } elseif ($arg === '--file' && isset($argv[$i + 1])) {
            $options['file'] = $argv[++$i];
        } elseif ($arg === '--class' && isset($argv[$i + 1])) {
            $options['class'] = $argv[++$i];
        } elseif ($arg === '--method' && isset($argv[$i + 1])) {
            $options['method'] = $argv[++$i];
        }
    }

    return $options;
}

// 1. Parse and validate arguments
$options = parse_cli_arguments($argv);

if (empty($options['moodle-root']) || empty($options['file']) || empty($options['class']) || empty($options['method'])) {
    emit_cli_error(1, 'Missing required CLI parameters (--moodle-root, --file, --class, --method).');
}

$rawMoodleRoot = $options['moodle-root'];
$moodleRoot    = realpath($rawMoodleRoot) ?: $rawMoodleRoot;
$file          = $options['file'];
$class         = $options['class'];
$method        = $options['method'];

// Legacy syntax normalization runs beforehand on a disposable copy (see normalize-cli.php)
require_once __DIR__ . '/bootstrap/headless-bootstrap.php';

// Initialize headless environment ($CFG, $DB, superglobals, include_path, constants, autoloader)
\Didactika\MoodleClientSchemas\Bootstrap\HeadlessBootstrap::initialize($moodleRoot);

require_once __DIR__ . '/autoloader/jit-autoloader.php';
require_once __DIR__ . '/introspection/signature-introspector.php';

// Register JIT secondary autoloader for dynamic synthetic interfaces and missing structures
\Didactika\MoodleClientSchemas\Autoloader\JitAutoloader::register();

// Register neutral helpers and bidirectional namespace shims
\Didactika\MoodleClientSchemas\Autoloader\JitAutoloader::registerShims();

// 8. Load Foundation Web Services and Core Libraries directly from Moodle source
$safeCoreLibraries = [
    $CFG->dirroot . '/cache/classes/interfaces.php',
    $CFG->libdir . '/setuplib.php',
    $CFG->libdir . '/outputcomponents.php',
    $CFG->libdir . '/outputrenderers.php',
    $CFG->libdir . '/accesslib.php',
    $CFG->libdir . '/modinfolib.php',
    $CFG->libdir . '/externallib.php'
];
foreach ($safeCoreLibraries as $coreLibPath) {
    if (file_exists($coreLibPath)) {
        try {
            @require_once $coreLibPath;
        } catch (\Throwable $e) {
            // Silently bypass deprecated or incompatible optional library files
        }
    }
}

$cleanFile = ltrim($file, '/');
$candidatePaths = [
    $CFG->dirroot . '/' . $cleanFile,
    $moodleRoot . '/' . $cleanFile
];

if (str_starts_with($cleanFile, 'public/')) {
    $withoutPublic = substr($cleanFile, 7);
    $candidatePaths[] = $CFG->dirroot . '/' . $withoutPublic;
    $candidatePaths[] = $moodleRoot . '/' . $withoutPublic;
}

$dirrootName = basename($CFG->dirroot);
if (strpos($cleanFile, $dirrootName . '/') === 0) {
    $stripped = substr($cleanFile, strlen($dirrootName) + 1);
    $candidatePaths[] = $CFG->dirroot . '/' . $stripped;
}

$fullPath = null;
foreach ($candidatePaths as $candidate) {
    if (file_exists($candidate)) {
        $fullPath = $candidate;
        break;
    }
}

try {
    $fullPath = \Didactika\MoodleClientSchemas\Introspection\SignatureIntrospector::assertLoadableFile(
        $fullPath,
        "{$CFG->dirroot}/{$cleanFile}"
    );
} catch (\Didactika\MoodleClientSchemas\Introspection\IntrospectionException $e) {
    emit_cli_error(2, $e->getMessage(), null, '', 0, $e->getErrorCode());
}

// 9. Load class file with output suppression
ob_start();

try {
    require_once $fullPath;
} catch (\Throwable $e) {
    emit_cli_error(3, "Failed to load class file {$fullPath}: " . $e->getMessage(), $e);
}

// 10. Execute signature introspection
try {
    $signature = \Didactika\MoodleClientSchemas\Introspection\SignatureIntrospector::introspect($class, $method);

    while (ob_get_level() > 0) {
        ob_end_clean();
    }

    fwrite(STDOUT, \Didactika\MoodleClientSchemas\Introspection\SignatureIntrospector::encodeJson($signature));
    exit(0);
} catch (\Throwable $e) {
    emit_cli_error(
        4,
        "Signature extraction failed for {$class}::{$method}: " . $e->getMessage(),
        $e,
        '',
        0,
        \Didactika\MoodleClientSchemas\Introspection\IntrospectionException::codeOf($e)
    );
}
