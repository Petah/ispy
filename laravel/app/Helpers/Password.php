<?php

namespace App\Helpers;

class Password
{
    public static function isPasswordSecure(string $password): bool
    {
        $zxcvbn = new \ZxcvbnPhp\Zxcvbn();
        $strength = $zxcvbn->passwordStrength($password);
        return $strength['score'] >= 1;
    }
}
