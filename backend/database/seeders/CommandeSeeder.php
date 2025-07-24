<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Plat;
use App\Models\User;
use App\Models\RestaurentTable;
use Carbon\Carbon;

class CommandeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $serveurs = User::where('role', 'serveur')->get();
        $chefs = User::where('role', 'chef')->get();
        $tables = RestaurentTable::all();
        $plats = Plat::all();

        if ($serveurs->isEmpty() || $chefs->isEmpty() || $tables->isEmpty() || $plats->isEmpty()) {
            $this->command->warn('⚠️ Il manque des serveurs, chefs, tables ou plats. Vérifie les seeders.');
            return;
        }

        foreach (range(1, 10) as $i) {
            $commande = Commande::create([
                'date' => Carbon::now()->subDays(rand(0, 10))->addMinutes(rand(0, 120)),
                'statut' => collect(['en attente', 'en cours', 'terminée'])->random(),
                'serveur_id' => $serveurs->random()->id,
                'chef_id' => $chefs->random()->id,
                'restaurent_table_id' => $tables->random()->id,
            ]);

            // Ajouter 1 à 3 plats dans chaque commande
            $nbPlats = rand(1, 3);
            $platsChoisis = $plats->random($nbPlats);

            foreach ($platsChoisis as $plat) {
                LigneCommande::create([
                    'commande_id' => $commande->id,
                    'plat_id' => $plat->id,
                    'quantite' => rand(1, 3),
                ]);
            }
        }


        
    }
}
