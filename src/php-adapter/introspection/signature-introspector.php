<?php
declare(strict_types=1);

namespace Didactika\MoodleClientSchemas\Introspection;

use Didactika\MoodleClientSchemas\Autoloader\JitAutoloader;

/**
 * Raised when a service signature cannot be extracted faithfully.
 * Carries a machine-readable WebServiceErrorCode so the TypeScript side never parses messages.
 */
class IntrospectionException extends \RuntimeException {
    public const CLASS_NOT_FOUND = 'CLASS_NOT_FOUND';
    public const PERMISSION_DENIED = 'PERMISSION_DENIED';
    public const INTROSPECTION_FAILED = 'INTROSPECTION_FAILED';

    /** @var string Machine-readable error code */
    private string $errorCode;

    /**
     * @param string $message Human-readable message.
     * @param string $errorCode Machine-readable error code.
     * @param \Throwable|null $previous Wrapped exception.
     */
    public function __construct(string $message, string $errorCode = self::INTROSPECTION_FAILED, ?\Throwable $previous = null) {
        parent::__construct($message, 0, $previous);
        $this->errorCode = $errorCode;
    }

    /**
     * @return string Machine-readable error code.
     */
    public function getErrorCode(): string {
        return $this->errorCode;
    }

    /**
     * Resolves the error code of any throwable; foreign exceptions are introspection failures.
     *
     * @param \Throwable $e Caught exception.
     * @return string Machine-readable error code.
     */
    public static function codeOf(\Throwable $e): string {
        return $e instanceof self ? $e->getErrorCode() : self::INTROSPECTION_FAILED;
    }
}

/**
 * Strict signature introspector mirroring Moodle's external_api::external_function_info contract:
 * the service class must really exist and expose both {method}_parameters() and {method}_returns().
 */
class SignatureIntrospector {
    /**
     * Loads the real service class without letting the JIT autoloader synthesize a stub for it.
     *
     * @param string $className Service class name.
     * @return string Normalized class name without leading backslash.
     * @throws IntrospectionException When the class does not exist in the Moodle codebase.
     */
    public static function loadServiceClass(string $className): string {
        $cleanClass = ltrim($className, '\\');
        JitAutoloader::protect($cleanClass);
        try {
            $exists = class_exists($cleanClass);
        } finally {
            JitAutoloader::release($cleanClass);
        }
        if (!$exists || JitAutoloader::isSynthesized($cleanClass)) {
            throw new IntrospectionException(
                "Class '{$cleanClass}' was not found in the Moodle codebase",
                IntrospectionException::CLASS_NOT_FOUND
            );
        }
        return $cleanClass;
    }

    /**
     * Invokes {method}_{type}() on the service class, failing when the method is missing or throws.
     *
     * @param string $className Loaded class name.
     * @param string $methodName Service method name.
     * @param string $type Signature type ('parameters' or 'returns').
     * @return mixed Signature description returned by Moodle.
     * @throws IntrospectionException When the method is missing or fails.
     */
    public static function callSignatureMethod(string $className, string $methodName, string $type) {
        $target = "{$methodName}_{$type}";
        if (!method_exists($className, $target)) {
            throw new IntrospectionException("Method {$className}::{$target}() does not exist");
        }
        try {
            return call_user_func([$className, $target]);
        } catch (\Throwable $e) {
            throw new IntrospectionException(
                "{$className}::{$target}() threw " . get_class($e) . ': ' . $e->getMessage(),
                IntrospectionException::INTROSPECTION_FAILED,
                $e
            );
        }
    }

    /**
     * Fails when the extracted signature relied on structures synthesized by the JIT autoloader.
     *
     * @return void
     * @throws IntrospectionException When synthetic fallback structures were used.
     */
    public static function assertNoSyntheticStructures(): void {
        $fallbacks = JitAutoloader::getFallbackUsages();
        if (!empty($fallbacks)) {
            throw new IntrospectionException(
                'Signature depends on classes missing from the Moodle codebase (synthetic stubs used: ' . implode(', ', $fallbacks) . ')'
            );
        }
    }

    /**
     * Extracts the parameters and returns signature of a single service.
     *
     * @param string $className Service class name.
     * @param string $methodName Service method name.
     * @return array{parameters: mixed, returns: mixed} Extracted signature.
     * @throws IntrospectionException When the signature cannot be extracted faithfully.
     */
    public static function introspect(string $className, string $methodName): array {
        JitAutoloader::resetFallbackUsages();
        $cleanClass = self::loadServiceClass($className);
        $signature = [
            'parameters' => self::callSignatureMethod($cleanClass, $methodName, 'parameters'),
            'returns'    => self::callSignatureMethod($cleanClass, $methodName, 'returns')
        ];
        self::assertNoSyntheticStructures();
        return $signature;
    }

    /**
     * Ensures a resolved class file can be loaded, distinguishing missing from unreadable files.
     *
     * @param string|null $fullPath Resolved file path, or null when no candidate exists.
     * @param string $displayPath Path shown in error messages.
     * @return string Readable file path.
     * @throws IntrospectionException When the file is missing or unreadable.
     */
    public static function assertLoadableFile(?string $fullPath, string $displayPath): string {
        if ($fullPath === null) {
            throw new IntrospectionException("Class file not found on disk: {$displayPath}", IntrospectionException::CLASS_NOT_FOUND);
        }
        if (!is_readable($fullPath)) {
            throw new IntrospectionException("Class file is not readable (permission denied): {$fullPath}", IntrospectionException::PERMISSION_DENIED);
        }
        return $fullPath;
    }

    /**
     * Encodes a payload as JSON, replacing invalid UTF-8 sequences instead of failing.
     *
     * @param mixed $payload Payload to encode.
     * @return string JSON string.
     * @throws \JsonException When the payload cannot be encoded.
     */
    public static function encodeJson($payload): string {
        return json_encode(
            $payload,
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE | JSON_THROW_ON_ERROR
        );
    }
}
