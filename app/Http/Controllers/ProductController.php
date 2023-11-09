<?php
// ProductController.php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Affiche la liste des produits
    public function index()
    {
        $products = Product::all();
        return view('products.index', compact('products'));
    }

    // Affiche le formulaire de création de produit
    public function create()
    {
        return view('products.create');
    }

    // Stocke un nouveau produit dans la base de données
    public function store(Request $request)
    {
        // Valider les données du formulaire
        $request->validate([
            'title' => 'required|max:255',
            'price' => 'required|numeric',
            // ... d'autres règles de validation selon vos besoins
        ]);

        // Créer un nouveau produit
        Product::create($request->all());

        return redirect()->route('products.index')->with('success', 'Produit créé avec succès.');
    }

    // Affiche les détails d'un produit spécifique
    public function show(Product $product)
    {
        return view('products.show', compact('product'));
    }

    // Affiche le formulaire de modification d'un produit
    public function edit(Product $product)
    {
        return view('products.edit', compact('product'));
    }

    // Met à jour les informations d'un produit dans la base de données
    public function update(Request $request, Product $product)
    {
        // Valider les données du formulaire
        $request->validate([
            'title' => 'required|max:255',
            'price' => 'required|numeric',
            // ... d'autres règles de validation selon vos besoins
        ]);

        // Mettre à jour les informations du produit
        $product->update($request->all());

        return redirect()->route('products.index')->with('success', 'Produit mis à jour avec succès.');
    }

    // Supprime un produit de la base de données
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Produit supprimé avec succès.');
    }
}