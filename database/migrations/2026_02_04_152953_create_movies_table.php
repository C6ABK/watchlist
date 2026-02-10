<?php

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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('movie_id')->unique();
            $table->string('type');
            $table->string('primary_title');
            $table->string('original_title')->nullable();
            $table->string('image_url')->nullable();
            $table->string('plot')->nullable();
            $table->integer('start_year');
            $table->integer('end_year')->nullable();
            $table->integer('run_time')->nullable();
            $table->decimal('rating_aggregate')->nullable();
            $table->integer('rating_votes')->nullable();
            $table->decimal('metacritic_score')->nullable();
            $table->integer('metacritic_count')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
