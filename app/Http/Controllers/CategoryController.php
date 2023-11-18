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
                return $this->read();
            case 'POST':
                return $this->store($request);
            case 'PUT':
            case 'PATCH':
            case 'DELETE':
                return $this->destroy($request->route('category'));
            default:
                return response(['message' => 'Invalid Request'], Response::HTTP_BAD_REQUEST);
        }
    }

    public function read()
    {
        $categories = category::all();
        return response()->json($categories);
    }
    
    public function create()
    {
        return response()->json(['message' => 'Method not allowed for creation.'], Response::HTTP_METHOD_NOT_ALLOWED);
    }

    public function destroy(Category $category)
    {
        $category->delete();
    
        return response()->json(['message' => 'Produit supprimé avec succès.'], Response::HTTP_NO_CONTENT);
    }    
}