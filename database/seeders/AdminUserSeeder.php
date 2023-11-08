<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Bastien',
            'email' => 'couderbastien@gmail.com',
            'password' => bcrypt('qxky482S*'),
            'email_verified_at' => now(),
            'is_admin' => true
        ]);
    }
}