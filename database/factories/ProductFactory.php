<?php
// database/factories/ProductFactory.php
namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word . ' Ski',
            'slug' => $this->faker->slug,
            'image' => $this->faker->imageUrl(),
            'category_id' => $this->faker->numberBetween(1, 6),
            'size_id' => $this->faker->numberBetween(1, 6),
            'image_mime' => $this->faker->mimeType,
            'image_size' => $this->faker->numberBetween(100, 1000),
            'shortDescription' => $this->faker->sentence,
            'longDescription' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 50, 500),
            'stock' => $this->faker->randomNumber(2),
            'created_by' => null, // Modifier si nécessaire
            'updated_by' => null, // Modifier si nécessaire
            'deleted_by' => null, // Modifier si nécessaire
        ];
    }
}