<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MovieSearchService
{
    // https://api.imdbapi.dev/titles/{$id}
    private $apiUrl = 'https://api.imdbapi.dev';
    private $timeout = 10;

    public function search(string $query): array
    {
        $response = Http::timeout($this->timeout)
            ->get("{$this->apiUrl}/search/titles", [
                'query' => $query
            ]);

        if (!$response->successful()) {
            throw new \Exception('Failed to fetch movie data from API');
        }

        $data = $response->json();
        return $data['titles'] ?? [];
    }

    public function getMovieDetails(string $movieId): array
    {
        $response = Http::timeout($this->timeout)
            ->get("{$this->apiUrl}/titles/{$movieId}");

        if (!$response->successful()) {
            throw new \Exception('Failed to fetch movie details from API');
        }

        return $response->json();
    }

}
