<?php
namespace App\Console\Commands\Entity;

use App\Models;

class PlayerList extends \App\Console\EntityCommand
{
    protected $signature = 'player:list { --output=table : Output style, table or list } { --noTrim : Don\'t trim stings } { --limit=30 : Limit results } { --orderBy=id : Order results by column } { --orderDir=desc : Order results direction }';

    protected $description = 'List Players';

    protected $entityClass = Models\Player::class;

    protected function iterateHeaders(): \Generator
    {
        yield 'UUID';
        yield 'Created At';
        yield 'Updated At';
        yield 'Deleted At';
    }

    protected function iterateAttributes(Models\Player $player): \Generator
    {
        $noTrim = $this->option('noTrim');

        yield $player->getUuid();
        yield $this->formatDateTime($player->getCreatedAt());
        yield $this->formatDateTime($player->getUpdatedAt());
        yield $this->formatDateTime($player->getDeletedAt());
    }
}
