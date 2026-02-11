<?php

namespace App\Services;

use App\Models\Country;
use App\Models\Genre;
use App\Models\Interest;
use App\Models\Language;
use App\Models\Movie;
use App\Models\Person;

class MovieRelationshipService
{
    public function syncAll(Movie $movie, array $apiData): void
    {
        $this->syncGenres($movie, $apiData['genres'] ?? []);
        $this->syncInterests($movie, $apiData['interests'] ?? []);
        $this->syncCountries($movie, $apiData['originCountries'] ?? []);
        $this->syncLanguages($movie, $apiData['spokenLanguages'] ?? []);
        $this->syncPeople($movie, $apiData);
    }

    public function syncGenres(Movie $movie, array $genres): void
    {
        $genreIds = collect($genres)->map(function ($genreData) {
            $genre = Genre::firstOrCreate([
                'genre' => $genreData['name'] ?? $genreData['text'] ?? $genreData
            ]);
            return $genre->id;
        })->toArray();

        $movie->genres()->sync($genreIds);
    }

    public function syncCountries(Movie $movie, array $countries): void
    {
        $countryIds = collect($countries)->map(function ($countryData) {
            $country = Country::firstOrCreate([
                'code' => $countryData['code'],
                'name' => $countryData['name']
            ]);
            return $country->id;
        })->toArray();

        $movie->countries()->sync($countryIds);
    }

    public function syncLanguages(Movie $movie, array $languages): void
    {
        $languageIds = collect($languages)->map(function ($languageData) {
            $language = Language::firstOrCreate([
                'code' => $languageData['code'],
                'name' => $languageData['name']
            ]);
            return $language->id;
        })->toArray();

        $movie->languages()->sync($languageIds);
    }

    public function syncInterests(Movie $movie, array $interests): void
    {
        $interestIds = collect($interests)->map(function ($interestData) {
            $interest = Interest::firstOrCreate([
                'interest_id' => $interestData['id'],
                'name' => $interestData['name'],
                'isSubGenre' => $interestData['isSubGenre'] ?? false
            ]);
            return $interest->id;
        })->toArray();

        $movie->interests()->sync($interestIds);
    }

    public function syncPeople(Movie $movie, array $apiData): void
    {
        $movie->people()->detach();

        $this->syncPeopleByRole($movie, $apiData['directors'] ?? [], 'director');
        $this->syncPeopleByRole($movie, $apiData['writers'] ?? [], 'writer');
        $this->syncPeopleByRole($movie, $apiData['stars'] ?? [], 'actor');
    }

    private function syncPeopleByRole(Movie $movie, array $people, string $role): void
    {
        foreach ($people as $personData) {
            $person = Person::firstOrCreate(
                ['person_id' => $personData['id']],
                [
                    'display_name' => $personData['displayName'],
                    'alternative_names' => $personData['alternativeNames'] ?? null,
                    'primary_professions' => $personData['primaryProfessions'] ?? null,
                    'image_url' => $personData['primaryImage']['url'] ?? null,
                ]
            );

            $movie->people()->attach($person->id, ['role' => $role]);
        }
    }
}