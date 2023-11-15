<?php

use App\Models\User;
use App\Models\Delivery;
use App\Models\DeliveryOption;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('delivery_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Delivery::class, 'delivery_id')->nullable();
            $table->foreignIdFor(DeliveryOption::class, 'deliveryOption_id')->nullable();
            $table->boolean('Default')->default(true);
            $table->softDeletes();
            $table->string('name');
            $table->string('surname');
            $table->string('email');
            $table->string('phone');
            $table->string('address_1');
            $table->string('address_2');
            $table->string('zipcode');
            $table->string('country');
            $table->string('city');
            $table->foreignIdFor(User::class, 'created_by')->nullable();
            $table->foreignIdFor(User::class, 'updated_by')->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_items');
    }
};
