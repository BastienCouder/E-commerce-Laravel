<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->post('/logout', 'AuthController@logout');



Route::get('/categories', [CategoryController::class, 'index']);

Route::group(['prefix' => 'products'], function () {
    Route::get('/', [ProductController::class, 'read']);
    Route::post('/', [ProductController::class, 'store']);
    Route::get('/{product}', [ProductController::class, 'show']);
    Route::put('/{product}', [ProductController::class, 'update']);
    Route::patch('/{product}', [ProductController::class, 'update']);
    Route::delete('/{product}', [ProductController::class, 'destroy']);
});

Route::group(['prefix' => 'cart'], function () {
    Route::get('/', [CartController::class, 'read']);
    Route::post('/', [CartController::class, 'create']);
    Route::put('/{cart}', [CartController::class, 'update']);
    Route::patch('/{cart}', [CartController::class, 'update']);
    Route::delete('/{cart}', [CartController::class, 'destroy']);
});

Route::get('/login/google', 'GoogleController@redirectToProvider')->name('google.login');
Route::get('/login/google/callback', 'GoogleController@handleProviderCallback');

// Route::get('/login/google', [AuthController::class, 'redirectToGoogle']);
// Route::get('/login/google/callback', [AuthController::class, 'handleGoogleCallback']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:api')->post('/logout', [AuthController::class, 'logout']);