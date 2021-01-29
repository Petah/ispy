<?php

namespace App\Helpers;

class IpAddressResolver implements \OwenIt\Auditing\Contracts\IpAddressResolver
{
    public static function resolve(): string
    {
        return \request()->header('X-Forwarded-For') || \request()->ip();
    }
}
