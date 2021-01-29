<?php

namespace App\Helpers;

class Uuid extends \App\Helpers\InputData
{
    public static function create(): string
    {
        return \Ramsey\Uuid\Uuid::uuid4()->toString();
    }

    public static function isValid(string $uuid): bool
    {
        return \Ramsey\Uuid\Uuid::isValid($uuid);
    }
}
