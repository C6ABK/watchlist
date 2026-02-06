<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index');
})->middleware('guest');

Route::get('/register', [RegisterUserController::class, 'create'])->name('register')->middleware('guest');
Route::post('/register', [RegisterUserController::class, 'store'])->middleware('guest');

Route::get('/login', [SessionController::class, 'create'])->name('login')->middleware('guest');
Route::post('/login', [SessionController::class, 'store'])->middleware('guest');

Route::post('/logout', [SessionController::class, 'destroy'])->middleware('auth');

// Movies
Route::get('/movies/index', [MovieController::class, 'index'])->name('movies.search')->middleware('auth');
Route::post('/movies/search', [MovieController::class, 'search'])->name('movies.search.post')->middleware('auth');
Route::delete('/movies/search', [MovieController::class, 'clearSearch'])->name('movies.search.clear')->middleware('auth');
Route::get('/movies/{id}', [MovieController::class, 'show'])->middleware('auth');