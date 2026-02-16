<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function watchlists(): HasMany
    {
        return $this->hasMany(Watchlist::class);
    }

    public function defaultWatchlist(): HasOne
    {
        return $this->hasOne(Watchlist::class)->where('is_default', true);
    }

    public function collaboratedWatchlists(): BelongsToMany
    {
        return $this->belongsToMany(Watchlist::class, 'watchlist_collaborators')
            ->withPivot(['permission_level', 'invited_by_user_id', 'invited_at', 'accepted_at'])
            ->withTimestamps();
    }

    public function getOrCreateDefaultWatchlist(): Watchlist
    {
        return $this->defaultWatchlist ?? $this->watchlists()->create([
            'name' => 'My Watchlist',
            'is_default' => true,
        ]);
    }
}
