<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Watchlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'user_id',
        'is_public',
        'is_default',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'is_default' => 'boolean',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function movies(): BelongsToMany
    {
        return $this->belongsToMany(Movie::class, 'watchlist_movies')
            ->withPivot(['added_by_user_id', 'notes', 'priority', 'is_watched', 'watched_at'])
            ->withTimestamps()
            ->orderBy('watchlist_movies.priority')
            ->orderBy('watchlist_movies.created_at');
    }

    public function collaborators(): HasMany
    {
        return $this->hasMany(WatchlistCollaborator::class);
    }

    public function allUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'watchlist_collaborators')
            ->withPivot(['permission_level', 'invited_by_user_id', 'invited_at', 'accepted_at'])
            ->withTimestamps();
    }

    public function canBeViewedBy(User $user): bool
    {
        if ($this->user_id === $user->id) return true;
        if ($this->is_public) return true;

        return $this->collaborators()
            ->where('user_id', $user->id)
            ->whereNotNull('assepted_at')
            ->exists();
    }

    public function canBeEditedBy(User $user): bool
    {
        if ($this->user_id === $user->id) return true;

        return $this->collaborators()
            ->where('user_id', $user->id)
            ->whereNotNull('accepted_at')
            ->whereIn('permission_level', ['add', 'admin'])
            ->exists();

    }

    public function canBeManagedBy(User $user): bool
    {
        if ($this->user_id === $user->id) return true;

        return $this->collaborators()
            ->where('user_id', $user->id)
            ->whereNotNull('accepted_at')
            ->where('permission_level', 'admin')
            ->exists();
    }
}
