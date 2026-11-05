<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'username', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

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

    /**
     * The model's default values for attributes.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'is_admin' => false,
        'is_seller' => false,
    ];

    // BIG TODO, no two users should have the same username, check for that


    /**
     * Get the services of the seller (user).
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class, "seller_id");
    }

    /**
     * Get the conversations of the user or seller.
     */
    public function conversations(): HasMany
    {
        return $this->hasMany(Conversation::class);
    }

    // bit messy, oh well, i stopped caring long ago
    // get the orders for the seller
    public function sellerOrders(): HasMany
    {
        return $this->hasMany(Order::class, "seller_id");
    }
    // get the orders for the client
    public function clientOrders(): HasMany
    {
        return $this->hasMany(Order::class, "client_id");
    }
}
