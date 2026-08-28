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
 * @return void
 */
function emit_cli_error(int $code, string $message, ?Throwable $e = null, string $file = '', int $line = 0): void {
    if (ob_get_level() > 0) {
        ob_end_clean();
    }

    $payload = [
        'success'   => false,
        'code'      => $code,
        'error'     => $message,
        'exception' => $e ? get_class($e) : 'Error',
        'file'      => $e ? $e->getFile() : $file,
        'line'      => $e ? $e->getLine() : $line,
        'trace'     => $e ? explode("\n", $e->getTraceAsString()) : []
    ];

    fwrite(STDERR, json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    exit($code);
}

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR])) {
        emit_cli_error(3, "Fatal PHP Error: " . $error['message'], null, $error['file'], $error['line']);
    }
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

/**
 * Resolves the callable static signature method name for parameters or returns.
 *
 * @param string $className Class name with leading namespace.
 * @param string $methodName Primary method name (e.g. execute or get_users).
 * @param string $type Signature type ('parameters' or 'returns').
 * @return string|null Resolved callable method name or null.
 */
function resolve_signature_method(string $className, string $methodName, string $type): ?string {
    $primaryCandidate = "{$methodName}_{$type}";
    if (is_callable([$className, $primaryCandidate])) {
        return $primaryCandidate;
    }

    $fallbackCandidate = "execute_{$type}";
    if (is_callable([$className, $fallbackCandidate])) {
        return $fallbackCandidate;
    }

    if (class_exists($className)) {
        $methods = get_class_methods($className);
        if (is_array($methods)) {
            foreach ($methods as $m) {
                if (str_ends_with(strtolower($m), "_{$type}")) {
                    return $m;
                }
            }
        }
    }

    return null;
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

// Auto-adapt legacy Moodle PHP 5/7 syntax ($var{...} and class object) for PHP 8+ runtime
if (PHP_VERSION_ID >= 80000 && is_dir($moodleRoot)) {
    $legacyMarker = $moodleRoot . '/.php8_normalized';
    if (!file_exists($legacyMarker)) {
        $normalizeDirectory = function (string $dir) use (&$normalizeDirectory) {
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
                    $normalizeDirectory($path);
                } elseif (str_ends_with($item, '.php')) {
                    $content = @file_get_contents($path);
                    if ($content !== false) {
                        $changed = false;
                        if (str_contains($content, 'class object extends stdClass')) {
                            $content = preg_replace('/class\s+object\s+extends\s+stdClass\s*\{[^}]*\};?/i', '', $content);
                            $changed = true;
                        }
                        if (str_contains($content, '{') && preg_match('/\$[a-zA-Z0-9_]+\s*\{/', $content)) {
                            $content = preg_replace('/(\$[a-zA-Z0-9_]+)\{([^}]+)\}/', '$1[$2]', $content);
                            $changed = true;
                        }
                        if ($changed) {
                            @file_put_contents($path, $content);
                        }
                    }
                }
            }
        };
        $normalizeDirectory($moodleRoot);
        @file_put_contents($legacyMarker, '1');
    }
}

// 2. Define Moodle Core CLI constants for headless in-memory execution
if (!defined('CLI_SCRIPT')) {
    define('CLI_SCRIPT', true);
}
if (!defined('MOODLE_INTERNAL')) {
    define('MOODLE_INTERNAL', true);
}
if (!defined('PHPUNIT_TEST')) {
    define('PHPUNIT_TEST', false);
}
if (!defined('CACHE_DISABLE_ALL')) {
    define('CACHE_DISABLE_ALL', true);
}
if (!defined('CACHE_DISABLE_STORES')) {
    define('CACHE_DISABLE_STORES', true);
}
if (!defined('NO_OUTPUT_BUFFERING')) {
    define('NO_OUTPUT_BUFFERING', true);
}
if (!defined('NO_DEBUG_DISPLAY')) {
    define('NO_DEBUG_DISPLAY', true);
}
if (!defined('IGNORE_MISSING')) {
    define('IGNORE_MISSING', 1);
}
if (!defined('MUST_EXIST')) {
    define('MUST_EXIST', 2);
}
if (!defined('IGNORE_MULTIPLE')) {
    define('IGNORE_MULTIPLE', 3);
}
if (!defined('SITEID')) {
    define('SITEID', 1);
}
if (!defined('SYSCONTEXTID')) {
    define('SYSCONTEXTID', 1);
}

