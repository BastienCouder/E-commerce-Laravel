<?php

// App\Console\Commands\CreateAdminUser.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class CreateAdminUser extends Command
{
    protected $signature = 'create:admin';
    protected $description = 'Create an admin user';

    public function handle()
    {
        $name = $this->ask('Entrez un nom:');
        $email = $this->ask('Entrez un email:');
        $password = $this->secret('Entrez un mot de passe:');

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => bcrypt($password),
            'account' => 'admin',
        ]);

        $this->info('Création réussie de l\'utilisateur Admin');
    }
}