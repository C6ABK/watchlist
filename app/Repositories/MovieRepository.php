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

    public function findSimilarByTitle(string $title, float $threshold = 60): ?Movie
    {
        $words = array_filter(explode(' ', $title), fn($w) => strlen($w) > 3);

        if (empty($words)) {
            $candidates = Movie::all();
        } else {
            $query = Movie::query();
            foreach ($words as $word) {
                $query->orWhere('primary_title', 'like', '%' . $word . '%');
            }
            $candidates = $query->get();
        }

        $best = null;
        $bestSimilarity = 0;

        foreach ($candidates as $candidate) {
            similar_text(strtolower($candidate->primary_title), strtolower($title), $similarity);
            if ($similarity > $bestSimilarity) {
                $bestSimilarity = $similarity;
                $best = $candidate;
            }
        }

        return $bestSimilarity >= $threshold ? $best : null;
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