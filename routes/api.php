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

Route::post('/register', [AuthController::Class, 'register']);
Route::post('/login', [AuthController::Class, 'login']);
Route::post('/logout', [AuthController::Class, 'logout']);