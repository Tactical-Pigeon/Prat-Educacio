<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('services_media')]
class ServiceMedia extends Model
{
    /**
     * Get the service that owns the media.
     */
    public function seller(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
