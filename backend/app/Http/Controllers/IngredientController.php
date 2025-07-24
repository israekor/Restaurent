<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ingredient;

class IngredientController extends Controller
{
    public function index()
    {
        return Ingredient::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
            'seuil_alerte' => 'required|integer|min:0',
        ]);

        $ingredient = Ingredient::create($data);
        return response()->json($ingredient, 201);
    }

    public function show($id)
    {
        return Ingredient::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->update($request->only('nom', 'stock', 'seuil_alerte'));

        return response()->json($ingredient);
    }

    public function destroy($id)
    {
        Ingredient::destroy($id);
        return response()->json(['message' => 'Ingrédient supprimé.']);
    }
}
