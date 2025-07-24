<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Salle;
use App\Models\RestaurentTable;
use App\Models\Slot;
use Carbon\Carbon;

class SalleTableSeeder extends Seeder
{
    public function run()
    {
        // Récupérer les réceptionnistes déjà créés
        $serveurs = User::where('role', 'serveur')->take(3)->get();

        if ($serveurs->count() < 3) {
            $this->command->warn("⚠️ Moins de 3 serveurs trouvés. Ajoute-les d'abord dans UserSeeder.");
            return;
        }

         $date = Carbon::now()->format('Y-m-d'); // ⏱️ Pour générer des slot du jour

        // Créer 3 salles et 5 tables dans chacune
        foreach (range(1, 3) as $index) {
            $salle = Salle::create([
                'nom' => 'Salle ' . $index,
                'etage' => $index,
                'capacite' => 20 + ($index * 10),
            ]);

            foreach (range(1, 5) as $j) {
                $table = RestaurentTable::create([
                    'numero' => ($index - 1) * 5 + $j,
                    'capacite' => rand(2, 6),
                    'salle_id' => $salle->id,
                    'user_id' => $serveurs[$index - 1]->id,
                ]);

                // 🕒 Générer des créneaux pour cette table
                $start = Carbon::createFromTime(18, 0);
                $end = Carbon::createFromTime(23, 0);
                $slotDuration = 90; // minutes (1h30)

                while ($start->copy()->addMinutes($slotDuration) <= $end) {
                    Slot::create([
                        'restaurent_table_id' => $table->id,
                        'start_time' => $start->format('H:i'),
                        'end_time' => $start->copy()->addMinutes($slotDuration)->format('H:i'),
                        'created_at' => $date,
                        'updated_at' => $date,
                    ]);

                    $start->addMinutes($slotDuration);
            }
        }
    }

        $this->command->info("✅ Salles, tables et créneaux générés avec succès !");
    }
}