// Multibyte string fallbacks if mbstring extension is absent
if (!function_exists('mb_list_encodings')) {
    function mb_list_encodings() { return ['UTF-8', 'ISO-8859-1', 'ASCII']; }
}
if (!function_exists('mb_strtolower')) {
    function mb_strtolower($string, $encoding = 'UTF-8') { return strtolower($string); }
}
if (!function_exists('mb_strtoupper')) {
    function mb_strtoupper($string, $encoding = 'UTF-8') { return strtoupper($string); }
}
if (!function_exists('mb_substr')) {
    function mb_substr($string, $start, $length = null, $encoding = 'UTF-8') { return substr($string, $start, $length); }
}
if (!function_exists('mb_strlen')) {
    function mb_strlen($string, $encoding = 'UTF-8') { return strlen($string); }
}

// 3. Initialize minimal $CFG properties
global $CFG, $DB, $USER, $SITE, $PAGE, $OUTPUT;
$CFG = new \stdClass();
$CFG->dirroot              = is_dir($moodleRoot . '/public') ? $moodleRoot . '/public' : $moodleRoot;
$CFG->libdir               = is_dir($CFG->dirroot . '/lib') ? $CFG->dirroot . '/lib' : $moodleRoot . '/lib';

$dataroot                  = sys_get_temp_dir() . '/moodle_headless_' . md5($moodleRoot);
if (!is_dir($dataroot)) { @mkdir($dataroot, 0777, true); }
$CFG->dataroot             = $dataroot;
$CFG->cachedir             = $dataroot . '/cache';
if (!is_dir($CFG->cachedir)) { @mkdir($CFG->cachedir, 0777, true); }
$CFG->localcachedir        = $dataroot . '/localcache';
if (!is_dir($CFG->localcachedir)) { @mkdir($CFG->localcachedir, 0777, true); }
$CFG->tempdir              = $dataroot . '/temp';
if (!is_dir($CFG->tempdir)) { @mkdir($CFG->tempdir, 0777, true); }

$CFG->admin                = 'admin';
$CFG->prefix               = '';
$CFG->wwwroot              = 'http://localhost';
$CFG->themedir             = $CFG->dirroot . '/theme';
$CFG->theme                = 'boost';
$CFG->defaultcity          = '';
$CFG->country              = '';
$CFG->lang                 = 'en';
$CFG->langotherroot        = '';
$CFG->langlocalroot        = '';
$CFG->calendartype         = 'gregorian';
$CFG->forced_plugin_settings = [];
$CFG->config_php_settings  = [];
$CFG->siteidentifier       = 'moodle_headless_site';
$CFG->directorypermissions = 02777;
$CFG->filepermissions      = 0666;
$CFG->umaskpermissions     = 0000;
$CFG->debug                = 0;
$CFG->debugdeveloper       = false;
$CFG->country              = 'AU';
$CFG->lang                 = 'en';
$CFG->calendartype         = 'gregorian';
$CFG->defaultcity          = '';
$CFG->defaultpreference_mailformat    = 1;
$CFG->defaultpreference_maildigest    = 0;
$CFG->defaultpreference_maildisplay   = 2;
$CFG->defaultpreference_autosubscribe = 1;
$CFG->defaultpreference_trackforums   = 0;

// 4. Configure PHP include_path prioritizing PEAR and Moodle core libdir
set_include_path(
    $CFG->libdir . '/pear' . PATH_SEPARATOR .
    $CFG->libdir . PATH_SEPARATOR .
    $CFG->dirroot . PATH_SEPARATOR .
    get_include_path()
);

// 5. Pre-inject Headless Dummy $DB to short-circuit setup_DB()
if (!class_exists('headless_moodle_database', false)) {
    class headless_moodle_database {
        public function __call($name, $args) { return false; }
        public function get_records($table, array $conditions = null, $sort = '', $fields = '*', $limitfrom = 0, $limitnum = 0) { return []; }
        public function get_records_menu($table, array $conditions = null, $sort = '', $fields = '*', $limitfrom = 0, $limitnum = 0) { return []; }
        public function get_records_select_menu($table, $select = '', array $params = null, $sort = '', $fields = '*', $limitfrom = 0, $limitnum = 0) { return []; }
        public function get_records_sql_menu($sql, array $params = null, $limitfrom = 0, $limitnum = 0) { return []; }
        public function get_record($table, array $conditions = null, $fields = '*', $strictness = 0) { return false; }
        public function get_field($table, $return, array $conditions = null, $strictness = 0) { return false; }
        public function get_config($plugin = 'core', $name = null) { return false; }
        public function get_tables($usecache = true) { return []; }
    }
}
$DB      = new headless_moodle_database();
$USER    = (object)['id' => 2, 'username' => 'admin'];
$SITE    = (object)['id' => 1];
$PAGE    = new \stdClass();
$OUTPUT  = new \stdClass();
$SESSION = new \stdClass();

