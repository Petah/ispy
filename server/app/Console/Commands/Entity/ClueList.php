<?php
namespace App\Console\Commands\Entity;

use App\Models;

class ClueList extends \App\Console\EntityCommand
{
    protected $signature = 'clue:list { --output=table : Output style, table or list } { --noTrim : Don\'t trim stings } { --limit=30 : Limit results } { --orderBy=id : Order results by column } { --orderDir=desc : Order results direction }';

    protected $description = 'List Clues';

    protected $entityClass = Models\Clue::class;

    protected function iterateHeaders(): \Generator
    {
        yield 'UUID';
        yield 'Name';
        yield 'Path';
        yield 'Created At';
        yield 'Updated At';
        yield 'Deleted At';
    }

    protected function iterateAttributes(Models\Clue $clue): \Generator
    {
        $noTrim = $this->option('noTrim');

        yield $clue->getUuid();
        yield $noTrim ? $clue->getName() : $this->trimString($clue->getName());
        yield '?';
        yield $this->formatDateTime($clue->getCreatedAt());
        yield $this->formatDateTime($clue->getUpdatedAt());
        yield $this->formatDateTime($clue->getDeletedAt());
    }
}
