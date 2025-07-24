<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Models\RestaurentTable;

class TableController extends Controller
{
    public function index()
    {
        return RestaurentTable::with(['salle', 'user'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'numero' => 'required|integer|unique:restaurent_tables,numero',
            'capacite' => 'required|integer',
            'salle_id' => 'required|exists:salles,id',
        ]);

        $table = RestaurentTable::create($request->only('numero', 'capacite', 'salle_id'));
        return response()->json($table, 201);
    }

    public function show($id)
    {
        $table = RestaurentTable::with(['salle', 'user'])->findOrFail($id);
        return response()->json($table);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'numero' => 'sometimes|integer|unique:restaurent_tables,numero',
            'capacite' => 'sometimes|integer',
            'salle_id' => 'sometimes|exists:salles,id',
        ]);

        $table = RestaurentTable::findOrFail($id);
        $table->update($request->only('numero', 'capacite', 'salle_id'));

        return response()->json($table);
    }

    public function destroy($id)
    {
        $table = RestaurentTable::findOrFail($id);
        $table->delete();
        return response()->json(['message' => 'Table supprimée']);
    }

    public function assignTable(Request $request)
    {
        $request->validate([
            'table_id' => 'required|exists:restaurent_tables,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $table = RestaurentTable::find($request->table_id);

        // Vérifie si la table est déjà affectée
        if ($table->user_id !== null) {
            return response()->json(['message' => 'Table déjà assignée à un serveur.'], 400);
        }

        $table->user_id = $request->user_id;
        $table->save();

        return response()->json(['message' => 'Table affectée avec succès', 'table' => $table]);
    }

    public function tablesDisponibles()
    {
        $tables = RestaurentTable::with('salle')
        ->whereNull('user_id')
        ->get();

        if ($tables->isEmpty()) {
            return response()->json(['message' => 'Aucune table libre disponible'], 404);
        }

        return response()->json($tables);

    }

}
