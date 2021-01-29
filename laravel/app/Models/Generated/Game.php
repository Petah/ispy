<?php
namespace App\Models\Generated;

abstract class Game extends \App\Models\BaseModel
{
    use \Illuminate\Database\Eloquent\SoftDeletes;

    public function formatName(?string $default = null): string
    {
        if ($default !== null) {
            if (strlen($default) > 50) {
                return substr($default, 0, 50) . '...';
            }
            return $default;
        }
        if (!$this->getUuid()) {
            return 'New Game';
        }
        return 'Game ' . $this->getUuid();
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
}
