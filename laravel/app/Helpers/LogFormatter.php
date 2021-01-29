<?php

namespace App\Helpers;

class LogFormatter implements \Monolog\Formatter\FormatterInterface
{
    public function format(array $record)
    {
        $output = [
            'date' => (string) $record['datetime'],
            'message' => $record['message'],
        ];
        foreach ($record['context'] as $key => $value) {
            $output[$key] = $value;
        }
        $encoded = json_encode($output);
        return $encoded . "\n";
    }

    public function formatBatch(array $records)
    {
        return implode("\n", array_map(fn ($record) => $this->format($record), $records)) . "\n";
    }
}
