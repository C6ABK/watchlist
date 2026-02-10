<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Movie;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $searchResults = session('movie_search_results', []);
        $searchTerm = session('movie_search_term', '');

        return Inertia::render('Movie/MovieSearch', [
            'movies' => $searchResults,
            'searchTerm' => $searchTerm
        ]);
    }

    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:1|max:255'
        ]);

        $searchTerm = $request->input('query');

        try {
            $response = Http::timeout(10)->get("https://api.imdbapi.dev/search/titles", [
                'query' => $searchTerm
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $movies = $data['titles'] ?? [];

                // Store in session
                session(['movie_search_results' => $movies]);
                session(['movie_search_term' => $searchTerm]);

                return Inertia::render('Movie/MovieSearch', [
                    'success' => true,
                    'movies' => $movies
                ]);
            }
            
            return Inertia::render('Movie/MovieSearch', [
                'movies' => [],
                'searchTerm' => $searchTerm,
                'error' => 'Failed to fetch movie data'
            ]);
        } catch(\Exception $e) {
            return Inertia::render('Movie/MovieSearch', [
                'movies' => [],
                'searchTerm' => $searchTerm,
                'error' => 'An error occurred while searching'
            ]);
        }
    }

    public function clearSearch()
    {
        session()->forget(['movie_search_results', 'movie_search_term']);
        return Inertia::render('Movie/MovieSearch', [
            'movies' => [],
            'searchTerm' => ''
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        // 1 - Check database for movie
        $movie = Movie::where('movie_id', $id)->first();
    
        // 2 - Check if we need API call
        if(!$movie || $this->needsRefresh($movie)) {

            // 3 - Call API
            $response = Http::get("https://api.imdbapi.dev/titles/{$id}");
            $data = $response->json();

            // 4 - Store/update movie
            $movie = $this->storeOrUpdateMovie($data, $id);
        }

        // 5 - Load relationships and return to view
        $movie->load(['genres', 'people']);

        // dd($movie);

        return Inertia::render('Movie/Show', [
            'movie' => $movie,
            'error' => 'Movie not found'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function needsRefresh(?Movie $movie): bool
    {
        if (!$movie) return true; // Doesn't exist

        return $movie->updated_at < now()->subDays(30);
    }

    private function storeOrUpdateMovie($data, $movieId): Movie
    {
      
        $movie = Movie::updateOrCreate(
            ['movie_id' => $movieId],
            [
                'type' => $data['type'],
                'plot' => $data['plot'] ?? null,
                'primary_title' => $data['primaryTitle'],
                'original_title' => $data['originalTitle'] ?? null,
                'image_url' => $data['primaryImage']['url'] ?? null,
                'start_year' => $data['startYear'],
                'end_year' => $data['endYear'] ?? null,
                'run_time' => $data['runtimeSeconds'] ?? null,
                'rating_aggregate' => $data['rating']['aggregateRating'] ?? null,
                'rating_votes' => $data['rating']['voteCount'] ?? null,
                'metacritic_score' => $data['metacritic']['score'] ?? null,
                'metacritic_count' => $data['metacritic']['reviewCount'] ?? null
            ]
        );
        
        // Sync relationships
        $this->syncGenres($movie, $data['genres'] ?? []);
        $this->syncPeople($movie, $data);

        return $movie;
    }

    private function syncGenres(Movie $movie, array $genres)
    {
        $genreIds = [];

        foreach ($genres as $gendreData) {
            $genre = Genre::firstOrCreate([
                'genre' => $gendreData
            ]);

            $genreIds[] = $genre->id;
        }
        $movie->genres()->sync($genreIds);
    }

    private function syncPeople(Movie $movie, array $apiData)
    {
        $movie->people()->detach();

        // Directors
        if (isset($apiData['directors'])) {
            foreach ($apiData['directors'] as $directorData) {
                $person = Person::firstOrCreate(
                    ['person_id' => $directorData['id']],
                    [
                        'display_name' => $directorData['displayName'],
                        'alternative_names' => $directorData['alternativeNames'] ?? null,
                        'primary_professions' => $directorData['primaryProfessions'] ?? null,
                        'image_url' => $directorData['primaryImage']['url'] ?? null,
                    ]
                );

                $movie->people()->attach($person->id, [
                    'role' => 'director'
                ]);
            }
        }

        // Writers
        if (isset($apiData['writers'])) {
            foreach ($apiData['writers'] as $directorData) {
                $person = Person::firstOrCreate(
                    ['person_id' => $directorData['id']],
                    [
                        'display_name' => $directorData['displayName'],
                        'alternative_names' => $directorData['alternativeNames'] ?? null,
                        'primary_professions' => $directorData['primaryProfessions'] ?? null,
                        'image_url' => $directorData['primaryImage']['url'] ?? null,
                    ]
                );

                $movie->people()->attach($person->id, [
                    'role' => 'writer'
                ]);
            }
        }

        // Stars
        if (isset($apiData['stars'])) {
            foreach ($apiData['stars'] as $directorData) {
                $person = Person::firstOrCreate(
                    ['person_id' => $directorData['id']],
                    [
                        'display_name' => $directorData['displayName'],
                        'alternative_names' => $directorData['alternativeNames'] ?? null,
                        'primary_professions' => $directorData['primaryProfessions'] ?? null,
                        'image_url' => $directorData['primaryImage']['url'] ?? null,
                    ]
                );

                $movie->people()->attach($person->id, [
                    'role' => 'actor'
                ]);
            }
        }
    }
}
