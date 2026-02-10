<?php

namespace App\Models;

use App\MovieType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Movie extends Model
{
    // protected $casts = [
    //     'type' => MovieType::class,
    // ];

    protected $fillable = [
        'movie_id',
        'type',
        'plot',
        'primary_title',
        'original_title',
        'image_url',
        'start_year',
        'end_year',
        'run_time',
        'rating_aggregate',
        'rating_votes',
        'metacritic_score',
        'metacritic_count'
    ];

    // public function getDisplayLabel(): string
    // {
    //     return $this->type?->label() ?? ucfirst($this->type);
    // }
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'movie_genres')
                    ->withTimestamps();
    }
    public function people(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'movie_people')
                    ->withPivot(['role'])
                    ->withTimestamps();
    }
    public function actors(): BelongsToMany
    {
        return $this->people()
                    ->wherePivot('role', 'actor');
    }
    public function writers(): BelongsToMany
    {
        return $this->people()
                    ->wherePivot('role', 'writer');
    }
    public function directors(): BelongsToMany
    {
        return $this->people()
                    ->wherePivot('role', 'director');
    }

}

// <?php

// namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Relations\BelongsToMany;

// class Movie extends Model
// {
//     // Core relationships

//     public function watchlists(): BelongsToMany
//     {
//         return $this->belongsToMany(Watchlist::class, 'watchlist_movies')
//                     ->withPivot(['added_by_user_id', 'added_at', 'notes'])
//                     ->withTimestamps();
//     }
//     // Helper methods
//     public function isInWatchlist(Watchlist $watchlist): bool
//     {
//         return $this->watchlists()->where('watchlist_id', $watchlist->id)->exists();
//     }
// }