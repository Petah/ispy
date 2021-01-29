<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;
use Rhino\InputData\InputData;

class Logger
{
    public static function logDebug(string $message, array $context = [])
    {
        Log::debug($message, $context);
    }

    public static function logInfo(string $message, array $context = [])
    {
        Log::info($message, $context);
    }

    public static function logError(string $message, array $context = [])
    {
        Log::error($message, $context);
    }

    public static function implodeMessages(...$messages): string
    {
        $message = '';
        foreach ($messages as $arg) {
            $message .= static::logType($arg) . ' ';
        }
        return $message;
    }

    public static function logType($arg)
    {
        if (is_null($arg)) {
            return 'NULL';
        }
        if ($arg === '') {
            return '(blank string)';
        }
        if (is_bool($arg)) {
            return $arg ? 'TRUE' : 'FALSE';
        }
        if (is_array($arg)) {
            return '[' . implode(', ', array_map(function ($key, $value) {
                return static::logType($key) . ': ' . static::logType($value);
            }, array_keys($arg), $arg)) . ']';
        }
        if ($arg instanceof \Throwable) {
            $context = null;
            if (method_exists($arg, 'getContext')) {
                $context = static::logType($arg->getContext());
            }
            return PHP_EOL . PHP_EOL . implode(' ', [
                get_class($arg),
                $arg->getMessage(),
                $arg->getFile(),
                $arg->getLine(),
            ]) . PHP_EOL . implode(PHP_EOL, static::exceptionTraceToString($arg)) . PHP_EOL . $context . PHP_EOL;
        }
        if ($arg instanceof \DateTimeInterface) {
            return $arg->format(DATE_ISO8601);
        }
        if (is_object($arg)) {
            if ($arg instanceof InputData) {
                return static::logType($arg->getData());
            } else {
                return 'OBJECT ' . get_class($arg) . ' ' . static::logType(get_object_vars($arg));
            }
        }
        return (string) $arg;
    }

    public static function exceptionTraceToString($exception)
    {
        $trace = [];
        foreach ($exception->getTrace() as $line) {
            $text = '';
            if (isset($line['line'])) {
                $text .= '#' . $line['line'];
            }
            $text .= ' ';
            if (isset($line['class'])) {
                $text .= $line['class'];
            }
            if (isset($line['type'])) {
                $text .= $line['type'];
            }
            if (isset($line['function'])) {
                $text .= $line['function'];
            }
            $text .= ' ';
            if (isset($line['file'])) {
                $text .= $line['file'];
            }
            $trace[] = trim($text);
        }
        return $trace;
    }
}
