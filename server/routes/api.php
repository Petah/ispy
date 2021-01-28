<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

Route::get('games', [Controllers\Api\GamesController::class, 'list']);
