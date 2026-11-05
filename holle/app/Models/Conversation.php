<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    /**
     * Get the client in the conversation.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the seller in the conversation.
     */
    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the latest service in the conversation.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get the messages for the conversation.
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
}
