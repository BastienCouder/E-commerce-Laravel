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

    public function deliveryItem()
    {
        return $this->belongsTo(DeliveryItem::class);
    }
}