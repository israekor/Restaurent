<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Notifications\PlatPretNotification;
use App\Models\User;
use App\Models\Commande;
use App\Models\LigneCommande;
use App\Services\StockService;
use Carbon\Carbon;

class CommandeController extends Controller
{
    // Liste toutes les commandes avec leurs lignes et plats associés
    public function index()
    {
        $commandes = Commande::with(['serveur', 'chef', 'table', 'lignesCommande.plat'])->get();
        return response()->json($commandes);
    }

    // Affiche une commande précise
    public function show($id)
    {
        $commande = Commande::with(['serveur', 'chef', 'table', 'lignesCommande.plat'])->findOrFail($id);
        return response()->json($commande);
    }

    // Crée une nouvelle commande avec ses lignes
    public function store(Request $request,StockService $stockService)
    {
        $request->validate([
            'restaurent_table_id' => 'required|exists:restaurent_tables,id',
            'lignes_commande' => 'required|array|min:1',
            'lignes_commande.*.plat_id' => 'required|exists:plats,id',
            'lignes_commande.*.quantite' => 'required|integer|min:1',
        ]);

        // Vérifier que chef_id correspond bien à un chef
        $chef = User::where('role', 'chef')->inRandomOrder()->first();

        if (!$chef) {
            return response()->json(['message' => 'Aucun chef disponible'], 422);
        }

        $commande = Commande::create([
            'date' => Carbon::now(),
            'statut' => 'en attente',
            'serveur_id' => $request->user()->id,
            'chef_id' => $chef->id,
            'restaurent_table_id' => $request->restaurent_table_id,
        ]);

        // Crée les lignes de commande
        foreach ($request->lignes_commande as $ligne) {
            LigneCommande::create([
                'commande_id' => $commande->id,
                'plat_id' => $ligne['plat_id'],
                'quantite' => $ligne['quantite'],
            ]);
        }

        $commande->load([
            'lignesCommande.plat',
            'chef',
            'serveur',
            'table'
        ]);
        $stockService->miseAJourStock($commande);

        return response()->json([
            'message' => 'Commande créée avec succès', 
            'commande' => $commande
        ], 201);
    }

    // Met à jour le statut ou autres infos d'une commande
    public function updateStatut(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:en attente,en cours,terminée',
        ]);

        $commande = Commande::findOrFail($id);
        $commande->statut = $request->statut;
        $commande->save();

        // Si la commande est terminée, on notifie le serveur
        if ($commande->statut === 'terminée') {
            $serveur = $commande->serveur; // Assure-toi d'avoir cette relation dans ton modèle Commande
            if ($serveur) {
                $serveur->notify(new PlatPretNotification($commande->id));
            }
        }

        return response()->json(['message' => 'Statut mis à jour', 'commande' => $commande]);
    }

    // Supprime une commande
    public function destroy($id)
    {
        $commande = Commande::findOrFail($id);
        $commande->delete();
        return response()->json(['message' => 'Commande supprimée']);
    }   
    
    
    // Récupère toutes les commandes assignées au chef connecté
    public function commandesChef(Request $request)
    {
        $chef = $request->user();

        $commandes = Commande::where('chef_id', $chef->id)
            ->with(['serveur', 'table', 'lignesCommande.plat'])
            ->orderBy('date', 'desc')
            ->get();

        Log::info('Test log chef 🔥');

        Log::info('Utilisateur chef détecté', [
            'id' => $chef->id,
            'role' => $chef->role,
        ]);

        return response()->json($commandes);
    }

    // Liste les commandes avec un statut spécifique
    public function commandesParStatut(Request $request)
    {
        $request->validate([
            'statut' => 'required|in:en attente,en cours,terminée'
        ]);

        $commandes = Commande::where('statut', $request->statut)
            ->with(['serveur', 'chef', 'table', 'lignesCommande.plat'])
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($commandes);
    }


}
