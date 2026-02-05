<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// id,
//     primaryTitle,
//     originalTitle,
//     imageUrl,
//     startYear,
//     endYear,
//     ratingAggregate,
//     voteCount,
//     type,

class Movie extends Model
{
    protected $fillable = [
        'movie_id',
        'primary_title',
        'original_title',
        'image_url',
        'start_year',
        'end_year',
        'rating_aggregate',
        'vote_count',
        'type'
    ];
}
