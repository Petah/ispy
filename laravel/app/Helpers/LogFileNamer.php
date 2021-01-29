<?php

namespace App\Helpers;

use Monolog\Handler\RotatingFileHandler;

class LogFileNamer
{
    public function __invoke($logger)
    {
        foreach ($logger->getHandlers() as $handler) {
            if ($handler instanceof RotatingFileHandler) {
                $handler->setFilenameFormat('{filename}-' . php_sapi_name() . '-' . trim(`whoami`) . '-{date}', 'Y-m-d');
            }
        }
    }
}
