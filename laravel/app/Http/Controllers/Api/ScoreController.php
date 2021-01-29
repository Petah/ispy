<?php
namespace App\Http\Controllers\Api;

use App\Models\Score;
use App\Serializers;

class ScoreController extends \App\Http\Controllers\BaseController
{
    public function list()
    {
        return new Serializers\Api\ScoreSerializer(Score::all());
    }

    public function fetch(string $id)
    {
        return new Serializers\Api\ScoreSerializer(Score::findOrFail($id));
    }

    public function create()
    {
        $score = new Score();
        return $this->updateEntity($score);
    }

    public function edit(string $id)
    {
        $score = Score::findOrFail($id);
        return $this->updateEntity($score);
    }

    private function updateEntity(Score $score)
    {
        if ($this->input->uuid('uuid')) {
            $score->setUuid($this->input->uuid('data.attributes.uuid'));
        }
        $score->save();
        return new Serializers\Api\ScoreSerializer($score);
    }

    public function delete()
    {
    }
}
