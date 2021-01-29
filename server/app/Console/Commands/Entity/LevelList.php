<?php
namespace App\Console\Commands\Entity;

use App\Models;

class LevelList extends \App\Console\EntityCommand
{
    protected $signature = 'level:list { --output=table : Output style, table or list } { --noTrim : Don\'t trim stings } { --limit=30 : Limit results } { --orderBy=id : Order results by column } { --orderDir=desc : Order results direction }';

    protected $description = 'List Levels';

    protected $entityClass = Models\Level::class;

    protected function iterateHeaders(): \Generator
    {
        yield 'UUID';
        yield 'Name';
        yield 'Host';
        yield 'Image';
        yield 'Thumbnail';
        yield 'Riddle';
        yield 'Clues';
        yield 'Created At';
        yield 'Updated At';
        yield 'Deleted At';
    }

    protected function iterateAttributes(Models\Level $level): \Generator
    {
        $noTrim = $this->option('noTrim');

        yield $level->getUuid();
        yield $noTrim ? $level->getName() : $this->trimString($level->getName());
        yield $noTrim ? $level->getHost() : $this->trimString($level->getHost());
        yield $noTrim ? $level->getImage() : $this->trimString($level->getImage());
        yield $noTrim ? $level->getThumbnail() : $this->trimString($level->getThumbnail());
        yield $noTrim ? $level->getRiddle() : $this->trimString($level->getRiddle());
        yield '?';
        yield $this->formatDateTime($level->getCreatedAt());
        yield $this->formatDateTime($level->getUpdatedAt());
        yield $this->formatDateTime($level->getDeletedAt());
    }
}