// 6. Register Native Moodle Autoloader (2.6 - 5.x+) or Legacy Frankenstyle Autoloader (2.0 - 2.5)
if (file_exists($CFG->libdir . '/classes/component.php')) {
    require_once $CFG->libdir . '/classes/component.php';
    if (is_callable(['\\core\\component', 'register_autoloader'])) {
        \core\component::register_autoloader();
    } elseif (is_callable(['\\core_component', 'register_autoloader'])) {
        \core_component::register_autoloader();
    } elseif (is_callable(['\\core_component', 'classloader'])) {
        spl_autoload_register(['\\core_component', 'classloader']);
    }
} else {
    // Legacy Moodle 2.0-2.5 autoloader
    spl_autoload_register(function (string $legacyClass) use ($CFG) {
        $clean = ltrim($legacyClass, '\\');
        $parts = explode('_', $clean);
        $candidates = [
            $CFG->dirroot . '/' . implode('/', $parts) . '/externallib.php',
            $CFG->dirroot . '/' . $parts[0] . '/' . ($parts[1] ?? '') . '/externallib.php',
            $CFG->dirroot . '/' . $clean . '/externallib.php',
            $CFG->libdir . '/' . $clean . '.php'
        ];
        foreach ($candidates as $candidateFile) {
            if (file_exists($candidateFile)) {
                require_once $candidateFile;
                return true;
            }
        }
        return false;
    });
}

$isModernMoodle = file_exists($CFG->libdir . '/classes/component.php');

// Base exception classes for legacy Moodle 2.0-2.5
if (!$isModernMoodle) {
    if (!class_exists('moodle_exception', false)) {
        class moodle_exception extends \Exception {}
    }
    if (!class_exists('coding_exception', false)) {
        class coding_exception extends moodle_exception {}
    }
    if (!class_exists('dml_exception', false)) {
        class dml_exception extends moodle_exception {}
    }
    if (!class_exists('invalid_parameter_exception', false)) {
        class invalid_parameter_exception extends moodle_exception {}
    }
    if (!class_exists('invalid_response_exception', false)) {
        class invalid_response_exception extends moodle_exception {}
    }
}

