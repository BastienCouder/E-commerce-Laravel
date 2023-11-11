<?php 
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

class GoogleController extends Controller
{
    public function redirectToProvider()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleProviderCallback()
    {
        $user = Socialite::driver('google')->user();
        // Traitement de l'utilisateur
    }
}
