<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Watchlist;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\MovieRepository;
use App\Services\MovieSearchService;
use App\Services\AnthropicService;

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
        return Inertia::render('Watchlist/Show', [
            'watchlist' => $watchlist,
            'recommendations' => session('recommendations'),
        ]);
    }

    public function addMovie(Request $request, Watchlist $watchlist)
    {
        abort_if($watchlist->user_id !== auth()->id(), 403);
        $request->validate(['movie_id' => 'required|string']);

        $movie = Movie::where('movie_id', $request->movie_id)->first();

        if (!$movie) {
            $apiData = app(MovieSearchService::class)->getMovieDetails($request->movie_id);
            $movie = app(MovieRepository::class)->createOrUpdate($apiData, $request->movie_id);
        }

        $watchlist->movies()->syncWithoutDetaching([
            $movie->id => ['added_by_user_id' => auth()->id()]
        ]);

        $previous = url()->previous();
        if (str_ends_with(parse_url($previous, PHP_URL_PATH) ?? '', '/movies/search')) {
            return redirect('/movies/index');
        }

        return redirect($previous);
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

    public function destroy(Watchlist $watchlist)
    {
        abort_if($watchlist->user_id !== auth()->id(), 403);
        $watchlist->delete();
        return redirect()->route('watchlists.index');
    }

    public function recommendations(Watchlist $watchlist)
    {
        abort_if($watchlist->user_id !== auth()->id(), 403);

        $watchlist->load('movies');

        if ($watchlist->movies->isEmpty()) {
            return back()->with('error', 'Add some films to your list first.');
        }

        $titles = $watchlist->movies
            ->map(fn($m) => $m->primary_title . ' (' . $m->start_year . ')')
            ->join(', ');

        $prompt = "A user's watchlist contains: {$titles}.

Recommend 5 films or TV shows they would enjoy that are NOT already in their list.
You MUST provide a real, accurate IMDb ID for each (format: tt followed by numbers, e.g. tt0111161).
Respond ONLY with a valid JSON array, no other text:
[{\"title\": \"...\", \"year\": 2020, \"imdb_id\": \"tt0111161\", \"reason\": \"one sentence why they'd like it based on their list\"}]";

        $result = app(AnthropicService::class)->ask($prompt);

        // Strip markdown code fences if Claude wraps the response
        $result = trim(preg_replace('/^```(?:json)?\s*/m', '', preg_replace('/\s*```$/m', '', $result)));
        $recommendations = json_decode($result, true) ?? [];

        // Enrich each recommendation with poster image by fetching from the API
        $searchService = app(MovieSearchService::class);
        $repository = app(MovieRepository::class);

        $enriched = collect($recommendations)->map(function ($rec) use ($searchService, $repository) {
            try {
                $details = $searchService->getMovieDetails($rec['imdb_id']);
                $movie = $repository->createOrUpdate($details, $rec['imdb_id']);
                $rec['image_url'] = $movie->image_url;
                $rec['year'] = $movie->start_year;
            } catch (\Exception $e) {
                $rec['image_url'] = null;
            }
            return $rec;
        })->toArray();

        session()->flash('recommendations', $enriched);
        return redirect()->route('watchlists.show', $watchlist);
    }
}
