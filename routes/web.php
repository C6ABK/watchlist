<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\RegisterUserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\WatchlistController;
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
Route::get('/movies/show/{id}', [MovieController::class, 'show'])->middleware('auth');

// Watchlists
Route::middleware('auth')->group(function () {
    Route::get('/watchlists', [WatchlistController::class, 'index'])->name('watchlists.index');
    Route::get('/watchlists/create', [WatchlistController::class, 'create'])->name('watchlists.create');
    Route::post('/watchlists', [WatchlistController::class, 'store'])->name('watchlists.store');
    Route::get('/watchlists/{watchlist}', [WatchlistController::class, 'show'])->name('watchlists.show');
    Route::post('/watchlists/{watchlist}/movies', [WatchlistController::class, 'addMovie'])->name('watchlists.movies.add');
    Route::delete('/watchlists/{watchlist}', [WatchlistController::class, 'destroy'])->name('watchlists.destroy');
    Route::delete('/watchlists/{watchlist}/movies/{movie}', [WatchlistController::class, 'removeMovie'])->name('watchlists.movies.remove');
    Route::patch('/watchlists/{watchlist}/movies/{movie}/watched', [WatchlistController::class, 'toggleWatched'])->name('watchlists.movies.watched');
    Route::post('/watchlists/{watchlist}/recommendations', [WatchlistController::class, 'recommendations'])->named('watchlists.recommendations');
});
