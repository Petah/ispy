<?php

namespace App\Serializers;

use App\Exceptions\SerializerException;
use App\Models\User;

class BaseSerializer implements \JsonSerializable
{
    /**
     * @var \App\Serializers\ModelInterface Entity[]|Entity to serialize
     */
    protected $entities;

    /**
     * Extra meta data to output
     */
    protected ?array $meta;

    protected array $included = [];

    protected Format $format;

    protected ?User $userCurrent = null;

    /**
     * @param mixed[] $meta Extra meta data to include in the JSON API response
     */
    public function __construct($entities = null, array $meta = null)
    {
        $this->validateEntities($entities);
        $this->entities = $entities;
        $this->meta = $meta;
        $this->format = new Format();
    }

    private function validateEntities($entities): bool
    {
        if ($entities === null || is_bool($entities)) {
            return true;
        }
        if (is_iterable($entities)) {
            return true;
        }
        if (!is_object($entities)) {
            throw new SerializerException('Unexpected entity type: ' . gettype($entities));
        }
        if ($entities instanceof ModelInterface) {
            return true;
        }

        throw new SerializerException('Unexpected entity class: ' . get_class($entities));
    }

    public function jsonSerialize()
    {
        $meta = $this->meta ?: [];
        if (\config('app.debug')) {
            $meta['included'] = $this->included;
        }

        if (empty($meta)) {
            $meta = new \stdClass();
        }

        if ($this->entities === null) {
            return [
                'meta' => $meta,
                'data' => null,
            ];
        }
        $stack = [];
        if (is_iterable($this->entities)) {
            if (count($this->entities) === 0) {
                return [
                    'meta' => $meta,
                    'data' => [],
                ];
            }
            foreach ($this->entities as $entity) {
                $stack[] = [$this, $entity];
            }
        } else {
            $stack[] = [$this, $this->entities];
        }

        // Fetch all entity data, non recursively, ensuring entities are only included once
        $fetchedEntities = [];
        do {
            [$serializer, $entity] = array_shift($stack);
            $id = $serializer->getId($entity ?: null);
            $type = $serializer->getType($entity ?: null);
            $includedKey = $type . ':' . $id;
            if (!isset($fetchedEntities[$includedKey])) {
                $attributes = $serializer->getAttributes($entity ?: null);
                $fetchedEntities[$includedKey] = [
                    'id' => (string) $id,
                    'type' => $type,
                    'attributes' => empty($attributes) ? new \stdClass() : $attributes,
                    'relationships' => [],
                ];

                foreach ($serializer->iterateRelationships($entity ?: null) ?: [] as $relationshipName => [$relatedSerializerClass, $relatedEntitiesCallback]) {
                    if ($this->isIncluded($type, $relationshipName)) {
                        $relatedEntities = $relatedEntitiesCallback();
                        if (!is_iterable($relatedEntities)) {
                            $relatedEntity = $relatedEntities;

                            if (!$relatedEntity) {
                                continue;
                            }
                            $relatedSerializer = new $relatedSerializerClass($relatedEntity);
                            $relatedSerializer->setIncluded($this->included);
                            $relatedSerializer->setUserCurrent($this->userCurrent);
                            $relatedIncludedKey = $relatedSerializer->getType($relatedEntity ?: null) . ':' . $relatedSerializer->getId($relatedEntity ?: null);
                            $fetchedEntities[$includedKey]['relationships'][$relationshipName] = [
                                'data' => [
                                    'id' => $relatedSerializer->getId($relatedEntity ?: null),
                                    'type' => $relatedSerializer->getType($relatedEntity ?: null),
                                ],
                            ];
                            if (!isset($fetchedEntities[$relatedIncludedKey])) {
                                $stack[] = [$relatedSerializer, $relatedEntity];
                            }
                        } else {
                            foreach ($relatedEntities as $relatedEntity) {
                                if (!$relatedEntity) {
                                    continue;
                                }
                                $relatedSerializer = new $relatedSerializerClass($relatedEntity);
                                $relatedSerializer->setIncluded($this->included);
                                $relatedSerializer->setUserCurrent($this->userCurrent);
                                $relatedIncludedKey = $relatedSerializer->getType($relatedEntity ?: null) . ':' . $relatedSerializer->getId($relatedEntity ?: null);
                                if (!isset($fetchedEntities[$includedKey]['relationships'][$relationshipName])) {
                                    $fetchedEntities[$includedKey]['relationships'][$relationshipName] = [
                                        'data' => [],
                                    ];
                                }
                                $fetchedEntities[$includedKey]['relationships'][$relationshipName]['data'][] = [
                                    'id' => $relatedSerializer->getId($relatedEntity ?: null),
                                    'type' => $relatedSerializer->getType($relatedEntity ?: null),
                                ];
                                if (!isset($fetchedEntities[$relatedIncludedKey])) {
                                    $stack[] = [$relatedSerializer, $relatedEntity];
                                }
                            }
                        }
                    }
                }
            }
        } while (!empty($stack));

        foreach ($fetchedEntities as $includedId => $fetchedEntity) {
            if (empty($fetchedEntities[$includedId]['relationships'])) {
                unset($fetchedEntities[$includedId]['relationships']);
            }
        }

        // Prepare final JSON API data
        if (is_iterable($this->entities)) {
            $data = [];
            foreach ($this->entities as $entity) {
                $includedKey = $this->getType($entity ?: null) . ':' . $this->getId($entity ?: null);
                $data[] = $fetchedEntities[$includedKey];
                unset($fetchedEntities[$includedKey]);
            }
        } else {
            $includedKey = $this->getType($this->entities ?: null) . ':' . $this->getId($this->entities ?: null);
            $data = $fetchedEntities[$includedKey];
            unset($fetchedEntities[$includedKey]);
        }
        $jsonApiData = [
            'meta' => $meta,
            'data' => $data,
        ];

        $jsonApiData['included'] = array_values($fetchedEntities);

        return $jsonApiData;
    }

