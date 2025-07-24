<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\RestaurentTable;
use App\Models\User;
use App\Models\Plat;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class RapportController extends Controller
{
    // 📊 Statistiques de vente par période
    public function statistiquesVentes(Request $request)
    {
        $request->validate([
            'periode' => 'required|in:jour,semaine,mois',
            'date' => 'nullable|date',
        ]);

        $date = $request->date ? Carbon::parse($request->date) : Carbon::now();

        $labels = [];
        $data = [];

        if ($request->periode === 'jour') {
            for ($i = 0; $i < 24; $i++) {
                $start = $date->copy()->setTime($i, 0);
                $end = $date->copy()->setTime($i, 59);
                $count = Commande::whereBetween('date', [$start, $end])->count();

                $labels[] = $i . 'h';
                $data[] = $count;
            }
        } elseif ($request->periode === 'semaine') {
            $startOfWeek = $date->startOfWeek();
            for ($i = 0; $i < 7; $i++) {
                $day = $startOfWeek->copy()->addDays($i);
                $count = Commande::whereDate('date', $day)->count();

                $labels[] = $day->format('l'); // lundi, mardi...
                $data[] = $count;
            }
        } else { // mois
            $daysInMonth = $date->daysInMonth;
            for ($i = 1; $i <= $daysInMonth; $i++) {
                $day = $date->copy()->day($i);
                $count = Commande::whereDate('date', $day)->count();

                $labels[] = $day->format('d');
                $data[] = $count;
            }
        }

        return response()->json([
            'labels' => $labels,
            'data' => $data,
        ]);
    }

    // 📈 Taux d’occupation des tables
    public function tauxOccupationTables(Request $request)
    {
        $request->validate([
            'date_debut' => 'nullable|date',
            'date_fin' => 'nullable|date',
        ]);

        $dateDebut = $request->date_debut ? Carbon::parse($request->date_debut) : Carbon::now()->startOfMonth();
        $dateFin = $request->date_fin ? Carbon::parse($request->date_fin) : Carbon::now()->endOfMonth();

        $totalTables = RestaurentTable::count();

        $tablesReservees = DB::table('reservations')
            ->whereBetween('date', [$dateDebut, $dateFin])
            ->distinct('restaurent_table_id')
            ->count('restaurent_table_id');

        $tauxOccupation = $totalTables > 0 ? ($tablesReservees / $totalTables) * 100 : 0;

        return response()->json([
            'labels' => ['Occupées', 'Libres'],
            'data' => [
                round($tauxOccupation, 2),
                round(100 - $tauxOccupation, 2)
            ]
        ]);
    }

    // 📊 Performance par employé
    public function performanceEmployes(Request $request)
    {
        $request->validate([
            'date_debut' => 'nullable|date',
            'date_fin' => 'nullable|date',
        ]);

        $dateDebut = $request->date_debut ? Carbon::parse($request->date_debut) : Carbon::now()->startOfMonth();
        $dateFin = $request->date_fin ? Carbon::parse($request->date_fin) : Carbon::now()->endOfMonth();

        // Serveurs
        $serveurs = User::where('role', 'Serveur')
        ->selectRaw("CONCAT(nom, ' ', prenom) as nom, 'Serveur' as role")
        ->selectRaw("(SELECT COUNT(*) FROM commandes WHERE commandes.serveur_id = users.id AND date BETWEEN ? AND ?) as taches", [$dateDebut, $dateFin]);

        // Chefs
        $chefs = User::where('role', 'Chef')
            ->selectRaw("CONCAT(nom, ' ', prenom) as nom, 'Chef' as role")
            ->selectRaw("(SELECT COUNT(*) FROM commandes WHERE commandes.chef_id = users.id AND date BETWEEN ? AND ?) as taches", [$dateDebut, $dateFin]);

        // Réceptionnistes
        $receptions = User::where('role', 'Réceptionniste')
            ->selectRaw("CONCAT(nom, ' ', prenom) as nom, 'Réceptionniste' as role")
            ->selectRaw("(SELECT COUNT(*) FROM reservations WHERE reservations.user_id = users.id AND date BETWEEN ? AND ?) as taches", [$dateDebut, $dateFin]);

        $resultats = $serveurs->unionAll($chefs)->unionAll($receptions)->get();

        return response()->json($resultats);
    }

    public function platsVendusParType(Request $request)
    {
        // Requête sur les plats avec leurs lignes de commande
        $resultats = Plat::with('ligneCommandes')
            ->get()
            ->groupBy('categorie') // Groupement par type
            ->map(function ($plats) {
                // Pour chaque catégorie, on additionne les quantités vendues
                return $plats->sum(function ($plat) {
                    return $plat->ligneCommandes->sum('quantite');
                });
            });

        return response()->json([
            'labels' => $resultats->keys(),
            'data' => $resultats->values(),
        ]);
    }

}
