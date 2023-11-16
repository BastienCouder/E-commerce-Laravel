<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Order;
use App\Models\Cart;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    public function handleRequest(Request $request)
    {
        if (Auth::check()) {
            switch ($request->method()) {
                case 'GET':
                    return $this->read($request);
                case 'POST':
                    return $this->create($request);
                case 'PUT':
                    return $this->update($request);
                case 'PATCH':
                case 'DELETE':
                    return $this->delete($request);
                default:
                    return response(['message' => 'Invalid Request'], Response::HTTP_BAD_REQUEST);
            }
        } else {
            return response(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function read(Request $request)
    {
        try {
            $user = Auth::user();
    
            if (!$user || !Auth::check()) {
                return response()->json(['message' => 'Utilisateur non authentifié.'], 401);
            }
    
            $order = $user->order;
    
            if ($order) {
                
                $orderItems = $order->orderItems()->with('cart.cartItems.product', 'deliveryItem')->get();
                error_log("OrderItems : " . $orderItems);
                
                // $orderTotalPrice = $order->total_price;
                // return response()->json(['order' => $order, 'orderItems' => $orderItems, 'orderTotalPrice' => $orderTotalPrice]);
                return response()->json(['order' => $order, 'orderItems' => $orderItems]);
            } else {
                return response()->json(['message' => 'Données de livraison non trouvées pour cet utilisateur.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Une erreur s\'est produite.'], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $user = Auth::user();
    
            if ($user && Auth::check()) {
                error_log("User ID: " . $user->id);
    
                $order = $user->order;
    
                if (!$order) {
                    error_log("Création d'une nouvelle commande pour l'utilisateur " . $user->id);
    
                    $order = new Order();
                    $order->user()->associate($user);
                    $order->save();
                } else {
                    error_log("L'utilisateur a déjà une commande : " . $order->id);
                }
    
                $cartId = $request->input('cartId');
                $deliveryItemId = $request->input('deliveryItemId');
    
                error_log("Cart ID: " . $cartId);
                error_log("Delivery Item ID: " . $deliveryItemId);
    
                $cart = Cart::find($cartId);
    
                if ($cart && $deliveryItemId) {
                    $orderNumber = $this->generateOrderNumber();
    
                    foreach ($cart->cartItems as $cartItem) {
                        $product = $cartItem->product;
                    
                        if ($product->stock >= $cartItem->quantity) {
                            $product->stock -= $cartItem->quantity;
                            $product->save();
                    
                            error_log("Quantité en stock mise à jour pour {$product->name}. Nouveau stock : {$product->stock}");
                        } else {
                            error_log("La quantité en stock de {$product->name} n'est pas suffisante.");
                            return response()->json(['message' => 'La quantité en stock n\'est pas suffisante.'], Response::HTTP_BAD_REQUEST);
                        }
                    }
    
                    $orderItem = new OrderItem([
                        'cart_id' => $cartId,
                        'deliveryItem_id' => $deliveryItemId,
                        'isPaid' => false,
                        'status' => 'en_attente',
                        'order_number' => $orderNumber,
                    ]);
    
                    $order->orderItems()->save($orderItem);
    
                    $cart->status = 'inactive';
                    $cart->save();
    
                    error_log("Order Item created successfully.");
                } else {
                    error_log("Cart or Delivery Item not found.");
                }
            }
        } catch (\Exception $e) {
            error_log($e->getMessage());
            error_log("Exception Trace: " . $e->getTraceAsString());
            return response()->json(['message' => 'Une erreur s\'est produite'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    

    private function generateOrderNumber()
{
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $randomString = '';
    for ($i = 0; $i < 8; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return 'CMD' . $randomString;
}
}