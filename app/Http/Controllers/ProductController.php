<?php
// ProductController.php
namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

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
                return $this->update($request, $request->route('product'));
            case 'PATCH':
                return $this->updateStock($request->route('product'), $request);
            case 'DELETE':
                return $this->destroy($request->route('product'));
            default:
                return response(['message' => 'Invalid Request'], Response::HTTP_BAD_REQUEST);
        }
    }

    public function read()
    {
        $products = Product::with('category')->get();
    
        foreach ($products as $product) {
            $product->image = asset(Storage::url($product->image));
        }
    
        return response()->json($products);
    }
    public function store(Request $request)
    {
        try {
          
         
          
            $imageFile = $request->file('image');

            if ($imageFile) {
                error_log('Image File Details: ' . print_r([
                    'Original Name' => $imageFile->getClientOriginalName(),
                    'Mime Type' => $imageFile->getClientMimeType(),
                    'Size' => $imageFile->getSize(),
                    // Ajoutez d'autres détails selon vos besoins
                ], true));
            } else {
                error_log('No Image File provided in the request.');
            }
            $imageName = time().'.'.$request->image->extension();
    
            $request->image->move(public_path('images'),$imageName);
            $requestData = $request->all();
            $product = Product::create([
                'name' => $requestData['name'],
                'image' => $requestData['image'],
                'category_id' => $requestData['category_id'],
                'shortDescription' => $requestData['shortDescription'],
                'longDescription' => $requestData['longDescription'],
                'price' => $requestData['price'],
                'stock' => $requestData['stock'],
                'value' => false,
            ]);
            $product->save();
        
            error_log('Request Data: ' . json_encode($requestData));
         
    
            return response()->json([
                'product' => $product,
                'message' => 'Produit créé avec succès.'
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            error_log('Erreur lors de la création du produit : ' . $e->getMessage());
    
            return response()->json(['error' => 'Erreur lors de la création du produit.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
    public function show(Product $productId)
    {
        return response()->json($productId, Response::HTTP_OK);
    }
    
    public function update(Request $request, Product $productId)
{
    try {
        \Log::error($request->all());

        $requestData = $request->all();
        $productId->update($requestData);
     

        return response()->json(['product' => $productId, 'message' => 'Produit mis à jour avec succès.'], Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
    
    public function destroy(Product $productId)
    {
        try {
            $productId->delete();
            \Log::error('Produit supprimé avec succès. ID : ' . $productId->id);
    
            return response()->json(['message' => 'Produit supprimé avec succès.'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression du produit. ID : ' . $productId->id . ' Erreur : ' . $e->getMessage());
    
            return response()->json(['message' => 'Erreur lors de la suppression du produit.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
        public function updateStock(Request $request, $productId)
        {
            $newQuantity = $request->input('newQuantity');
            $product = Product::find($productId);
            $product->stock = $newQuantity;
            $product->save();
            return response()->json(['newQuantity' => $newQuantity]);
        
    }
}