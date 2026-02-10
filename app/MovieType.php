<?php

namespace App;

enum MovieType: string
{
    case MOVIE = 'movie';
    case SHORT = 'short';
    case VIDEO = 'video';
    case TV_SERIES = 'tvseries';
    case TV_EPISODE = 'tvepisode';
    case TV_MOVIE = 'tvmovie';
    case TV_MINI_SERIES = 'tvminiseries';
    case TV_SHORT = 'tvshort';
    case TV_SPECIAL = 'tvspecial';
    case VIDEO_GAME = 'videogame';
    case PODCAST = 'podcast';
    case PODCAST_EPISODE = 'podcastepisode';

    public function label(): string
    {
        return match($this) {
            self::MOVIE => 'Movie',
            self::SHORT => 'Short Film',
            self::VIDEO => 'Video',
            self::TV_SERIES => 'TV Series',
            self::TV_EPISODE => 'TV Episode',
            self::TV_MOVIE => 'TV Movie',
            self::TV_MINI_SERIES => 'Mini-Series',
            self::TV_SHORT => 'TV Short',
            self::TV_SPECIAL => 'TV Special',
            self::VIDEO_GAME => 'Video Game',
            self::PODCAST => 'Podcast',
            self::PODCAST_EPISODE => 'Podcast Episode',
        };
    }
}
