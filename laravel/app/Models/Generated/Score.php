<?php
namespace App\Models\Generated;

abstract class Score extends \App\Models\BaseModel
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
            return 'New Score';
        }
        return 'Score ' . $this->getUuid();
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
}
