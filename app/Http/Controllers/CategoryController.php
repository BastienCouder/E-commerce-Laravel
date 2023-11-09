<?php
// CategoryController.php
namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function handleRequest(Request $request)
    {
        switch ($request->method()) {
            case 'GET':
                if ($request->route('category')) {
                    return $this->show($request->route('category'));
                } else {
                    return $this->read();
                }
            case 'POST':
                return $this->store($request);
            case 'PUT':
            case 'PATCH':
                return $this->update($request, $request->route('category'));
            case 'DELETE':
                return $this->destroy($request->route('category'));
            default:
                return response(['message' => 'Invalid Request'], Response::HTTP_BAD_REQUEST);
        }
    }

    public function index()
    {
        $categories = category::all();
        return response()->json($categories);
    }
    
    public function create()
    {
        return response()->json(['message' => 'Method not allowed for creation.'], Response::HTTP_METHOD_NOT_ALLOWED);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            // ... d'autres règles de validation selon vos besoins
        ]);
    
        $category = Category::create($request->all());
    
        return response()->json(['category' => $category, 'message' => 'Produit créé avec succès.'], Response::HTTP_CREATED);
    }
    
    public function show(category $category)
    {
        return response()->json(['category' => $category], Response::HTTP_OK);
    }
    
    public function edit(Category $category)
    {
        return response()->json(['message' => 'Method not allowed for editing.'], Response::HTTP_METHOD_NOT_ALLOWED);
    }
    
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|max:255',
            // ... d'autres règles de validation selon vos besoins
        ]);
    
        $category->update($request->all());
    
        return response()->json(['category' => $category, 'message' => 'Produit mis à jour avec succès.'], Response::HTTP_OK);
    }
    
    public function destroy(Category $category)
    {
        $category->delete();
    
        return response()->json(['message' => 'Produit supprimé avec succès.'], Response::HTTP_NO_CONTENT);
    }    

    // public function checkCategorycategorys()
    // {
    //     $categoryId = 1; // Remplacez 1 par l'ID de la catégorie que vous souhaitez vérifier
    //     $category = Category::find($categoryId);

    //     // Vérifier si la catégorie existe
    //     if ($category) {
    //         // Afficher les produits liés à la catégorie
    //         foreach ($category->categorys as $category) {
    //             echo $category->title . '<br>';
    //         }
    //     } else {
    //         echo "Catégorie non trouvée.";
    //     }
    // }
}