<?php

namespace App\Console;

use App\Helpers\Logger;

abstract class BaseCommand extends \Illuminate\Console\Command
{
    public static function logDebug(string $message, array $context = [])
    {
        Logger::logDebug($message, $context);
        if (PHP_SAPI === 'cli') {
            echo Logger::implodeMessages($message, $context) . PHP_EOL;
        }
    }

    public static function logInfo(string $message, array $context = [])
    {
        Logger::logInfo($message, $context);
        if (PHP_SAPI === 'cli') {
            echo Logger::implodeMessages($message, $context) . PHP_EOL;
        }
    }

    public static function logError(string $message, array $context = [])
    {
        Logger::logError($message, $context);
        if (PHP_SAPI === 'cli') {
            echo Logger::implodeMessages($message, $context) . PHP_EOL;
        }
    }
}
