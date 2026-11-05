<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

#[Table('payments_subpolygon')]
class PaymentSubpolygon extends Model
{
    /**
     * Get the payment's order.
     */
    public function order(): MorphOne
    {
        return $this->morphOne(Order::class, 'payment');
    }
}
