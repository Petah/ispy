<?php

namespace App\Helpers;

use App\Models\User;
use Symfony\Component\Validator\Constraints;

class TimeZone
{
    public static function formatUserTimeZone($value, User $user)
    {
        if ($value === null) {
            return null;
        }
        if ($value instanceof \DateTime) {
            $date = \DateTimeImmutable::createFromMutable($value);
        } elseif ($value instanceof \DateTimeImmutable) {
            $date = $value;
        } else {
            try {
                $date = new \DateTimeImmutable($value, new \DateTimeZone('UTC'));
            } catch (\Exception $exception) {
                // @todo optional default value
                return $value;
            }
        }
        $date = $date->setTimezone(new \DateTimeZone($user->getTimeZone()));
        $value = $date->format('Y-m-d H:i:s');
        return $value;
    }

    public static function getTimeZones(): array
    {
        $timeZones = [];
        foreach (\DateTimeZone::listIdentifiers() as $timezone) {
            $offset = (new \DateTime('now', new \DateTimeZone($timezone)))->getOffset() / 60 / 60;
            $timeZones[$timezone] = static::formatTimezoneOffset($offset);
        }
        uksort($timeZones, function ($a, $b) {
            if ($a === 'UTC') {
                return -1;
            }
            if ($b === 'UTC') {
                return 1;
            }
            return strcasecmp($a, $b);
        });
        return $timeZones;
    }

    public static function getTimeZoneOptions(): array
    {
        return array_map(function ($name, $offset) {
            return [
                'text' => $name . ' ' . $offset,
                'value' => $name,
            ];
        }, array_keys(static::getTimeZones()), static::getTimeZones());
    }

    public static function getTimeZoneConstraint(): Constraints\Choice
    {
        return new Constraints\Choice([
            'choices' => array_map(function ($name) {
                return $name;
            }, array_keys(static::getTimeZones())),
        ]);
    }

    public static function formatTimezoneOffset(float $decimal): string
    {
        $seconds = ($decimal * 3600);
        $hours = floor($decimal);
        $seconds -= $hours * 3600;
        $minutes = floor($seconds / 60);
        $seconds -= $minutes * 60;
        if ($hours >= 0) {
            $hours = '+' . (strlen($hours) < 2 ? '0' . $hours : $hours);
        } else {
            $hours = '-' . (strlen(abs($hours)) < 2 ? '0' . abs($hours) : abs($hours));
        }
        if (strlen($minutes) < 2) {
            $minutes = '0' . $minutes;
        }
        return $hours . ':' . $minutes;
    }
}
