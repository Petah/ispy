<?php
namespace App\Serializers\Api;

class ScoreSerializer extends \App\Serializers\BaseSerializer
{
    /**
     * @param \App\Models\Score $entity
     */
    protected function iterateAttributes(?\App\Serializers\ModelInterface $entity)
    {
        yield 'createdAt' => $this->format->dateTime($entity->getCreatedAt());
        yield 'updatedAt' => $this->format->dateTime($entity->getUpdatedAt());
        yield 'deletedAt' => $this->format->dateTime($entity->getDeletedAt());
    }

    /**
     * @param \App\Models\Score $entity
     */
    protected function iterateRelationships(?\App\Serializers\ModelInterface $entity)
    {
    }
}
