<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'cart_id',
        'total_price',
        'status',
        'order_number',
        'isPaid',
        'deliveryItem_id',
    ];

    public function delivery()
    {
        return $this->belongsTo(Delivery::class);
    }


    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function cartItem()
    {
        return $this->belongsTo(CartItem::class);
    }


    public function deliveryItem()
    {
        return $this->belongsTo(DeliveryItem::class, 'deliveryItem_id');
    }
}