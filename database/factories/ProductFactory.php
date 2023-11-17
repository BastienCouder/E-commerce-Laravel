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
            'name' => $this->faker->word . ' Ski',
            'image' => $this->faker->imageUrl(),
            'category_id' => $this->faker->numberBetween(1, 6),
            'shortDescription' => $this->faker->sentence,
            'longDescription' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 50, 500),
            'stock' => $this->faker->randomNumber(2),
            'value' => false,
        ];
    }
}