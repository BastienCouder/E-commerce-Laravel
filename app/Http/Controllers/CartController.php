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

    public function read(Request $request)
    {
        try {
    
            $user = Auth::user();
            $cart = $user->cart;
            if ($cart) {
                $cartItems = $cart->cartItems()->with('product')->get();
                return response()->json(['cart' => $cart, 'cartItems' => $cartItems]);
            } else {
                return response()->json(['message' => 'Panier non trouvé.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Une erreur s\'est produite.'], 500);
        }
    }

    public function publicRead()
    {
        $cart = session('cart', []);

        return response()->json(['cart' => $cart]);
    }

    public function create(Request $request)
    {
        try {
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
    
    public function publicCreate(Request $request)
{
    try {
        $request->validate([
            'productId' => 'required|exists:products,id',
        ]);

        $productId = $request->input('productId');
        $cartId = $request->input('cartId');
        error_log("Requested Product ID: " . $productId);
        error_log("Requested Cart ID: " . $cartId);

        // L'utilisateur n'est pas authentifié, utilisez la session pour le panier
        $cart = session('cart', []);

        if ($cartId) {
            // Si un 'cartId' est spécifié, chargez le panier existant
            $cart = Cart::with('cartItems')->find($cartId);
            if ($cart) {
                // Stockez l'ID du panier dans la session
                session(['cart' => ['id' => $cart->id]]);
            }
        } elseif (empty($cart)) {
            // Si 'cartId' n'est pas spécifié et le panier de session est vide, créez un nouveau panier
            $cart = new Cart();
            $cart->total_price = 0;
            $cart->status = 'active';
            $cart->save();
            // Stockez l'ID du panier dans la session
            session(['cart' => ['id' => $cart->id]]);
        }

        // Vous pouvez accéder à l'ID du panier de la session de cette manière (à des fins de journalisation par exemple)
        error_log("Cart ID: " . ($cart['id'] ?? "N/A"));

        $product = Product::find($productId);

        if ($product) {
            $existingCartItem = $cart->cartItems->where('product_id', $productId)->first();
            error_log("Existing Cart Item: " . json_encode($existingCartItem));

            if ($existingCartItem) {
                // Le produit existe déjà dans le panier, incrémentez simplement la quantité
                $existingCartItem->quantity += 1;
                $existingCartItem->save();
            } else {
                // Le produit n'existe pas encore dans le panier, créez un nouvel élément de panier
                $cartItem = new CartItem(['quantity' => 1]);
                $cartItem->cart()->associate($cart);
                $cartItem->product()->associate($product);
                $cartItem->save();
                error_log("Cart Item: " . json_encode($cartItem));
            }

            // Mettre à jour le total_price du panier
            $cart->total_price += $product->price;
            $cart->save();
        }

        return response()->json([
            'success' => true,
            'cart' => $cart,
            'cartItems' => $cart->cartItems,
        ])->withCookie(cookie('cart_id', $cart->id, 60 * 24 * 30));
    } catch (\Exception $e) {
        // Gérer l'exception si elle se produit
        error_log($e->getMessage());
        error_log("Exception Trace: " . $e->getTraceAsString());
        return response()->json(['message' => 'Une erreur s\'est produite'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}


public function update(Request $request, $cartItemId)
{
    try {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::find($cartItemId);

        if (!$cartItem) {
            throw new \Exception('Cart item not found.');
        }

        $cartItem->quantity = $request->input('quantity');
        $cartItem->save();

        return response()->json(['message' => 'Quantity updated successfully.']);
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
}


public function mergeCart(Request $request)
{
    try {
        $cartId = $request->input('cartId');
        
        // Vérifiez si l'utilisateur est authentifié
        $user = Auth::user();
        if (!$user) {
            throw new \Exception('L\'utilisateur n\'est pas authentifié.');
        }

        error_log("User ID: " . $user->id);

        // Récupérez le panier associé à l'ID du cookie
        $cookieCart = Cart::with('cartItems')->find($cartId);

        if (!$cookieCart) {
            throw new \Exception('Panier associé à l\'ID du cookie introuvable.');
        }

        error_log("Cookie Cart ID: " . $cookieCart->id);

        // Récupérez le panier de l'utilisateur connecté
        $userCart = $user->cart;

        if (!$userCart) {
            // Si l'utilisateur n'a pas de panier, associez le panier du cookie à l'utilisateur
            $cookieCart->user()->associate($user);
            $cookieCart->save();

            error_log("Cookie Cart associé à l'utilisateur.");
        } else {
            // Fusionnez les articles du panier associé à l'ID du cookie avec le panier de l'utilisateur
            foreach ($cookieCart->cartItems as $cartItem) {
                // Vérifiez si le produit existe déjà dans le panier de l'utilisateur
                $existingCartItem = $userCart->cartItems()->where('product_id', $cartItem->product_id)->first();

                if ($existingCartItem) {
                    // Le produit existe déjà, incrémentez simplement la quantité
                    $existingCartItem->quantity += $cartItem->quantity;
                    $existingCartItem->save();
                } else {
                    // Le produit n'existe pas encore, créez un nouvel élément de panier dans le panier de l'utilisateur
                    $newCartItem = new CartItem([
                        'quantity' => $cartItem->quantity,
                        'product_id' => $cartItem->product_id,
                    ]);
                    $userCart->cartItems()->save($newCartItem);
                }
            }

            // Mettez à jour le total_price du panier de l'utilisateur
            $userCart->total_price += $cookieCart->total_price;
            $userCart->save();

            error_log("Articles du Cookie Cart fusionnés avec le panier de l'utilisateur.");
        }

        // Supprimez le panier associé à l'ID du cookie
        $cookieCart->delete();

        error_log("Cookie Cart supprimé.");

        return response()->json(['message' => 'Fusion des paniers réussie.']);
    } catch (\Exception $e) {
        error_log("Erreur lors de la fusion des paniers: " . $e->getMessage());
        return response()->json(['message' => 'Une erreur s\'est produite lors de la fusion des paniers.'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
}