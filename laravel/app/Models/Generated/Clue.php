<?php
namespace App\Models\Generated;

abstract class Clue extends \App\Models\BaseModel
{
    use \Illuminate\Database\Eloquent\SoftDeletes;

    protected $casts = [
        'path' => 'json',
    ];

    public function formatName(?string $default = null): string
    {
        if ($default !== null) {
            if (strlen($default) > 50) {
                return substr($default, 0, 50) . '...';
            }
            return $default;
        }
        if (!$this->getUuid()) {
            return 'New Clue';
        }
        return 'Clue ' . $this->getUuid();
    }

    public function getUuid(): ?string
    {
        return $this->uuid;
    }

    public function setUuid(?string $uuid): self
    {
        $this->uuid = $uuid;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getPath(): \App\Helpers\MutableInputData
    {
        return new \App\Helpers\MutableInputData($this->path);
    }

    public function setPath($path)
    {
        $this->path = $path;
        return $this;
    }
}
