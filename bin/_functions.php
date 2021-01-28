<?php
require_once __DIR__ . '/../server/vendor/autoload.php';

use Symfony\Component\Process\Process;

if (version_compare(phpversion(), '7.3', '<')) {
    die('Must use PHP version 7.3 or above.' . PHP_EOL);
}

$gwpDatabase = 'gwp.cluster-cay71urw79nq.us-west-2.rds.amazonaws.com';

function logBin(...$args)
{
    foreach ($args as $arg) {
        echo $arg . ' ';
    }
    echo PHP_EOL;
}

function execute(string $command, ?string $workingDirectory = null)
{
    $cwd = getcwd();
    if ($workingDirectory) {
        if (!is_dir($workingDirectory)) {
            throw new \Exception('Invalid working directory: ' . $workingDirectory);
        }
        chdir($workingDirectory);
    }

    echo $command . PHP_EOL;
    passthru($command, $returnCode);
    if ($returnCode !== 0) {
        throw new \Exception('Failed to run command: ' . $returnCode);
    }

    if ($workingDirectory) {
        chdir($cwd);
    }
}

function executeMulti(array $commands)
{
    if (empty($commands)) {
        echo 'No commands to run...' . PHP_EOL;
        return;
    }
    foreach ($commands as $command) {
        execute($command);
    }
    return;
    $processes = [];
    foreach ($commands as $command) {
        echo '[START] ' . $command . PHP_EOL;
        $process = new Process([$command]);
        $process->start();
        $processes[] = [
            'command' => $command,
            'process' => $process,
        ];
    }
    $time = time();
    while (count($processes) > 0) {
        foreach ($processes as $i => $process) {
            if (!$process['process']->isRunning()) {
                echo '[DONE] ' . $process['command'] . ' ' . $process['process']->getOutput() . ' ' . $process['process']->getErrorOutput() . PHP_EOL;
                unset($processes[$i]);
            }
        }
        if (time() > $time + 2) {
            foreach ($processes as $i => $process) {
                echo '[WAITING] ' . $process['command'] . PHP_EOL;
            }
            $time = time();
        }
    }
}

function sync(string $from, string $to, array $exclude)
{
    if (!is_dir($from) || !is_dir($to)) {
        throw new \Exception('Invalid directory');
    }

    $from = realpath($from) . '/';
    $to = realpath($to);

    $exclude = array_map(function ($e) {
        return "'$e'";
    }, $exclude);
    $exclude = '--exclude ' . implode(' --exclude ', $exclude);

    execute("rsync --recursive $from $exclude $to");
}

function cp($from, $to): string
{
    $from = realpath($from);
    if (!$from) {
        throw new \Exception('From path does not exist');
    }
    if (is_dir($from)) {
        mkdir($to, 0777, true);
        $to = realpath(dirname($to)) . DIRECTORY_SEPARATOR . basename($to);
    } else {
        mkdir(dirname($to), 0777, true);
        $to = realpath(dirname($to)) . DIRECTORY_SEPARATOR . basename($to);
    }
    var_dump($from, $to);
    return "cp -rp $from $to";
}
