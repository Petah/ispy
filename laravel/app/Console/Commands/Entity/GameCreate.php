<?php
namespace App\Console\Commands\Entity;

use App\Models;

class GameCreate extends \Illuminate\Console\Command
{
    protected $signature = 'game:create';

    protected $description = 'Create Game';

    public function handle()
    {
        $game = new Models\Game();
        $game->setName($this->ask('Name'));
        $game->save();
    }
}
