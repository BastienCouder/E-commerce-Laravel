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
        if (!Auth::check()) {
            return response(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        switch ($request->method()) {
            case 'GET':
                return $this->read($request);
            case 'POST':
                return $this->create($request);
            case 'PUT':
                return $this->update($request);
            case 'PATCH':
                return $this->updateStatus($request);
            case 'DELETE':
                return $this->delete($request);
            default:
                return response(['message' => 'Invalid Request'], Response::HTTP_BAD_REQUEST);
        }
    }
    public function index()
    {
        try {
            $orderItems = OrderItem::with('order', 'cart.cartItems.product', 'deliveryItem')->get();

            return response()->json($orderItems);
        }catch (\Exception $e) {
            \Log::error('Une erreur s\'est produite: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred.'], Response::HTTP_INTERNAL_SERVER_ERROR);
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
                
                $orderTotalPrice = $order->total_price;
                return response()->json(['order' => $order, 'orderItems' => $orderItems, 'orderTotalPrice' => $orderTotalPrice]);
               
            } else {
                return response()->json(['message' => 'Données de livraison non trouvées pour cet utilisateur.'], 404);
            }
        } catch (\Exception $e) {
            \Log::error('Une erreur s\'est produite : ' . $e->getMessage());
            return response()->json(['message' => 'Une erreur s\'est produite.'], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $user = Auth::user();
    
            if ($user && Auth::check()) {
    
                $order = $user->order;
    
                if (!$order) {;
    
                    $order = new Order();
                    $order->user()->associate($user);
                    $order->save();
                }
    
                $cartId = $request->input('cartId');
                $deliveryItemId = $request->input('deliveryItemId');
    
                $cart = Cart::find($cartId);
    
                if ($cart && $deliveryItemId) {
                    $orderNumber = $this->generateOrderNumber();
                    $totalPrice = $cart->total_price;
    
                    foreach ($cart->cartItems as $cartItem) {
                        $product = $cartItem->product;
                    
                        if ($product->stock >= $cartItem->quantity) {
                            $product->stock -= $cartItem->quantity;
                            $product->save();
                        } else {
                            return response()->json(['message' => 'La quantité en stock n\'est pas suffisante.'], Response::HTTP_BAD_REQUEST);
                        }
                    }
    
                    $orderItem = new OrderItem([
                        'cart_id' => $cartId,
                        'deliveryItem_id' => $deliveryItemId,
                        'isPaid' => false,
                        'status' => 'En attente',
                        'order_number' => $orderNumber,
                    ]);
    
                    $orderItem->total_price = $totalPrice;
                    $orderItem->save();

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

    public function updateStatus(Request $request, $orderItemId)
    {
        $newStatus = $request->input('newStatus');
        $orderItem = OrderItem::find($orderItemId);
    
        if (!$orderItem) {
            return response()->json(['error' => 'Order Item not found'], 404);
        }
        $orderItem->status = $newStatus;
        $orderItem->save();
    
        return response()->json(['newStatus' => $newStatus]);
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