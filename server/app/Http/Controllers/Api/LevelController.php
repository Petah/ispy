<?php
namespace App\Http\Controllers\Api;

use App\Models\Level;
use App\Serializers;

class LevelController extends \App\Http\Controllers\BaseController
{
    public function list()
    {
        return new Serializers\Api\LevelSerializer(Level::all());
    }

    public function fetch(string $id)
    {
        return new Serializers\Api\LevelSerializer(Level::findOrFail($id));
    }

    public function create()
    {
        $level = new Level();
        return $this->updateEntity($level);
    }

    public function edit(string $id)
    {
        $level = Level::findOrFail($id);
        return $this->updateEntity($level);
    }

    private function updateEntity(Level $level)
    {
        if ($this->input->uuid('uuid')) {
            $level->setUuid($this->input->uuid('data.attributes.uuid'));
        }
        if ($this->input->exists('data.attributes.name')) {
            $level->setName($this->input->string('data.attributes.name', null));
        }
        if ($this->input->exists('data.attributes.host')) {
            $level->setHost($this->input->string('data.attributes.host', null));
        }
        if ($this->input->exists('data.attributes.image')) {
            $level->setImage($this->input->string('data.attributes.image', null));
        }
        if ($this->input->exists('data.attributes.thumbnail')) {
            $level->setThumbnail($this->input->string('data.attributes.thumbnail', null));
        }
        if ($this->input->exists('data.attributes.riddle')) {
            $level->setRiddle($this->input->string('data.attributes.riddle', null));
        }
        if ($this->input->exists('data.attributes.clues')) {
            $level->setClues($this->input->arr('data.attributes.clues')->getData());
        }
        $level->save();
        return new Serializers\Api\LevelSerializer($level);
    }

    public function delete()
    {
    }
}
