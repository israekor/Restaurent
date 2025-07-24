<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plat;

class PlatController extends Controller
{
    // Liste tous les plats
    public function index()
    {
        return Plat::all();
    }

    // Crée un nouveau plat
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prix' => 'required|numeric',
            'description' => 'nullable|string',
            'categorie' => 'required|in:entrée,plat,dessert,boisson',
            'statut' => 'in:disponible,indisponible'
        ]);

        $plat = Plat::create($request->only('nom', 'prix', 'description', 'categorie', 'statut'));

        return response()->json($plat, 201);
    }

    // Affiche un plat précis
    public function show($id)
    {
        $plat = Plat::findOrFail($id);
        return response()->json($plat);
    }

    // Met à jour un plat
    public function update(Request $request, $id)
    {
        $plat = Plat::findOrFail($id);

        $request->validate([
            'nom' => 'sometimes|required|string',
            'prix' => 'sometimes|required|numeric',
            'description' => 'nullable|string',
            'categorie' => 'sometimes|required|in:entrée,plat,dessert,boisson',
            'statut' => 'in:disponible,indisponible'
        ]);

        $plat->update($request->only('nom', 'prix', 'description', 'categorie', 'statut'));

        return response()->json($plat);
    }

    // Supprime un plat
    public function destroy($id)
    {
        $plat = Plat::findOrFail($id);
        $plat->delete();

        return response()->json(['message' => 'Plat supprimé avec succès']);
    }
}
