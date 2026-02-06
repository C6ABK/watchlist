<?php

namespace App\Http\Controllers;

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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // API Call to get movie details
        $response = Http::get("https://api.imdbapi.dev/titles/{$id}");

        // Check for successful response
        if ($response->successful()) {
            $movie = $response->json();

            return Inertia::render('Movie/Show', [
                'movie' => $movie
            ]);
        }

        // Handle API error
        return Intertia::render('Movie/Show', [
            'movie' => null,
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
}
