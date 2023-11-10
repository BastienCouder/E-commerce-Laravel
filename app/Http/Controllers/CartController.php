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
                return $this->read();
            case 'POST':
                return $this->create($request);
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
            // Récupérer les données de la requête
            $productId = $request->input('productId');
    
            $user = null;
            // Vérifier si l'utilisateur est authentifié
            if (Auth::check()) {
                $user = Auth::user();
                $cart = $user->cart;
    
                // Si l'utilisateur n'a pas de panier, créez-en un
                if (!$cart) {
                    $cart = new Cart();
                    $cart->total_price = 0;
                    $cart->status = 'active';
                    $cart->user()->associate($user);
                    $cart->save();
                }
            } else {
                // Utilisateur non authentifié, obtient le panier depuis la session
                $cart = session('cart', []);
    
                // Si l'utilisateur n'a pas encore de panier, créez-en un
                if (empty($cart)) {
                    $cart = new Cart();
                    $cart->total_price = 0;
                    $cart->status = 'active';
                    $cart->save();
                    session(['cart' => $cart]);
                }
            }
    
            // Trouver le produit par ID
            $product = Product::find($productId);
    
            // Vérifier si le produit existe
            if ($product) {
                // Affichez les informations de débogage
                error_log("User ID: " . ($user ? $user->id : "Guest"));
                error_log("Cart ID: " . $cart->id);
                error_log("Product ID: " . $product->id);
    
                // Vérifiez si le produit est déjà dans le panier
                $existingCartItem = $cart->cartItems()->where('product_id', $productId)->first();
                error_log("Existing Cart Item: " . json_encode($existingCartItem));
    
                if ($existingCartItem) {
                    // Le produit existe déjà dans le panier, augmentez simplement la quantité
                    $existingCartItem->quantity += 1; // Augmenter la quantité de 1
                    $existingCartItem->save();
                } else {
                    // Le produit n'existe pas encore dans le panier, créez un nouvel élément CartItem avec la quantité fixée à 1
                    $cartItem = new CartItem(['quantity' => 1]);
                    $cartItem->cart()->associate($cart);
                    $cartItem->product()->associate($product);
                    $cartItem->save();
                }
    
                // Mettez à jour le total_price du panier
                $cart->total_price += $product->price; // Ajouter le prix du produit au total_price
                $cart->save();
    
                // Retourne le panier sous forme de JSON avec les nouveaux détails du panier
                return response()->json(['cart' => $cart, 'cartItems' => $cart->cartItems]);
            } else {
                return response()->json(['message' => 'Produit non trouvé'], Response::HTTP_NOT_FOUND);
            }
        } catch (\Exception $e) {
            // Gérer l'exception si elle se produit
            error_log($e->getMessage());
            return response()->json(['message' => 'Une erreur s\'est produite'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}