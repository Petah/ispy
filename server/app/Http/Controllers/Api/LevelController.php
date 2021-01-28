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
        return $this->edit($level);
    }

    public function update()
    {
        $level = Level::findOrFail($this->input->uuid('data.id'));
        return $this->edit($level);
    }

    private function edit(Level $level)
    {
        if ($this->input->uuid('uuid')) {
            $level->setUuid($this->input->uuid('uuid'));
        }
        if ($this->input->exists('name')) {
            $level->setName($this->input->string('name', null));
        }
        if ($this->input->exists('host')) {
            $level->setHost($this->input->string('host', null));
        }
        if ($this->input->exists('image')) {
            $level->setImage($this->input->string('image', null));
        }
        $level->save();
        return new Serializers\Api\LevelSerializer($level);
    }

    public function delete()
    {
    }
}
