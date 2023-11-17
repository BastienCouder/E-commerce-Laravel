<?php

// App\Console\Commands\CreateAdminUser.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class CreateAdminUser extends Command
{
    protected $signature = 'create:admin';
    protected $description = 'Create an admin user';

    public function handle()
    {
        $email = $this->ask('Entrez un email:');
        $user = User::where('email', $email)->first();

        if ($user) {
            if ($user->account === 'admin') {
                $this->info('Cet utilisateur est déjà un administrateur.');
            } else {
                $password = $this->secret('Entrez votre mot de passe:');
                if (Hash::check($password, $user->password)) {
                    $user->update(['account' => 'admin']);
                    $this->info('Le compte a été mis à jour à "admin".');
                } else {
                    $this->error('Mot de passe incorrect. Le compte n\'a pas été mis à jour.');
                }
            }
        } else {
            $name = $this->ask('Entrez un nom:');
            $password = $this->secret('Entrez un mot de passe:');
            $confirmPassword = $this->secret('Confirmez le mot de passe:');
            if ($password !== $confirmPassword) {
                $this->error('Les mots de passe ne correspondent pas.');
                return;
            }

            $hashedPassword = bcrypt($password);

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => $hashedPassword,
                'account' => 'admin',
            ]);

            $this->info('Création réussie de l\'utilisateur Admin');
        }
    }
}