<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeliveryItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'delivery_items';
    protected $fillable = [
        'deliveryId',
        'createdAt',
        'updatedAt',
        'deliveryOptionId',
        'Default',
        'name',
        'surname',
        'email',
        'phone',
        'address_1',
        'address_2',
        'zipcode',
        'country',
        'city',
        'created_by',
        'updated_by',
    ];

    public function delivery()
    {
        return $this->belongsTo(Delivery::class);
    }

    public function deliveryOption()
    {
        return $this->belongsTo(DeliveryOption::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}