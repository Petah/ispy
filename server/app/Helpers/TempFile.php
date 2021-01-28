<?php

namespace App\Helpers;

use GuzzleHttp\Client;

class TempFile
{
    private $path;

    public function __construct($path)
    {
        $this->path = $path;
    }

    public function __destruct()
    {
        if (is_file($this->path)) {
            @unlink($this->path);
        }
    }

    public static function createUnique($extension = null): TempFile
    {
        return new static(storage_path('processor') . '/' . 'temp-file-' . sha1(uniqid('temp-file-', true)) . ($extension ? '.' . $extension : ''));
    }

    public static function download(string $url): TempFile
    {
        $tempFile = static::createUnique();
        $client = new Client();
        $client->get($url, ['save_to' => $tempFile->getPath()]);
        return $tempFile;
    }

    public function getPath(): string
    {
        $this->createDirectory();
        return $this->path;
    }

    public function getHash()
    {
        if (!is_file($this->path)) {
            throw new \Exception('Cannot hash file: ' . $this->path);
        }
        return md5_file($this->path);
    }

    public function createDirectory()
    {
        $directory = dirname($this->path);
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true);
        }
        return $this;
    }

    public function copyFrom(string $path)
    {
        $this->createDirectory();
        copy($path, $this->path);
        return $this;
    }

    public function copyTo(string $path)
    {
        copy($this->path, $path);
        return $this;
    }

    public function putContents(string $data)
    {
        $this->createDirectory();
        file_put_contents($this->path, $data);
        return $this;
    }

    public function getContents(): string
    {
        return file_get_contents($this->path);
    }

    public function getSize(): int
    {
        return filesize($this->path);
    }

    public function isFile(): bool
    {
        return is_file($this->path);
    }

    public function getMimeType(): string
    {
        return Mime::getMimeType($this->getPath());
    }

    public function rename(string $to)
    {
        rename($this->getPath(), $to);
        $this->path = $to;
        return $this;
    }

    public function open()
    {
        $handle = null;
        try {
            return fopen($this->getPath(), 'r');
        } finally {
            if (is_resource($handle)) {
                fclose($handle);
                $handle;
            }
        }
    }
}
