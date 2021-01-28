<?php

namespace App\Helpers;

class InputData extends \Rhino\InputData\InputData
{
    use InputDataExtensions;

    public function lowerCaseKeys(): InputData
    {
        return new static(static::arrayChangeKeyCaseRecursive($this->arr()->getData()));
    }

    private static function arrayChangeKeyCaseRecursive(array $array): array
    {
        return array_map(function ($item) {
            if (is_array($item)) {
                $item = static::arrayChangeKeyCaseRecursive($item);
            }
            return $item;
        }, array_change_key_case($array));
    }
}
