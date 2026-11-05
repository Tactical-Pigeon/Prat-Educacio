<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

#[Table('messages_media')]
class MessageMedia extends Model
{
    /**
     * Get all of the messages for the media (1).
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(Message::class, 'messageable');
    }
}
