<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    /**
     * The model's default values for attributes.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'published' => 0,
        'featured' => 0,
        'price' => 0,
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published' => 'boolean',
        ];
    }

    /**
     * Get the user that owns the service.
     */
    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the service's media.
     */
    public function media(): HasMany
    {
        return $this->hasMany(ServiceMedia::class);
    }
}
