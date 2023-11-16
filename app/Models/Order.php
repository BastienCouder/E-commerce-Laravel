<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function deliveryOption()
{
    return $this->belongsTo(DeliveryOption::class);
}

    public function getTotalPriceAttribute()
{
    $cartTotalPrice = $this->cart->total_price ?? 0;
    $deliveryOptionPrice = $this->deliveryOption->price ?? 0;

    return $cartTotalPrice + $deliveryOptionPrice;
}
}
