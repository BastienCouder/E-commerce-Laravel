<?php

namespace Database\Seeders;
use App\Models\Category; 

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
  Category::create(['name' => 'Ski Alpin']);
  Category::create(['name' => 'Bâton']);
  Category::create(['name' => 'Chaussures']);
  Category::create(['name' => 'Vélos']);
  Category::create(['name' => 'Snowboard']);
  Category::create(['name' => 'Sac à dos']);
    }
}