if (!defined('PARAM_RAW')) {
    define('PARAM_RAW', 'raw');
}
if (!defined('PARAM_RAW_TRIMMED')) {
    define('PARAM_RAW_TRIMMED', 'raw_trimmed');
}
if (!defined('PARAM_CLEAN')) {
    define('PARAM_CLEAN', 'clean');
}
if (!defined('PARAM_CLEANHTML')) {
    define('PARAM_CLEANHTML', 'cleanhtml');
}
if (!defined('PARAM_INT')) {
    define('PARAM_INT', 'int');
}
if (!defined('PARAM_INTEGER')) {
    define('PARAM_INTEGER', 'int');
}
if (!defined('PARAM_NUMBER')) {
    define('PARAM_NUMBER', 'float');
}
if (!defined('PARAM_FLOAT')) {
    define('PARAM_FLOAT', 'float');
}
if (!defined('PARAM_TEXT')) {
    define('PARAM_TEXT', 'text');
}
if (!defined('PARAM_BOOL')) {
    define('PARAM_BOOL', 'bool');
}
if (!defined('PARAM_BOOLEAN')) {
    define('PARAM_BOOLEAN', 'bool');
}
if (!defined('PARAM_NOTAGS')) {
    define('PARAM_NOTAGS', 'notags');
}
if (!defined('PARAM_ALPHANUM')) {
    define('PARAM_ALPHANUM', 'alphanum');
}
if (!defined('PARAM_ALPHANUMEXT')) {
    define('PARAM_ALPHANUMEXT', 'alphanumext');
}
if (!defined('PARAM_ALPHA')) {
    define('PARAM_ALPHA', 'alpha');
}
if (!defined('PARAM_ALPHAEXT')) {
    define('PARAM_ALPHAEXT', 'alphaext');
}
if (!defined('PARAM_AUTH')) {
    define('PARAM_AUTH', 'auth');
}
if (!defined('PARAM_BASE64')) {
    define('PARAM_BASE64', 'base64');
}
if (!defined('PARAM_EMAIL')) {
    define('PARAM_EMAIL', 'email');
}
if (!defined('PARAM_URL')) {
    define('PARAM_URL', 'url');
}
if (!defined('PARAM_LOCALURL')) {
    define('PARAM_LOCALURL', 'localurl');
}
if (!defined('PARAM_SAFEDIR')) {
    define('PARAM_SAFEDIR', 'safedir');
}
if (!defined('PARAM_SAFEPATH')) {
    define('PARAM_SAFEPATH', 'safepath');
}
if (!defined('PARAM_FILE')) {
    define('PARAM_FILE', 'file');
}
if (!defined('PARAM_CLEANFILE')) {
    define('PARAM_CLEANFILE', 'file');
}
if (!defined('PARAM_PATH')) {
    define('PARAM_PATH', 'path');
}
if (!defined('PARAM_HOST')) {
    define('PARAM_HOST', 'host');
}
if (!defined('PARAM_PEM')) {
    define('PARAM_PEM', 'pem');
}
if (!defined('PARAM_PERMISSION')) {
    define('PARAM_PERMISSION', 'permission');
}
if (!defined('PARAM_SEQUENCE')) {
    define('PARAM_SEQUENCE', 'sequence');
}
if (!defined('PARAM_TAG')) {
    define('PARAM_TAG', 'tag');
}
if (!defined('PARAM_TAGLIST')) {
    define('PARAM_TAGLIST', 'taglist');
}
if (!defined('PARAM_COMPONENT')) {
    define('PARAM_COMPONENT', 'component');
}
if (!defined('PARAM_AREA')) {
    define('PARAM_AREA', 'area');
}
if (!defined('PARAM_PLUGIN')) {
    define('PARAM_PLUGIN', 'plugin');
}
if (!defined('PARAM_USERNAME')) {
    define('PARAM_USERNAME', 'username');
}
if (!defined('PARAM_STRINGID')) {
    define('PARAM_STRINGID', 'stringid');
}
if (!defined('PARAM_ACTION')) {
    define('PARAM_ACTION', 'alphanumext');
}
if (!defined('PARAM_FORMAT')) {
    define('PARAM_FORMAT', 'alphanumext');
}
if (!defined('PARAM_MULTILANG')) {
    define('PARAM_MULTILANG', 'text');
}
if (!defined('PARAM_LANG')) {
    define('PARAM_LANG', 'lang');
}
if (!defined('PARAM_THEME')) {
    define('PARAM_THEME', 'theme');
}
if (!defined('PARAM_TIMEZONE')) {
    define('PARAM_TIMEZONE', 'timezone');
}
if (!defined('PARAM_CAPABILITY')) {
    define('PARAM_CAPABILITY', 'capability');
}
if (!defined('FORMAT_MOODLE')) {
    define('FORMAT_MOODLE', '0');
}
if (!defined('FORMAT_HTML')) {
    define('FORMAT_HTML', '1');
}
if (!defined('FORMAT_PLAIN')) {
    define('FORMAT_PLAIN', '2');
}
if (!defined('FORMAT_WIKI')) {
    define('FORMAT_WIKI', '3');
}
if (!defined('FORMAT_MARKDOWN')) {
    define('FORMAT_MARKDOWN', '4');
}
if (!defined('MINSECS')) {
    define('MINSECS', 60);
}
if (!defined('HOURSECS')) {
    define('HOURSECS', 3600);
}
if (!defined('DAYSECS')) {
    define('DAYSECS', 86400);
}
if (!defined('WEEKSECS')) {
    define('WEEKSECS', 604800);
}
if (!defined('YEARSECS')) {
    define('YEARSECS', 31536000);
}

