<?php
namespace App\Console\Commands\Entity;

use App\Models;

class LevelCreate extends \Illuminate\Console\Command
{
    protected $signature = 'level:create';

    protected $description = 'Create Level';

    public function handle()
    {
        $level = new Models\Level();
        $level->setName($this->ask('Name'));
        $level->setHost($this->ask('Host'));
        $level->setImage($this->ask('Image'));
        $level->setThumbnail($this->ask('Thumbnail'));
        $level->setRiddle($this->ask('Riddle'));
        $level->save();
    }
}
