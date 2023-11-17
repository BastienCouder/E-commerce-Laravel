<?php

use App\Models\Category;
use App\Models\Size;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 2000);
            $table->string('image', 2000)->nullable();
            $table->foreignIdFor(Category::class, 'category_id')->nullable();
            $table->foreignIdFor(Size::class, 'size_id')->nullable();
            $table->string('image_mime')->nullable();
            $table->integer('image_size')->nullable();
            $table->longText('shortDescription')->nullable();
            $table->longText('longDescription')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('stock', 10, 2)->nullable();
            $table->boolean('value');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