// Moodle feature constants
if (!defined('FEATURE_GRADE_HAS_GRADE')) {
    define('FEATURE_GRADE_HAS_GRADE', 'grade_has_grade');
}
if (!defined('FEATURE_GRADE_OUTCOMES')) {
    define('FEATURE_GRADE_OUTCOMES', 'outcomes');
}
if (!defined('FEATURE_ADVANCED_GRADING')) {
    define('FEATURE_ADVANCED_GRADING', 'grade_advanced_grading');
}
if (!defined('FEATURE_CONTROLS_GRADE_VISIBILITY')) {
    define('FEATURE_CONTROLS_GRADE_VISIBILITY', 'controlsgradevisbility');
}
if (!defined('FEATURE_PLAGIARISM')) {
    define('FEATURE_PLAGIARISM', 'plagiarism');
}
if (!defined('FEATURE_COMPLETION_TRACKS_VIEWS')) {
    define('FEATURE_COMPLETION_TRACKS_VIEWS', 'completion_tracks_views');
}
if (!defined('FEATURE_COMPLETION_HAS_RULES')) {
    define('FEATURE_COMPLETION_HAS_RULES', 'completion_has_rules');
}
if (!defined('FEATURE_NO_VIEW_LINK')) {
    define('FEATURE_NO_VIEW_LINK', 'viewlink');
}
if (!defined('FEATURE_IDNUMBER')) {
    define('FEATURE_IDNUMBER', 'idnumber');
}
if (!defined('FEATURE_GROUPS')) {
    define('FEATURE_GROUPS', 'groups');
}
if (!defined('FEATURE_GROUPINGS')) {
    define('FEATURE_GROUPINGS', 'groupings');
}
if (!defined('FEATURE_GROUPMEMBERSONLY')) {
    define('FEATURE_GROUPMEMBERSONLY', 'groupmembersonly');
}
if (!defined('FEATURE_MOD_ARCHETYPE')) {
    define('FEATURE_MOD_ARCHETYPE', 'mod_archetype');
}
if (!defined('FEATURE_MOD_INTRO')) {
    define('FEATURE_MOD_INTRO', 'mod_intro');
}
if (!defined('FEATURE_MODEDIT_DEFAULT_COMPLETION')) {
    define('FEATURE_MODEDIT_DEFAULT_COMPLETION', 'modedit_default_completion');
}
if (!defined('FEATURE_COMMENT')) {
    define('FEATURE_COMMENT', 'comment');
}
if (!defined('FEATURE_RATE')) {
    define('FEATURE_RATE', 'rate');
}
if (!defined('FEATURE_BACKUP_MOODLE2')) {
    define('FEATURE_BACKUP_MOODLE2', 'backup_moodle2');
}
if (!defined('FEATURE_SHOW_DESCRIPTION')) {
    define('FEATURE_SHOW_DESCRIPTION', 'showdescription');
}
if (!defined('FEATURE_USES_QUESTIONS')) {
    define('FEATURE_USES_QUESTIONS', 'usesquestions');
}
if (!defined('FEATURE_MOD_PURPOSE')) {
    define('FEATURE_MOD_PURPOSE', 'mod_purpose');
}

if (!defined('VALUE_DEFAULT')) {
    define('VALUE_DEFAULT', 0);
}
if (!defined('VALUE_REQUIRED')) {
    define('VALUE_REQUIRED', 1);
}
if (!defined('VALUE_OPTIONAL')) {
    define('VALUE_OPTIONAL', 2);
}
if (!defined('NULL_NOT_ALLOWED')) {
    define('NULL_NOT_ALLOWED', false);
}
if (!defined('NULL_ALLOWED')) {
    define('NULL_ALLOWED', true);
}

