<?php
namespace App\Http\Controllers\Api;

use App\Models\Player;
use App\Serializers;

class PlayerController extends \App\Http\Controllers\BaseController
{
    public function list()
    {
        return new Serializers\Api\PlayerSerializer(Player::all());
    }

    public function fetch(string $id)
    {
        return new Serializers\Api\PlayerSerializer(Player::findOrFail($id));
    }

    public function create()
    {
        $player = new Player();
        return $this->edit($player);
    }

    public function update()
    {
        $player = Player::findOrFail($this->input->uuid('data.id'));
        return $this->edit($player);
    }

    private function edit(Player $player)
    {
        if ($this->input->uuid('uuid')) {
            $player->setUuid($this->input->uuid('uuid'));
        }
        $player->save();
        return new Serializers\PlayerSerializer($player);
    }

    public function delete()
    {
    }
}
