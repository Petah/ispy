<?php

namespace App\Helpers;

class ErrorMessages implements \IteratorAggregate, \JsonSerializable
{
    protected $errorMessages = [];

    public function get($path)
    {
        if (isset($this->errorMessages[$path])) {
            $value = $this->errorMessages[$path];
            unset($this->errorMessages[$path]);
            return $value;
        }
        return null;
    }

    public function add($path, $message)
    {
        $this->errorMessages[$path][] = $message;
    }

    public function isEmpty()
    {
        return empty($this->errorMessages);
    }

    public function getErrorMessages()
    {
        return $this->errorMessages;
    }

    public function getIterator()
    {
        foreach ($this->errorMessages as $key => $errorMessages) {
            foreach ($errorMessages as $errorMessage) {
                yield $key => $errorMessage;
            }
        }
    }

    public function jsonSerialize()
    {
        return $this->errorMessages;
    }

    public function toArray()
    {
        $array = [];
        foreach ($this->errorMessages as $key => $value) {
            foreach ($value as $error) {
                $array[] = urlencode($key . '[]') . '=' . urlencode($error);
            }
        }
        $array = implode('&', $array);
        parse_str($array, $result);
        return $result;
    }

    public function formatErrorMessage($field, $message)
    {
        $humanField = $this->humanise($field);
        switch ($message) {
            case 'This field was not expected.': {
                    $message = "$humanField was not expected.";
                    break;
                }
            case 'This field is missing.': {
                    $message = "$humanField field is missing.";
                    break;
                }
            case 'This value should not be blank.': {
                    $message = "$humanField should not be blank.";
                    break;
                }
        }

        return $message;
    }

    public function renderRemaining()
    {
        $result = [];
        foreach ($this->errorMessages as $key => $errorMessages) {
            foreach ($errorMessages as $message) {
                $result[] = $this->formatErrorMessage($key, $message);
            }
        }
        if (empty($result)) {
            return '';
        }
        return '<div class="alert alert-danger p-errors-remaining">' . implode(' ', $result) . '</div>';
    }

    private function humanise($value)
    {
        if ($value == 'id') {
            return 'ID';
        }
        if ($value == 'uuid') {
            return 'UUID';
        }
        $value = preg_replace('/[^a-z0-9]+/i', ' ', $value);
        $value = preg_replace('/\bid\b/i', 'ID', $value);
        $value = preg_replace('/\buuid\b/i', 'UUID', $value);
        $value = ucwords($value);
        return $value;
    }
}