// Core helper functions for headless Moodle environments
if (!function_exists('get_config')) {
    function get_config($plugin = 'core', $name = null) {
        global $CFG;
        if (!empty($name) && isset($CFG->$name)) {
            return $CFG->$name;
        }
        if (!empty($plugin) && !empty($name) && isset($CFG->forced_plugin_settings[$plugin][$name])) {
            return $CFG->forced_plugin_settings[$plugin][$name];
        }
        return false;
    }
}
if (!function_exists('get_string')) {
    function get_string($identifier, $component = '', $a = null) {
        return $identifier;
    }
}
if (!function_exists('get_string_manager')) {
    function get_string_manager() {
        static $manager = null;
        if ($manager === null) {
            $manager = new class {
                public function string_exists($identifier, $component = '') {
                    return true;
                }
                public function get_string($identifier, $component = '', $a = null, $lang = null) {
                    return $identifier;
                }
                public function load_component_strings($component, $lang = null) {
                    return [];
                }
                public function get_list_of_countries($sort = true, $capitalize = true) {
                    return [];
                }
                public function get_list_of_translations($sort = true) {
                    return [];
                }
                public function get_list_of_languages() {
                    return [];
                }
                public function __call($name, $args) {
                    return [];
                }
            };
        }
        return $manager;
    }
}
if (!defined('DEBUG_NONE')) {
    define('DEBUG_NONE', 0);
}
if (!defined('DEBUG_MINIMAL')) {
    define('DEBUG_MINIMAL', 5);
}
if (!defined('DEBUG_NORMAL')) {
    define('DEBUG_NORMAL', 15);
}
if (!defined('DEBUG_ALL')) {
    define('DEBUG_ALL', 6143);
}
if (!defined('DEBUG_DEVELOPER')) {
    define('DEBUG_DEVELOPER', 32767);
}

if (!defined('core\DEBUG_DEVELOPER')) {
    eval('namespace core {
        if (!defined("core\DEBUG_NONE")) {
            define("core\DEBUG_NONE", 0);
            define("core\DEBUG_MINIMAL", 5);
            define("core\DEBUG_NORMAL", 15);
            define("core\DEBUG_ALL", 6143);
            define("core\DEBUG_DEVELOPER", 32767);
        }
    }');
}

if (!function_exists('core\debugging')) {
    eval('namespace core { function debugging($message = "", $level = 0, $backtrace = null) {} }');
}
if (!function_exists('core\get_string_manager')) {
    eval('namespace core { function get_string_manager() { return \get_string_manager(); } }');
}
if (!function_exists('core\get_string')) {
    eval('namespace core { function get_string($identifier, $component = "", $a = null) { return \get_string($identifier, $component, $a); } }');
}
if (!function_exists('core\get_config')) {
    eval('namespace core { function get_config($plugin = "core", $name = null) { return \get_config($plugin, $name); } }');
}

if (!function_exists('clean_param')) {
    function clean_param($param, $type) {
        return $param;
    }
}
if (!function_exists('plugin_supports')) {
    function plugin_supports($type, $name, $feature, $default = null) {
        return $default !== null ? $default : true;
    }
}
if (!function_exists('component_callback')) {
    function component_callback($component, $function, array $params = [], $default = null) {
        return $default;
    }
}
if (!function_exists('get_plugin_list')) {
    function get_plugin_list($plugintype) {
        return [];
    }
}
if (!function_exists('get_list_of_countries')) {
    function get_list_of_countries() {
        return [];
    }
}
if (!function_exists('get_list_of_themes')) {
    function get_list_of_themes() {
        return [];
    }
}
if (!function_exists('core\get_list_of_themes')) {
    eval('namespace core { function get_list_of_themes() { return []; } }');
}

