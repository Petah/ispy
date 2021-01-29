<?php

namespace App\Serializers;

interface ModelInterface
{
    public function getJsonApiId(): ?string;

    public function getJsonApiType(): string;
}
