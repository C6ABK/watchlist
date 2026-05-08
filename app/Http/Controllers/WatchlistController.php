<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Watchlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WatchlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $watchlists = auth()->user()->watchlists()->withCount('movies')->get();
        return Inertia::render('Watchlist/View', ['watchlists' => $watchlists]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Watchlist/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        auth()->user()->watchlists()->create($validated);

        return redirect()->route('watchlists.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Watchlist $watchlist)
    {
        abort_if($watchlist->user_id !== auth()->id(), 403);
        $watchlist->load('movies');
        return Inertia::render('Watchlist/Show', ['watchlist' => $watchlist]);
    }

    public function addMovie(Request $request, Watchlist $watchlist)
    {
        abort_if($watchlist->user_id !== auth()->id(), 403);
        $request->validate(['movie_id' => 'required|exists:movies,id']);

        $watchlist->movies()->syncWithoutDetaching([
            $request->movie_id => ['added_by_user_id' => auth()->id()]
        ]);

        return back();
    }

    public function removeMovie(Watchlist $watchlist, Movie $movie)
    {
        abort_if($watchlist->user_id !== auth()->id(), 403);
        $watchlist->movies()->detach($movie->id);
        return back();
    }

    public function toggleWatched(Watchlist $watchlist, Movie $movie)
    {
        abort_if($watchlist->user_id !== auth()->id(), 403);
        $current = $watchlist->movies()->where('movies.id', $movie->id)->first()?->pivot;
        if (!$current) return back();

        $watchlist->movies()->updateExistingPivot($movie->id, [
            'is_watched' => !$current->is_watched,
            'watched_at' => !$current->is_watched ? now() : null,
        ]);

        return back();
    }
}
