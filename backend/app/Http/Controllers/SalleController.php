<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salle;

class SalleController extends Controller
{
    public function index()
    {
        return Salle::with('restaurent_tables')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'etage' => 'required|integer',
            'capacite' => 'required|integer',
        ]);

        $salle = Salle::create($request->only('nom', 'etage', 'capacite'));
        return response()->json($salle, 201);
    }

    public function show($id)
    {
        $salle = Salle::with('restaurent_tables')->findOrFail($id);
        return response()->json($salle);
    }

    public function update(Request $request, $id)
    {
        $salle = Salle::findOrFail($id);
        $salle->update($request->only('nom', 'etage', 'capacite'));
        return response()->json($salle);
    }

    public function destroy($id)
    {
        $salle = Salle::findOrFail($id);
        $salle->delete();
        return response()->json(['message' => 'Salle supprimée']);
    }
}