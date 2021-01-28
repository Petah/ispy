<?php
namespace App\Console\Commands\Entity;

use App\Models;

class ClueCreate extends \Illuminate\Console\Command
{
    protected $signature = 'clue:create';

    protected $description = 'Create Clue';

    public function handle()
    {
        $clue = new Models\Clue();
        $clue->save();
    }
}
