<?php
namespace App\Console\Commands\Entity;

use App\Models;

class ScoreList extends \App\Console\EntityCommand
{
    protected $signature = 'score:list { --output=table : Output style, table or list } { --noTrim : Don\'t trim stings } { --limit=30 : Limit results } { --orderBy=id : Order results by column } { --orderDir=desc : Order results direction }';

    protected $description = 'List Scores';

    protected $entityClass = Models\Score::class;

    protected function iterateHeaders(): \Generator
    {
        yield 'UUID';
        yield 'Created At';
        yield 'Updated At';
        yield 'Deleted At';
    }

    protected function iterateAttributes(Models\Score $score): \Generator
    {
        $noTrim = $this->option('noTrim');

        yield $score->getUuid();
        yield $this->formatDateTime($score->getCreatedAt());
        yield $this->formatDateTime($score->getUpdatedAt());
        yield $this->formatDateTime($score->getDeletedAt());
    }
}
