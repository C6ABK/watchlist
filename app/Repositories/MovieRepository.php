<?php

namespace App\Repositories;

use App\Models\Movie;
use Carbon\Carbon;

class MovieRepository
{
    public function findByMovieId(string $movieId): ?Movie
    {
        return Movie::where('movie_id', $movieId)->first();
    }

    public function needsRefresh(?Movie $movie): bool
    {
        if (!$movie) return true;
        return $movie->updated_at < Carbon::now()->subDays(30);
    }

    public function createOrUpdate(array $data, string $movieId): Movie
    {
        return Movie::updateOrCreate(
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
    }
}