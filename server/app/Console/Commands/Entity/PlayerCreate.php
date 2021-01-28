<?php
namespace App\Console\Commands\Entity;

use App\Models;

class PlayerCreate extends \Illuminate\Console\Command
{
    protected $signature = 'player:create';

    protected $description = 'Create Player';

    public function handle()
    {
        $player = new Models\Player();
        $player->save();
    }
}
