<?php
use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::any('levels/list', [Controllers\Api\LevelController::class, 'list']);
Route::any('levels/fetch/{id}', [Controllers\Api\LevelController::class, 'fetch']);
Route::post('levels/create', [Controllers\Api\LevelController::class, 'create']);
Route::post('levels/edit/{id}', [Controllers\Api\LevelController::class, 'edit']);
Route::post('levels/delete', [Controllers\Api\LevelController::class, 'delete']);

Route::any('games/list', [Controllers\Api\GameController::class, 'list']);
Route::any('games/fetch/{id}', [Controllers\Api\GameController::class, 'fetch']);
Route::post('games/create', [Controllers\Api\GameController::class, 'create']);
Route::post('games/edit/{id}', [Controllers\Api\GameController::class, 'edit']);
Route::post('games/delete', [Controllers\Api\GameController::class, 'delete']);

Route::any('players/list', [Controllers\Api\PlayerController::class, 'list']);
Route::any('players/fetch/{id}', [Controllers\Api\PlayerController::class, 'fetch']);
Route::post('players/create', [Controllers\Api\PlayerController::class, 'create']);
Route::post('players/edit/{id}', [Controllers\Api\PlayerController::class, 'edit']);
Route::post('players/delete', [Controllers\Api\PlayerController::class, 'delete']);

Route::any('scores/list', [Controllers\Api\ScoreController::class, 'list']);
Route::any('scores/fetch/{id}', [Controllers\Api\ScoreController::class, 'fetch']);
Route::post('scores/create', [Controllers\Api\ScoreController::class, 'create']);
Route::post('scores/edit/{id}', [Controllers\Api\ScoreController::class, 'edit']);
Route::post('scores/delete', [Controllers\Api\ScoreController::class, 'delete']);

Route::any('clues/list', [Controllers\Api\ClueController::class, 'list']);
Route::any('clues/fetch/{id}', [Controllers\Api\ClueController::class, 'fetch']);
Route::post('clues/create', [Controllers\Api\ClueController::class, 'create']);
Route::post('clues/edit/{id}', [Controllers\Api\ClueController::class, 'edit']);
Route::post('clues/delete', [Controllers\Api\ClueController::class, 'delete']);
