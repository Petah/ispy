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
        return $this->updateEntity($player);
    }

    public function edit(string $id)
    {
        $player = Player::findOrFail($id);
        return $this->updateEntity($player);
    }

    private function updateEntity(Player $player)
    {
        if ($this->input->uuid('uuid')) {
            $player->setUuid($this->input->uuid('data.attributes.uuid'));
        }
        if ($this->input->exists('data.attributes.name')) {
            $player->setName($this->input->string('data.attributes.name', null));
        }
        $player->save();
        return new Serializers\Api\PlayerSerializer($player);
    }

    public function delete()
    {
    }
}
