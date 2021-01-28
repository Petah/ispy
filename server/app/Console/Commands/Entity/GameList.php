<?php
namespace App\Console\Commands\Entity;

use App\Models;

class GameList extends \App\Console\EntityCommand
{
    protected $signature = 'game:list { --output=table : Output style, table or list } { --noTrim : Don\'t trim stings } { --limit=30 : Limit results } { --orderBy=id : Order results by column } { --orderDir=desc : Order results direction }';

    protected $description = 'List Games';

    protected $entityClass = Models\Game::class;

    protected function iterateHeaders(): \Generator
    {
        yield 'UUID';
        yield 'Name';
        yield 'Created At';
        yield 'Updated At';
        yield 'Deleted At';
    }

    protected function iterateAttributes(Models\Game $game): \Generator
    {
        $noTrim = $this->option('noTrim');

        yield $game->getUuid();
        yield $noTrim ? $game->getName() : $this->trimString($game->getName());
        yield $this->formatDateTime($game->getCreatedAt());
        yield $this->formatDateTime($game->getUpdatedAt());
        yield $this->formatDateTime($game->getDeletedAt());
    }
}
