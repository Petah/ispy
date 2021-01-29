<?php

namespace App\Helpers;

class Json
{
    public static function encode($data, int $options = 0): string
    {
        $data = json_encode($data, $options);
        $error = json_last_error();
        if ($error !== JSON_ERROR_NONE) {
            throw new \Exception('JSON encode error: ' . json_last_error_msg());
        }
        return $data;
    }

    public static function decode($json, bool $assoc = true)
    {
        $data = json_decode($json, $assoc);
        $error = json_last_error();
        if ($error !== JSON_ERROR_NONE) {
            throw new \Exception('JSON encode error: ' . json_last_error_msg() . ' in ' . $json);
        }
        return $data;
    }
}
