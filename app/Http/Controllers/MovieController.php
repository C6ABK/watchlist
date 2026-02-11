<?php

namespace App\Http\Controllers;

use App\Repositories\MovieRepository;
use App\Services\MovieRelationshipService;
use App\Services\MovieSearchService;
use App\Services\MovieSessionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function __construct(
        private MovieSearchService $searchService,
        private MovieRepository $movieRepository,
        private MovieRelationshipService $relationshipService,
        private MovieSessionService $sessionService
    ) {}

    public function index()
    {
        return Inertia::render('Movie/MovieSearch', [
            'movies' => $this->sessionService->getSearchResults(),
            'searchTerm' => $this->sessionService->getSearchTerm()
        ]);
    }

    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|string|min:1|max:255'
        ]);

        $searchTerm = $request->input('query');

        try {
            $movies = $this->searchService->search($searchTerm);
            $this->sessionService->storeSearchResults($movies, $searchTerm);

            return Inertia::render('Movie/MovieSearch', [
                'success' => true,
                'movies' => $movies
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Movie/MovieSearch', [
                'movies' => [],
                'searchTerm' => $searchTerm,
                'error' => 'An error occurred while searching'
            ]);
        }
    }

    public function clearSearch()
    {
        $this->sessionService->clearSearch();
        
        return Inertia::render('Movie/MovieSearch', [
            'movies' => [],
            'searchTerm' => ''
        ]);
    }

    public function show(string $id)
    {
        try {
            $movie = $this->movieRepository->findByMovieId($id);

            if ($this->movieRepository->needsRefresh($movie)) {
                $apiData = $this->searchService->getMovieDetails($id);
                $movie = $this->movieRepository->createOrUpdate($apiData, $id);
                $this->relationshipService->syncAll($movie, $apiData);
            }

            $movie->load(['genres', 'people', 'interests', 'countries', 'languages']);

            return Inertia::render('Movie/Show', [
                'movie' => $movie
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Movie/Show', [
                'movie' => null,
                'error' => 'Movie not found'
            ]);
        }
    }
}