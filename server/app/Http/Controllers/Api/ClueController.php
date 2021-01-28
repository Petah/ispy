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
        return $this->edit($clue);
    }

    public function update()
    {
        $clue = Clue::findOrFail($this->input->uuid('data.id'));
        return $this->edit($clue);
    }

    private function edit(Clue $clue)
    {
        if ($this->input->uuid('uuid')) {
            $clue->setUuid($this->input->uuid('uuid'));
        }
        $clue->save();
        return new Serializers\ClueSerializer($clue);
    }

    public function delete()
    {
    }
}
