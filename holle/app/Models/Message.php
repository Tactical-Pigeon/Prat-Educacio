<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Message extends Model
{
    /**
     * Get the user that sent the message.
     */
    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }

    /**
     * Get all of the attachments (media) for the message.
     */
    public function media(): MorphToMany
    {
        return $this->morphedByMany(MessageMedia::class, "messageable");
    }

    /**
     * Get the service related to the message.
     */
    public function service(): MorphToMany
    {
        return $this->morphedByMany(Service::class, "messageable");
    }

    /**
     * Get the order related to the message.
     */
    public function order(): MorphToMany
    {
        return $this->morphedByMany(Order::class, "messageable");
    }

    /**
     * Get the (subpolygon) payment related to the message.
     */
    public function paymentSubpolygon(): MorphToMany
    {
        return $this->morphedByMany(PaymentSubpolygon::class, "messageable");
    }

    /**
     * Get the (Redsys) payment related to the message.
     */
    public function paymentRedsys(): MorphToMany
    {
        return $this->morphedByMany(PaymentRedsys::class, "messageable");
    }
}
