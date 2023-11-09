<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DeliveryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Routes pour les produits
Route::resource('products', ProductController::class);

// Routes pour les catégories
Route::resource('categories', CategoryController::class);

// Routes pour les paniers
Route::resource('carts', CartController::class);

// Routes pour les commandes
Route::resource('orders', OrderController::class);

// Routes pour les livraisons
Route::resource('deliveries', DeliveryController::class);