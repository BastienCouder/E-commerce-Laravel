<?php

use App\Models\Order;
use App\Models\Cart;
use App\Models\DeliveryItem;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Order::class, 'order_id')->nullable();
            $table->foreignIdFor(Cart::class, 'cart_id')->nullable();
            $table->boolean('isPaid');
            $table->foreignIdFor(DeliveryItem::class, 'deliveryItem_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
    }
};