    public function toFlatJson(): array
    {
        $jsonApi = $this->jsonSerialize();
        $result = [];
        if (isset($jsonApi['data']['id'])) {
            // Single entity
            $result['id'] = $jsonApi['data']['id'];
            foreach ($jsonApi['data']['attributes'] as $key => $value) {
                $result[$key] = $value;
            }
        } else {
            // @todo
            throw new \Exception('Multiple entities in flat JSON is not supported yet');
        }
        return $result;
    }

    /**
     * Gets the ID for a entity. Serializer child classes can override this to allow custom IDs.
     */
    protected function getId(?ModelInterface $entity): ?string
    {
        return (string) $entity->getJsonApiId();
    }

    /**
     * Gets the type for a entity. Serializer child classes can override this to allow custom types.
     */
    protected function getType(?ModelInterface $entity): string
    {
        return $entity->getJsonApiType();
    }

    /**
     * Gets the attributes for a entity. Serializer child classes should override this to whitelist attributes.
     * By default all attributes of the model are returned (excluding the ID).
     *
     * @return mixed[]
     */
    protected function iterateAttributes(?ModelInterface $entity)
    {
        return [];
    }

    /**
     * Converts an entities attributes to an array and formats any special types (like dates to ISO 8601 format).
     *
     * @return mixed[]
     */
    protected function getAttributes(?ModelInterface $entity)
    {
        $result = [];
        foreach ($this->iterateAttributes($entity) as $key => $value) {
            if ($value instanceof \DateTimeInterface) {
                $value = $value->format(DATE_ISO8601);
            }
            $result[$key] = $value;
        }

        return $result;
    }

    /**
     * Gets the related entities for a entity. Serializer child classes must override this to allow including related entities.
     * Items of the array or generator must be serializers.
     *
     * @return \App\Serializers\BaseSerializer[]
     */
    protected function iterateRelationships(?ModelInterface $entity)
    {
        return [];
    }

    private function isIncluded(string $type, string $relationshipName): bool
    {
        if ($this->included === null) {
            return true;
        }

        return in_array($type . '.' . $relationshipName, $this->included);
    }

    public function setIncluded(?array $included)
    {
        $this->included = $included;

        return $this;
    }

    public function setUserCurrent(?User $userCurrent)
    {
        $this->userCurrent = $userCurrent;

        return $this;
    }
}
