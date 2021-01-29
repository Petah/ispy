<?php
namespace App\Console\Commands\Entity;

use App\Models;

class ScoreCreate extends \Illuminate\Console\Command
{
    protected $signature = 'score:create';

    protected $description = 'Create Score';

    public function handle()
    {
        $score = new Models\Score();
        $score->save();
    }
}
