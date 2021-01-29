<?php
namespace App\Http\Controllers\Api;

use App\Models\Game;
use App\Serializers;

class GameController extends \App\Http\Controllers\BaseController
{
    public function list()
    {
        return new Serializers\Api\GameSerializer(Game::all());
    }

    public function fetch(string $id)
    {
        return new Serializers\Api\GameSerializer(Game::findOrFail($id));
    }

    public function create()
    {
        $game = new Game();
        return $this->updateEntity($game);
    }

    public function edit(string $id)
    {
        $game = Game::findOrFail($id);
        return $this->updateEntity($game);
    }

    private function updateEntity(Game $game)
    {
        if ($this->input->uuid('uuid')) {
            $game->setUuid($this->input->uuid('data.attributes.uuid'));
        }
        if ($this->input->exists('data.attributes.name')) {
            $game->setName($this->input->string('data.attributes.name', null));
        }
        $game->save();
        return new Serializers\Api\GameSerializer($game);
    }

    public function delete()
    {
    }
}
