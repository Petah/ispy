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
        return $this->edit($score);
    }

    public function update()
    {
        $score = Score::findOrFail($this->input->uuid('data.id'));
        return $this->edit($score);
    }

    private function edit(Score $score)
    {
        if ($this->input->uuid('uuid')) {
            $score->setUuid($this->input->uuid('uuid'));
        }
        $score->save();
        return new Serializers\Api\ScoreSerializer($score);
    }

    public function delete()
    {
    }
}
