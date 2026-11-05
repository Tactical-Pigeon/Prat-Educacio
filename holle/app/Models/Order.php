<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Order extends Model
{
    /**
     * Get the client associated with the order.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, "client_id");
    }

    /**
     * Get the service associated with the order.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get the status of the order.
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(OrderStatus::class, "status_id");
    }

    /**
     * Get the parent payment model (redsys or subpolygon).
     */
    public function payment(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Get the conversation of the order.
     */
    public function conversation(): HasOne
    {
        return $this->hasOne(Conversation::class);
    }
}
