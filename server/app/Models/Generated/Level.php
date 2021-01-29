<?php
namespace App\Models\Generated;

abstract class Level extends \App\Models\BaseModel
{
    use \Illuminate\Database\Eloquent\SoftDeletes;

    protected $casts = [
        'clues' => 'json',
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
            return 'New Level';
        }
        return 'Level ' . $this->getUuid();
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

    public function getHost(): ?string
    {
        return $this->host;
    }

    public function setHost(?string $host): self
    {
        $this->host = $host;
        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;
        return $this;
    }

    public function getThumbnail(): ?string
    {
        return $this->thumbnail;
    }

    public function setThumbnail(?string $thumbnail): self
    {
        $this->thumbnail = $thumbnail;
        return $this;
    }

    public function getRiddle(): ?string
    {
        return $this->riddle;
    }

    public function setRiddle(?string $riddle): self
    {
        $this->riddle = $riddle;
        return $this;
    }

    public function getClues(): \App\Helpers\MutableInputData
    {
        return new \App\Helpers\MutableInputData($this->clues);
    }

    public function setClues($clues)
    {
        $this->clues = $clues;
        return $this;
    }
}
