<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reservation;
use App\Models\RestaurentTable;
use App\Models\User;
use App\Models\Slot;
use Carbon\Carbon;

class ReservationSeeder extends Seeder
{
    public function run()
    {
        $receptionnistes = User::where('role', 'receptionniste')->get();
        $tables = RestaurentTable::all();

        if ($receptionnistes->isEmpty() || $tables->isEmpty()) {
            $this->command->warn('Aucun réceptionniste ou table disponible.');
            return;
        }

        $reservationsData = [
            ['nom' => 'Amina El Fassi', 'jour' => 1, 'heure' => '19:00', 'duree' => 90, 'personnes' => 4],
            ['nom' => 'Mouna El Ghani', 'jour' => 1, 'heure' => '20:30', 'duree' => 60, 'personnes' => 3],
            ['nom' => 'Zineb Moustakim', 'jour' => 1, 'heure' => '18:30', 'duree' => 60, 'personnes' => 2],
            ['nom' => 'Akram Maimoune', 'jour' => 1, 'heure' => '21:30', 'duree' => 60, 'personnes' => 4],
            ['nom' => 'Sohaib El Alami', 'jour' => 1, 'heure' => '22:30', 'duree' => 60, 'personnes' => 5],
            ['nom' => 'Youssef Benali', 'jour' => 2, 'heure' => '20:30', 'duree' => 60, 'personnes' => 2],
        ];

        foreach ($reservationsData as $data) {
            $date = Carbon::now()->addDays($data['jour'])->format('Y-m-d');
            $startTime = Carbon::parse($data['heure']);
            $endTime = $startTime->copy()->addMinutes($data['duree']);

            $table = $tables->random();
            $user = $receptionnistes->random();

            // Vérifier conflit sur les slot
            $conflict = Slot::where('restaurent_table_id', $table->id)
                ->whereDate('start_time', $date)
                ->where('start_time', '<', $endTime)
                ->where('end_time', '>', $startTime)
                ->whereNotNull('reservation_id')
                ->exists();

            if ($conflict) {
                $this->command->warn("Conflit pour {$data['nom']} — créneau occupé.");
                continue;
            }

            $reservation = Reservation::create([
                'nom_client' => $data['nom'],
                'date' => $date,
                'start_time' => $startTime->format('H:i'),
                'end_time' => $endTime->format('H:i'),
                'nb_personnes' => $data['personnes'],
                'restaurent_table_id' => $table->id,
                'user_id' => $user->id,
            ]);

            $slot = Slot::create([
                'start_time' => $startTime,
                'end_time' => $endTime,
                'restaurent_table_id' => $table->id,
                'reservation_id' => $reservation->id,
            ]);

            $this->command->info("Réservation créée pour {$data['nom']}.");
        }
    }
}
