<?php
declare(strict_types=1);

error_reporting(0);

$executionState = [
    'activeService' => null,
    'completed'     => false
];

register_shutdown_function(function () use (&$executionState) {
    if (!$executionState['completed']) {
        $buf = '';
        while (ob_get_level() > 0) {
            $buf .= ob_get_clean();
        }
        $errorMsg = 'Premature termination or die()';
        $trimmedBuf = trim($buf);
        if ($trimmedBuf !== '') {
            $errorMsg .= ': ' . $trimmedBuf;
        }

        $lastErr = error_get_last();
        if ($lastErr !== null && in_array($lastErr['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR])) {
            $errorMsg = 'Fatal PHP Error: ' . $lastErr['message'];
        }

        $payload = [
            'success'     => false,
            'serviceName' => $executionState['activeService'],
            'error'       => $errorMsg,
            'errorCode'   => 'INTROSPECTION_FAILED'
        ];

        fwrite(STDERR, json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        exit(3);
    }
});

/**
 * Parses CLI arguments into an associative map.
 *
 * @param array $argv Arguments list.
 * @return array Parsed options.
 */
function parse_batch_cli_arguments(array $argv): array {
    $options = [];
    $count = count($argv);
    for ($i = 1; $i < $count; $i++) {
        if ($argv[$i] === '--moodle-root' && isset($argv[$i + 1])) {
            $options['moodle-root'] = $argv[++$i];
        }
    }
    return $options;
}

/**
 * Emits a single NDJSON line to STDOUT.
 *
 * @param string $serviceName Target service identifier.
 * @param bool $success Whether extraction succeeded.
 * @param array|null $signature Extracted signature map.
 * @param \Throwable|null $failure Exception describing the failure, if any.
 * @return void
 */
function emit_batch_stream_item(string $serviceName, bool $success, ?array $signature, ?\Throwable $failure = null): void {
    $payload = [
        'serviceName' => $serviceName,
        'success'     => $success
    ];
    if ($success) {
        $payload['signature'] = $signature;
    } else {
        $payload['error'] = $failure ? $failure->getMessage() : 'Unknown extraction error';
        $payload['errorCode'] = $failure
            ? \Didactika\MoodleClientSchemas\Introspection\IntrospectionException::codeOf($failure)
            : 'INTROSPECTION_FAILED';
    }
    try {
        $line = \Didactika\MoodleClientSchemas\Introspection\SignatureIntrospector::encodeJson($payload);
    } catch (\Throwable $e) {
        $line = json_encode([
            'serviceName' => $serviceName,
            'success'     => false,
            'error'       => 'Failed to encode signature as JSON: ' . $e->getMessage(),
            'errorCode'   => 'INTROSPECTION_FAILED'
        ]);
    }
    fwrite(STDOUT, $line . "\n");
    fflush(STDOUT);
}

/**
 * Resolves full path on disk for a class file across known candidate patterns.
 *
 * @param object $cfg Moodle $CFG mock.
 * @param string $moodleRoot Root path.
 * @param string $cleanFile Relative class file.
 * @return string|null Resolved path or null.
 */
function resolve_service_filepath(object $cfg, string $moodleRoot, string $cleanFile): ?string {
    $candidatePaths = [
        $cfg->dirroot . '/' . $cleanFile,
        $moodleRoot . '/' . $cleanFile
    ];

    if (str_starts_with($cleanFile, 'public/')) {
        $withoutPublic = substr($cleanFile, 7);
        $candidatePaths[] = $cfg->dirroot . '/' . $withoutPublic;
        $candidatePaths[] = $moodleRoot . '/' . $withoutPublic;
    }

    $dirrootName = basename($cfg->dirroot);
    if (strpos($cleanFile, $dirrootName . '/') === 0) {
        $stripped = substr($cleanFile, strlen($dirrootName) + 1);
        $candidatePaths[] = $cfg->dirroot . '/' . $stripped;
    }

    foreach ($candidatePaths as $candidate) {
        if (file_exists($candidate)) {
            return $candidate;
        }
    }

    return null;
}

// 1. Validate CLI options
$options = parse_batch_cli_arguments($argv);
if (empty($options['moodle-root'])) {
    $executionState['completed'] = true;
    fwrite(STDERR, json_encode(['success' => false, 'error' => 'Missing required parameter: --moodle-root']));
    exit(1);
}

$rawMoodleRoot = $options['moodle-root'];
$moodleRoot    = realpath($rawMoodleRoot) ?: $rawMoodleRoot;

// 2. Headless Bootstrap (legacy syntax normalization runs beforehand on a disposable copy, see normalize-cli.php)
require_once __DIR__ . '/bootstrap/headless-bootstrap.php';

\Didactika\MoodleClientSchemas\Bootstrap\HeadlessBootstrap::initialize($moodleRoot);

require_once __DIR__ . '/autoloader/jit-autoloader.php';
require_once __DIR__ . '/introspection/signature-introspector.php';
\Didactika\MoodleClientSchemas\Autoloader\JitAutoloader::register();
\Didactika\MoodleClientSchemas\Autoloader\JitAutoloader::registerShims();

// 3. Load core safe libraries
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
            // Ignore optional core library warnings
        }
    }
}

// 4. Read STDIN
$stdinContent = file_get_contents('php://stdin');
if ($stdinContent === false || trim($stdinContent) === '') {
    $executionState['completed'] = true;
    exit(0);
}

$items = json_decode($stdinContent, true);
if (!is_array($items)) {
    $executionState['completed'] = true;
    fwrite(STDERR, json_encode(['success' => false, 'error' => 'Invalid JSON input in STDIN']));
    exit(1);
}

// 5. Stream extraction loop
foreach ($items as $item) {
    $serviceName = $item['serviceName'] ?? 'unknown';
    $executionState['activeService'] = $serviceName;

    $file = $item['classFile'] ?? '';
    $class = $item['classname'] ?? '';
    $method = $item['methodname'] ?? 'execute';

    $cleanFile = ltrim($file, '/');

    ob_start();
    try {
        $fullPath = \Didactika\MoodleClientSchemas\Introspection\SignatureIntrospector::assertLoadableFile(
            resolve_service_filepath($CFG, $moodleRoot, $cleanFile),
            $cleanFile
        );
        require_once $fullPath;
        $signature = \Didactika\MoodleClientSchemas\Introspection\SignatureIntrospector::introspect($class, $method);
        while (ob_get_level() > 0) {
            ob_end_clean();
        }
        emit_batch_stream_item($serviceName, true, $signature);
    } catch (\Throwable $e) {
        while (ob_get_level() > 0) {
            ob_end_clean();
        }
        emit_batch_stream_item($serviceName, false, null, $e);
    }
}

$executionState['completed'] = true;
exit(0);
