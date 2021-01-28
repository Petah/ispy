<?php
namespace App\Serializers\Api;

class LevelSerializer extends \App\Serializers\BaseSerializer
{
    /**
     * @param \App\Models\Level $entity
     */
    protected function iterateAttributes(?\App\Serializers\ModelInterface $entity)
    {
        yield 'name' => $entity->getName();
        yield 'host' => $entity->getHost();
        yield 'image' => $entity->getImage();
        yield 'createdAt' => $this->format->dateTime($entity->getCreatedAt());
        yield 'updatedAt' => $this->format->dateTime($entity->getUpdatedAt());
        yield 'deletedAt' => $this->format->dateTime($entity->getDeletedAt());
    }

    /**
     * @param \App\Models\Level $entity
     */
    protected function iterateRelationships(?\App\Serializers\ModelInterface $entity)
    {
    }
}
