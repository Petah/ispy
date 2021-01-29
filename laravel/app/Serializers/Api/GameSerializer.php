<?php
namespace App\Serializers\Api;

class GameSerializer extends \App\Serializers\BaseSerializer
{
    /**
     * @param \App\Models\Game $entity
     */
    protected function iterateAttributes(?\App\Serializers\ModelInterface $entity)
    {
        yield 'name' => $entity->getName();
        yield 'createdAt' => $this->format->dateTime($entity->getCreatedAt());
        yield 'updatedAt' => $this->format->dateTime($entity->getUpdatedAt());
        yield 'deletedAt' => $this->format->dateTime($entity->getDeletedAt());
    }

    /**
     * @param \App\Models\Game $entity
     */
    protected function iterateRelationships(?\App\Serializers\ModelInterface $entity)
    {
    }
}
