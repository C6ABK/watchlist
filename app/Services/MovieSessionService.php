<?php

namespace App\Services;

class MovieSessionService
{
    private const SEARCH_RESULTS_KEY = 'movie_search_results';
    private const SEARCH_TERM_KEY = 'movie_search_term';

    public function storeSearchResults(array $movies, string $searchTerm): void
    {
        session([
            self::SEARCH_RESULTS_KEY => $movies,
            self::SEARCH_TERM_KEY => $searchTerm
        ]);
    }

    public function getSearchResults(): array
    {
        return session(self::SEARCH_RESULTS_KEY, []);
    }

    public function getSearchTerm(): string
    {
        return session(self::SEARCH_TERM_KEY, '');
    }

    public function clearSearch(): void
    {
        session()->forget([self::SEARCH_RESULTS_KEY, self::SEARCH_TERM_KEY]);
    }
}