// 7. Secondary Fallback Autoloader for missing core structures, interfaces or subplugins
spl_autoload_register(function (string $fallbackClass) {
    $cleanClass = ltrim($fallbackClass, '\\');
    $parts      = explode('\\', $cleanClass);
    $shortName  = end($parts);
    $namespace  = count($parts) > 1 ? implode('\\', array_slice($parts, 0, -1)) : '';

    if (in_array($shortName, ['renderable', 'templatable', 'named_templatable', 'cacheable_object', 'cachable_object', 'cacheable_object_array']) || str_ends_with($shortName, '_interface')) {
        $code = ($namespace !== '' ? "namespace $namespace;\n" : '') . "interface $shortName {}";
        @eval($code);
        return true;
    }

    if ($shortName === 'theme_config') {
        $code = ($namespace !== '' ? "namespace $namespace;\n" : '') . 'class theme_config {
            const DEFAULT_THEME = "boost";
            public static function find_all_themes() { return []; }
            public static function load($theme) { return new self(); }
            public function __get($name) { return null; }
        }';
        @eval($code);
        return true;
    }

    if ($shortName === 'external_value') {
        $code = ($namespace !== '' ? "namespace $namespace;\n" : '') . 'class external_value {
            public $desc; public $required; public $default; public $allownull; public $type;
            public function __construct($type, $desc = "", $required = 1, $default = null, $allownull = true) {
                $this->type = $type; $this->desc = $desc; $this->required = $required; $this->default = $default; $this->allownull = $allownull;
            }
        }';
        @eval($code);
        return true;
    }

    if ($shortName === 'external_single_structure' || $shortName === 'external_function_parameters') {
        $code = ($namespace !== '' ? "namespace $namespace;\n" : '') . 'class ' . $shortName . ' {
            public $desc; public $required; public $default; public $allownull; public $keys;
            public function __construct(array $keys = [], $desc = "", $required = 1, $default = null, $allownull = false) {
                $this->keys = $keys; $this->desc = $desc; $this->required = $required; $this->default = $default; $this->allownull = $allownull;
            }
        }';
        @eval($code);
        return true;
    }

    if ($shortName === 'external_multiple_structure' || $shortName === 'external_warnings' || $shortName === 'external_files') {
        $code = ($namespace !== '' ? "namespace $namespace;\n" : '') . 'class ' . $shortName . ' {
            public $desc; public $required; public $default; public $allownull; public $content;
            public function __construct($content = null, $desc = "", $required = 1, $default = null, $allownull = false) {
                $this->content = $content; $this->desc = $desc; $this->required = $required; $this->default = $default; $this->allownull = $allownull;
            }
        }';
        @eval($code);
        return true;
    }

    if ($shortName === 'exporter') {
        $code = ($namespace !== '' ? "namespace $namespace;\n" : '') . 'abstract class exporter {
            public static function get_read_structure() {
                $props = static::define_properties();
                $keys = [];
                foreach ($props as $name => $spec) {
                    $type = isset($spec[\'type\']) ? $spec[\'type\'] : "text";
                    $req = !empty($spec[\'optional\']) ? 2 : 1;
                    $keys[$name] = class_exists("\\\\core_external\\\\external_value", false)
                        ? new \\core_external\\external_value($type, "", $req)
                        : new \\external_value($type, "", $req);
                }
                return class_exists("\\\\core_external\\\\external_single_structure", false)
                    ? new \\core_external\\external_single_structure($keys, "Read structure")
                    : new \\external_single_structure($keys, "Read structure");
            }
            protected static function define_properties() { return []; }
        }';
        @eval($code);
        return true;
    }

    $code = '';
    if ($namespace !== '') {
        $code .= "namespace $namespace;\n";
    }
    $code .= "class $shortName {
        public function __construct(...\$args) {}
        public function __call(\$method, \$args) { return null; }
        public static function __callStatic(\$method, \$args) {
            if (\$method === 'get_read_structure' || \$method === 'get_create_structure' || \$method === 'get_update_structure' || str_ends_with(\$method, '_structure') || str_ends_with(\$method, '_returns') || \$method === 'execute_returns') {
                return (object)['keys' => [], 'desc' => 'Fallback', 'required' => 1];
            }
            if (\$method === 'define_properties' || \$method === 'define_other_properties' || \$method === 'define_related' || \$method === 'read_properties_definition') {
                return [];
            }
            return null;
        }
    }";
    @eval($code);
    return true;
});

// 8. Load Foundation Web Services and Core Libraries directly from Moodle source
$safeCoreLibraries = [
    $CFG->dirroot . '/cache/classes/interfaces.php',
    $CFG->libdir . '/setuplib.php',
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

$fullPath = $moodleRoot . '/' . ltrim($file, '/');

if (!file_exists($fullPath)) {
    $publicPath = $moodleRoot . '/public/' . ltrim($file, '/');
    if (file_exists($publicPath)) {
        $fullPath = $publicPath;
    } else {
        emit_cli_error(2, "Class file not found on disk: {$fullPath}");
    }
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
    $cleanClass = '\\' . ltrim($class, '\\');

    $paramMethod = resolve_signature_method($cleanClass, $method, 'parameters');
    $parameters = $paramMethod !== null ? $cleanClass::$paramMethod() : null;

    $returnMethod = resolve_signature_method($cleanClass, $method, 'returns');
    $returns = $returnMethod !== null ? $cleanClass::$returnMethod() : null;

    ob_end_clean();

    $outputJson = json_encode([
        'parameters' => $parameters,
        'returns'    => $returns
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);

    fwrite(STDOUT, $outputJson);
    exit(0);
} catch (\Throwable $e) {
    emit_cli_error(4, "Exception during signature execution for {$class}::{$method}: " . $e->getMessage(), $e);
}

