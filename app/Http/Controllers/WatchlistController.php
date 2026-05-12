<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Watchlist;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\MovieRepository;
use App\Services\MovieSearchService;
use App\Services\AnthropicService;
use Illuminate\Support\Facades\Log;

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

    public function logs()
    {
        $path = storage_path('logs/laravel.log');

        if (!file_exists($path)) {
            return Inertia::render('Watchlist/Logs', ['entries' => []]);
        }

        $lines = array_reverse(file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES));

        $logTypes = [
            'enrichment'       => 'Recommendation enrichment',
            'db_title_fallback'  => 'Recommendation DB title fallback',
            'search_fallback'  => 'Recommendation search fallback',
        ];

        $entries = collect($lines)
            ->filter(fn($line) => str_contains($line, 'Recommendation enrichment')
                || str_contains($line, 'Recommendation DB title fallback')
                || str_contains($line, 'Recommendation search fallback'))
            ->map(function ($line) use ($logTypes) {
                preg_match('/\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]/', $line, $timeMatch);

                $type = 'enrichment';
                $label = 'Recommendation enrichment';
                foreach ($logTypes as $key => $logLabel) {
                    if (str_contains($line, $logLabel)) {
                        $type = $key;
                        $label = $logLabel;
                        break;
                    }
                }

                preg_match('/' . preg_quote($label, '/') . ' ({.+})/', $line, $dataMatch);
                if (!isset($dataMatch[1])) return null;

                $data = json_decode($dataMatch[1], true);
                if (!$data) return null;

                return [
                    'type'      => $type,
                    'timestamp' => $timeMatch[1] ?? null,
                    ...$data,
                ];
            })
            ->filter()
            ->take(50)
            ->values();

        return Inertia::render('Watchlist/Logs', ['entries' => $entries]);
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
Write the reason in second person, addressing the user directly (e.g. \"You'll love this if...\", \"Based on your taste for...\").
Respond ONLY with a valid JSON array, no other text:
[{\"title\": \"...\", \"year\": 2020, \"imdb_id\": \"tt0111161\", \"reason\": \"one sentence why you'd like it based on your list\"}]";

        $result = app(AnthropicService::class)->ask($prompt);

        // Strip markdown code fences if Claude wraps the response
        $result = trim(preg_replace('/^```(?:json)?\s*/m', '', preg_replace('/\s*```$/m', '', $result)));
        $recommendations = json_decode($result, true) ?? [];

        // Add poster image from the movie API
        $searchService = app(MovieSearchService::class);
        $repository = app(MovieRepository::class);

        $enriched = collect($recommendations)->map(function ($rec) use ($searchService, $repository) {
            try {
                $movie = $repository->findByMovieId($rec['imdb_id']);

                $source = 'db';
                if (!$movie) {
                    $source = 'api';
                    $details = $searchService->getMovieDetails($rec['imdb_id']);
                    $movie = $repository->createOrUpdate($details, $rec['imdb_id']);
                }

                // Validate the title matches to catch hallucinated IDs
                similar_text(
                    strtolower($movie->primary_title),
                    strtolower($rec['title']),
                    $similarity
                );

                Log::info('Recommendation enrichment', [
                    'claude_title'  => $rec['title'],
                    'db_title'      => $movie->primary_title,
                    'imdb_id'       => $rec['imdb_id'],
                    'similarity'    => round($similarity, 1),
                    'source'        => $source,
                    'accepted'      => $similarity >= 60,
                ]);

                if ($similarity < 60) {
                    // Fallback 1: check DB by title before hitting the search API
                    $dbMatch = $repository->findSimilarByTitle($rec['title']);

                    if ($dbMatch) {
                        similar_text(strtolower($dbMatch->primary_title), strtolower($rec['title']), $dbSimilarity);

                        Log::info('Recommendation DB title fallback', [
                            'claude_title' => $rec['title'],
                            'db_title'     => $dbMatch->primary_title,
                            'similarity'   => round($dbSimilarity, 1),
                            'accepted'     => true,
                        ]);

                        $rec['image_url'] = $dbMatch->image_url;
                        $rec['year']      = $dbMatch->start_year;
                        $rec['imdb_id']   = $dbMatch->movie_id;
                        return $rec;
                    }

                    // Fallback 2: search by title to find the correct movie
                    $searchResults = $searchService->search($rec['title']);
                    $topResult = $searchResults[0] ?? null;

                    if ($topResult) {
                        similar_text(
                            strtolower($topResult['primaryTitle']),
                            strtolower($rec['title']),
                            $searchSimilarity
                        );

                        Log::info('Recommendation search fallback', [
                            'claude_title'   => $rec['title'],
                            'search_title'   => $topResult['primaryTitle'],
                            'similarity'     => round($searchSimilarity, 1),
                            'accepted'       => $searchSimilarity >= 60,
                        ]);

                        if ($searchSimilarity >= 60) {
                            $rec['image_url'] = $topResult['primaryImage']['url'] ?? null;
                            $rec['year']      = $topResult['startYear'] ?? $rec['year'];
                            $rec['imdb_id']   = $topResult['id'];
                        } else {
                            $rec['image_url'] = null;
                        }
                    } else {
                        $rec['image_url'] = null;
                    }
                } else {
                    $rec['image_url'] = $movie->image_url;
                    $rec['year'] = $movie->start_year;
                }
            } catch (\Exception $e) {
                Log::info('Recommendation enrichment', [
                    'claude_title' => $rec['title'],
                    'db_title'     => null,
                    'imdb_id'      => $rec['imdb_id'] ?? null,
                    'similarity'   => 0,
                    'source'       => 'api',
                    'accepted'     => false,
                    'error'        => 'invalid_id',
                ]);
                return null;
            }
            return $rec;
        })->filter()->values()->toArray();

        session()->flash('recommendations', $enriched);
        return redirect()->route('watchlists.show', $watchlist);
    }
}
