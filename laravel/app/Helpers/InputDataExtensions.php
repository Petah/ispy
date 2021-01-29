<?php

namespace App\Helpers;

trait InputDataExtensions
{
    public function uuid(?string $name = null, $default = null): ?string
    {
        $string = $this->string($name, $default);
        if ($string === $default || !$string || !Uuid::isValid($string)) {
            return $default;
        }
        return $string;
    }

    public function token(?string $name = null, string $type, $default = null): ?InputData
    {
        $string = $this->string($name, $default);
        if ($string === $default || !$string) {
            return $default;
        }
        $token = Token::decode($string);
        if (!$token) {
            return $default;
        }
        if ($token->string('type') !== $type) {
            return $default;
        }
        return $token;
    }
}
