<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Crypt;

class Token
{
    public static function decode($token): ?InputData
    {
        try {
            $payload = Crypt::decryptString($token);
            $payload = Json::decode($payload);
            $payload = new InputData($payload);
            return $payload;
        } catch (\Exception $e) {
            return null;
        }
    }

    public static function encode($payload): string
    {
        $payload = Json::encode($payload);
        $token = Crypt::encryptString($payload);
        return $token;
    }

    public static function isExpired(?int $time, int $validDuration): bool
    {
        if (!$time) {
            return true;
        }
        return $time + $validDuration < time();
    }
}
