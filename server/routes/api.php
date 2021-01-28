<?php
use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::any('levels', [Controllers\Api\LevelController::class, 'list']);
Route::any('levels/create', [Controllers\Api\LevelController::class, 'create']);
Route::any('levels/edit/{id}', [Controllers\Api\LevelController::class, 'edit']);
Route::post('levels/delete', [Controllers\Api\LevelController::class, 'delete']);

Route::any('games', [Controllers\Api\GameController::class, 'list']);
Route::any('games/create', [Controllers\Api\GameController::class, 'create']);
Route::any('games/edit/{id}', [Controllers\Api\GameController::class, 'edit']);
Route::post('games/delete', [Controllers\Api\GameController::class, 'delete']);

Route::any('players', [Controllers\Api\PlayerController::class, 'list']);
Route::any('players/create', [Controllers\Api\PlayerController::class, 'create']);
Route::any('players/edit/{id}', [Controllers\Api\PlayerController::class, 'edit']);
Route::post('players/delete', [Controllers\Api\PlayerController::class, 'delete']);

Route::any('scores', [Controllers\Api\ScoreController::class, 'list']);
Route::any('scores/create', [Controllers\Api\ScoreController::class, 'create']);
Route::any('scores/edit/{id}', [Controllers\Api\ScoreController::class, 'edit']);
Route::post('scores/delete', [Controllers\Api\ScoreController::class, 'delete']);

Route::any('clues', [Controllers\Api\ClueController::class, 'list']);
Route::any('clues/create', [Controllers\Api\ClueController::class, 'create']);
Route::any('clues/edit/{id}', [Controllers\Api\ClueController::class, 'edit']);
Route::post('clues/delete', [Controllers\Api\ClueController::class, 'delete']);
