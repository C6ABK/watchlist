<?php

namespace Tests\Unit;

use App\Models\Movie;
use App\Repositories\MovieRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MovieRepositoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_find_movie_by_movie_id()
    {
        $repository = new MovieRepository();

        // Create a movie in the database
        $movie = Movie::create([
            'movie_id' => 'tt1234567',
            'primary_title' => 'Test Movie',
            'type' => 'movie',
            'start_year' => 2023
        ]);

        $found = $repository->findByMovieId('tt1234567');

        $this->assertNotNull($found);
        $this->assertEquals('Test Movie', $found->primary_title);
        
    }

}