<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/categories', [CategoryController::class, 'index']);


Route::group(['prefix' => 'products'], function () {
    Route::get('/', [ProductController::class, 'read']);
    Route::post('/', [ProductController::class, 'store']);
    Route::get('/{product}', [ProductController::class, 'show']);
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
});

Route::group(['prefix' => 'cart'], function () {
    
    // With authentification
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/merge-cart', [CartController::class, 'mergeCart']);
        Route::get('/', [CartController::class, 'read']);
        Route::post('/', [CartController::class, 'create']);
        Route::put('/update-quantity/{cartItemId}',  [CartController::class, 'update']);
        Route::delete('/{cartItemId}', [CartController::class, 'softDelete']);
    });
    // Without authentification
    Route::get('/public', [CartController::class, 'publicRead']);
    Route::post('/public', [CartController::class, 'publicCreate']);
    Route::put('/public/update-quantity/{cartItemId}', [CartController::class, 'publicUpdate']);
    Route::delete('/public/{cartItemId}', [CartController::class, 'publicSoftDelete']);
});

Route::get('/login/google', 'GoogleController@redirectToProvider')->name('google.login');
Route::get('/login/google/callback', 'GoogleController@handleProviderCallback');

// Route::get('/login/google', [AuthController::class, 'redirectToGoogle']);
// Route::get('/login/google/callback', [AuthController::class, 'handleGoogleCallback']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
});
