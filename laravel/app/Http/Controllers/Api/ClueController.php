<?php
namespace App\Http\Controllers\Api;

use App\Models\Clue;
use App\Serializers;

class ClueController extends \App\Http\Controllers\BaseController
{
    public function list()
    {
        return new Serializers\Api\ClueSerializer(Clue::all());
    }

    public function fetch(string $id)
    {
        return new Serializers\Api\ClueSerializer(Clue::findOrFail($id));
    }

    public function create()
    {
        $clue = new Clue();
        return $this->updateEntity($clue);
    }

    public function edit(string $id)
    {
        $clue = Clue::findOrFail($id);
        return $this->updateEntity($clue);
    }

    private function updateEntity(Clue $clue)
    {
        if ($this->input->uuid('uuid')) {
            $clue->setUuid($this->input->uuid('data.attributes.uuid'));
        }
        if ($this->input->exists('data.attributes.name')) {
            $clue->setName($this->input->string('data.attributes.name', null));
        }
        if ($this->input->exists('data.attributes.path')) {
            $clue->setPath($this->input->arr('data.attributes.path')->getData());
        }
        $clue->save();
        return new Serializers\Api\ClueSerializer($clue);
    }

    public function delete()
    {
    }
}
