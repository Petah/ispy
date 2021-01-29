<?php

namespace App\Models;

use App\Helpers\Uuid;
use App\Serializers\ModelInterface;
use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model implements ModelInterface
{
    protected $primaryKey = 'uuid';
    protected $keyType = 'string';
    public $incrementing = false;

    public function save(array $options = [])
    {
        if (!$this->getUuid()) {
            $this->setUuid(Uuid::create());
        }
        return parent::save($options);
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

    public function getJsonApiId(): ?string
    {
        return $this->getUuid();
    }

    public function getJsonApiType(): string
    {
        return (new \ReflectionClass($this))->getShortName();
    }

    public function getCreatedAt(): ?\Carbon\Carbon
    {
        return $this->created_at;
    }

    public function formatCreatedAt(): string
    {
        return $this->getCreatedAt() . ', ' . $this->getCreatedAt()->diffForHumans();
    }

    public function getUpdatedAt(): ?\Carbon\Carbon
    {
        return $this->updated_at;
    }

    public function formatUpdatedAt(): string
    {
        return $this->getUpdatedAt() . ', ' . $this->getUpdatedAt()->diffForHumans();
    }

    public function getDeletedAt(): ?\Carbon\Carbon
    {
        return $this->deleted_at;
    }

    public function formatDeletedAt(): string
    {
        if (!$this->getDeletedAt()) {
            return null;
        }
        return $this->getDeletedAt() . ', ' . $this->getDeletedAt()->diffForHumans();
    }

    public function clearDeletedAt()
    {
        $this->deleted_at = null;
        return $this;
    }
}
