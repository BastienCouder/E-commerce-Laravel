<?php
// ProductController.php
namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
class ProductController extends Controller
{

    public function handleRequest(Request $request)
    {
        switch ($request->method()) {
            case 'GET':
                if ($request->route('product')) {
                    return $this->show($request->route('product'));
                } else {
                    return $this->read();
                }
            case 'POST':
                return $this->store($request);
            case 'PUT':
            case 'PATCH':
                return $this->update($request, $request->route('product'));
            case 'DELETE':
                return $this->destroy($request->route('product'));
            default:
                return response(['message' => 'Invalid Request'], Response::HTTP_BAD_REQUEST);
        }
    }

    public function read()
    {
        $products = Product::with('category')->get();
    return response()->json($products);
    }
    
    public function create()
    {
        return response()->json(['message' => 'Method not allowed for creation.'], Response::HTTP_METHOD_NOT_ALLOWED);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'price' => 'required|numeric',
            // ... d'autres règles de validation selon vos besoins
        ]);
    
        $product = Product::create($request->all());
    
        return response()->json(['product' => $product, 'message' => 'Produit créé avec succès.'], Response::HTTP_CREATED);
    }
    
    public function show(Product $product)
    {
        return response()->json($product, Response::HTTP_OK);
    }
    
    public function edit(Product $product)
    {
        return response()->json(['message' => 'Method not allowed for editing.'], Response::HTTP_METHOD_NOT_ALLOWED);
    }
    
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title' => 'required|max:255',
            'price' => 'required|numeric',
            // ... d'autres règles de validation selon vos besoins
        ]);
    
        $product->update($request->all());
    
        return response()->json(['product' => $product, 'message' => 'Produit mis à jour avec succès.'], Response::HTTP_OK);
    }
    
    public function destroy(Product $product)
    {
        $product->delete();
    
        return response()->json(['message' => 'Produit supprimé avec succès.'], Response::HTTP_NO_CONTENT);
    }    

    // public function checkCategoryProducts()
    // {
    //     $categoryId = 1; // Remplacez 1 par l'ID de la catégorie que vous souhaitez vérifier
    //     $category = Category::find($categoryId);

    //     // Vérifier si la catégorie existe
    //     if ($category) {
    //         // Afficher les produits liés à la catégorie
    //         foreach ($category->products as $product) {
    //             echo $product->title . '<br>';
    //         }
    //     } else {
    //         echo "Catégorie non trouvée.";
    //     }
    // }
}