<?php

namespace App\Console;

use Symfony\Component\Console\Helper\Table;

abstract class EntityCommand extends \Illuminate\Console\Command
{
    abstract protected function iterateHeaders(): \Generator;

    // protected abstract function iterateAttributes(\App\Models\BaseModel $entity): \Generator;

    protected function formatDate(?\DateTimeInterface $date)
    {
        if (!$date) {
            return null;
        }
        return $date->format('Y-m-d');
    }

    protected function formatDateTime(?\DateTimeInterface $date): ?string
    {
        if (!$date) {
            return null;
        }
        return $date->format('Y-m-d H:i:s');
    }

    protected function trimString(?string $string): ?string
    {
        if (!is_string($string)) {
            return null;
        }
        if (strlen($string) > 20) {
            return substr($string, 0, 20) . '...';
        }
        return $string;
    }

    protected function iterateEntities(): \Generator
    {
        $limit = $this->option('limit');
        $orderBy = $this->option('orderBy');
        $orderDir = $this->option('orderDir');

        $entityClass = $this->entityClass;
        foreach ($entityClass::withTrashed()->limit($limit)->orderBy($orderBy, $orderDir)->get() as $entity) {
            yield $entity;
        }
    }

    private function outputTable()
    {
        $table = new Table($this->getOutput());
        $table->setHeaders(iterator_to_array($this->iterateHeaders()));
        $rows = [];
        foreach (array_reverse(iterator_to_array($this->iterateEntities())) as $entity) {
            $rows[] = iterator_to_array($this->iterateAttributes($entity));
        }
        $table->setRows($rows);
        $table->render();
    }

    private function outputList()
    {
        $headers = iterator_to_array($this->iterateHeaders());
        foreach (array_reverse(iterator_to_array($this->iterateEntities())) as $entity) {
            $table = new Table($this->getOutput());
            $rows = [];
            $values = iterator_to_array($this->iterateAttributes($entity));
            foreach ($headers as $i => $header) {
                $rows[] = [$header, $values[$i]];
            }
            $table->setRows($rows);
            $table->render();
        }
    }

    public function handle()
    {
        switch ($this->option('output')) {
            case 'table':
                $this->outputTable();
                break;
            case 'list':
                $this->outputList();
                break;
        }
    }
}
