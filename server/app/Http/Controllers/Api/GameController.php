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
        return $this->edit($game);
    }

    public function update()
    {
        $game = Game::findOrFail($this->input->uuid('data.id'));
        return $this->edit($game);
    }

    private function edit(Game $game)
    {
        if ($this->input->uuid('uuid')) {
            $game->setUuid($this->input->uuid('uuid'));
        }
        if ($this->input->exists('name')) {
            $game->setName($this->input->string('name', null));
        }
        $game->save();
        return new Serializers\Api\GameSerializer($game);
    }

    public function delete()
    {
    }
}
