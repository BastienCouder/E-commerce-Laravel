<?php
// ProductController.php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
class CartController extends Controller
{

    public function handleRequest(Request $request)
    {
        switch ($request->method()) {
            case 'GET':
                return Auth::check() ? $this->read() : $this->publicRead();
            case 'POST':
                return Auth::check() ? $this->create($request) : $this->publicCreate($request);
            case 'PUT':
            case 'PATCH':
                return $this->update($request, $request->route('cart'));
            case 'DELETE':
                return $this->destroy($request->route('cart'));
            default:
                return response(['message' => 'Invalid Request'], Response::HTTP_BAD_REQUEST);
        }
    }

    public function read()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $cart = $user->cart;
        } else {

            $cart = session('cart', []);
        }
    
        return response()->json(['cart' => $cart]);
    }

    public function create(Request $request)
    {
        try {
            error_log("create");
            // Validation des données de la requête
            $request->validate([
                'productId' => 'required|exists:products,id',
            ]);
            
            $productId = $request->input('productId');
            error_log("Requested Product ID: " . $productId);
            $user = Auth::user();
            error_log("User ID: " . ($user ? $user->id : "Guest"));
    
            // Vérifier si l'utilisateur est authentifié
            if ($user && Auth::check()) {
                $cart = $user->cart;
            
                if (!$cart) {
                    $cart = new Cart();
                    $cart->total_price = 0;
                    $cart->status = 'active';
                    $cart->user()->associate($user);
                    $cart->save();
                }
            
                error_log("Cart ID: " . $cart->id);
            }
            else {
                    // L'utilisateur n'est pas authentifié, utilisez la session pour le panier
                    $cart = session('cart', []);
                
                    if (empty($cart)) {
                        $cart = new Cart();
                        $cart->total_price = 0;
                        $cart->status = 'active';
                        $cart->save();
                
                        // Stockez l'ID du panier dans la session
                        session(['cart' => ['id' => $cart->id]]);
                    }
                
                    // Vous pouvez accéder à l'ID du panier de la session de cette manière (à des fins de journalisation par exemple)
                }
                error_log("Cart ID: " . ($cart['id'] ?? "N/A"));
                
    
            $product = Product::find($productId);
    
            if ($product) {
                $existingCartItem = $cart->cartItems()->where('product_id', $productId)->first();
                error_log("Existing Cart Item: " . json_encode($existingCartItem));
    
                if ($existingCartItem) {
                    $existingCartItem->quantity += 1;
                    $existingCartItem->save();
                } else {
                    $cartItem = new CartItem(['quantity' => 1]);
                    $cartItem->cart()->associate($cart);
                    $cartItem->product()->associate($product);
                    $cartItem->save();
                    error_log("Cart Item: " . json_encode($cartItem));
                }
    
                $cart->total_price += $product->price;
                $cart->save();


            }

        } catch (\Exception $e) {
            // Gérer l'exception si elle se produit
            error_log($e->getMessage());
            error_log("Exception Trace: " . $e->getTraceAsString());
            return response()->json(['message' => 'Une erreur s\'est produite'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    


    // public function create(Request $request)
    // {
    //     try {
    //         // Validation des données de la requête
    //         $request->validate([
    //             'productId' => 'required|exists:products,id',
    //         ]);
    
    //         // Récupérer le produit à partir de l'ID
    //         $productId = $request->input('productId');
    //         $product = Product::find($productId);
    
    //         // Vérifier si le produit existe et est actif
    //         if (!$product) {
    //             return response()->json(['message' => 'Produit non trouvé ou non disponible'], Response::HTTP_NOT_FOUND);
    //         }
    
    //         // Récupérer l'utilisateur authentifié
    //         $user = Auth::user();
    
    //         // Initialiser le panier
    //         if ($user) {
    //             $cart = $user->cart;
    
    //             if (!$cart) {
    //                 $cart = new Cart();
    //                 $cart->total_price = 0;
    //                 $cart->status = 'active';
    //                 $cart->user()->associate($user);
    //                 $cart->save();
    //             }
    //         } else {
    //             $cart = session('cart', []);
    
    //             if (empty($cart)) {
    //                 $cart = new Cart();
    //                 $cart->total_price = 0;
    //                 $cart->status = 'active';
    //                 $cart->save();
    //                 session(['cart' => $cart]);
    //             }
    //         }
    
    //         // Vérifier si le produit est déjà dans le panier
    //         $existingCartItem = $cart->cartItems()->where('product_id', $productId)->first();
    
    //         if ($existingCartItem) {
    //             $existingCartItem->quantity += 1;
    //             $existingCartItem->save();
    //         } else {
    //             $cartItem = new CartItem(['quantity' => 1]);
    //             $cartItem->product()->associate($product);
    //             $cart->cartItems()->save($cartItem);
    //         }
    
    //         // Mettre à jour le prix total du panier
    //         $cart->total_price += $product->price;
    //         $cart->save();
    
    //         // Nettoyer le panier de la session si l'utilisateur est authentifié
    //         if (Auth::check()) {
    //             session(['cart' => []]);
    //         }
    
    //         return response()->json([
    //             'success' => true,
    //             'cart' => $cart,
    //             'cartItems' => $cart->cartItems,
    //         ]);
    //     } catch (\Exception $e) {
    //         error_log($e->getMessage());
    //         return response()->json(['message' => 'Une erreur s\'est produite'], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }
}