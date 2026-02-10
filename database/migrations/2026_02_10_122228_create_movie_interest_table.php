<?php

use App\Models\Interest;
use App\Models\Movie;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movie_interest', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Movie::class)->constrained();
            $table->foreignIdFor(Interest::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_interest');
    }
};
