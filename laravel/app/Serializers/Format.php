<?php

namespace App\Serializers;

use Carbon\Carbon;

class Format
{
    public function uuid($uuid)
    {
        return $uuid ? uuidString($uuid) : null;
    }

    public function dateTime(?Carbon $dateTime, $timeZone = null, $convertTimeZone = true)
    {
        if (!$dateTime) {
            return null;
        }
        if ($timeZone) {
            if (is_string($timeZone)) {
                $timeZone = new \DateTimeZone($timeZone);
            }
            if (!$convertTimeZone) {
                return (new \DateTime($dateTime->format('Y-m-d H:i:s'), $timeZone))->format(DATE_ISO8601);
            }
            return $dateTime->setTimeZone($timeZone)->format(DATE_ISO8601);
        }
        return $dateTime->format(DATE_ISO8601);
    }
}
