<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Reservation;
use App\Models\Slot;
use App\Models\RestaurentTable;
use Carbon\Carbon;

class ReservationController extends Controller
{
    // Liste toutes les réservations
    public function index(Request $request)
    {
        $serveur = $request->user();

        $reservations = Reservation::where('user_id', $serveur->id)
            ->with(['slot.table.salle', 'user'])
            ->orderBy('date', 'desc')
            ->get();
        return response()->json($reservations);
    }

    // Affiche une réservation spécifique
    public function show($id)
    {
        try {
            $reservation = Reservation::with(['slot.table.salle', 'user'])->findOrFail($id);
            return response()->json($reservation->toArray());
        } catch (\Throwable $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'trace' => $e->getTrace()[0] ?? 'no trace'
            ], 500);
        }
    }

    // Crée une nouvelle réservation
    public function store(Request $request)
    {
        try {
            $request->validate([
                'slot_id' => 'required|exists:slots,id',
                'nom_client' => 'required|string|max:255',
                'nb_personnes' => 'required|integer|min:1',
            ]);

            $slot = Slot::with('table')->findOrFail($request->slot_id);

            if ($slot->reservation_id !== null) {
                return response()->json(['message' => 'Ce créneau est déjà réservé'], 409);
            }

            $reservation = Reservation::create([
                'nom_client' => $request->nom_client,
                'nb_personnes' => $request->nb_personnes,
                'date' => Carbon::parse($slot->start_time)->toDateString(),
                'start_time' => Carbon::parse($slot->start_time)->format('H:i'),
                'end_time' => Carbon::parse($slot->end_time)->format('H:i'),
                'restaurent_table_id' => $slot->table->id,
                'user_id' => $request->user()->id,
            ]);

            $slot->reservation_id = $reservation->id;
            $slot->save();

            $reservation = Reservation::with('slot.table.salle')->find($reservation->id);

            return response()->json([
                'message' => 'Réservation enregistrée avec succès.',
                'reservation' => $reservation
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Une erreur est survenue'. $e->getMessage() ], 500);
        }

    }

    // Mise à jour d'une réservation
    public function update(Request $request, $id)
    {
        try {
            $reservation = Reservation::findOrFail($id);

            $request->validate([
                'nom_client' => 'sometimes|string|max:255',
                'date' => 'sometimes|date',
                'start_time' => 'sometimes|date_format:H:i',
                'end_time' => 'sometimes|date_format:H:i|after:start_time',
                'nb_personnes' => 'sometimes|integer|min:1',
                'restaurent_table_id' => 'sometimes|exists:restaurent_tables,id',
            ]);

            // Valeurs actuelles ou mises à jour
            $date = Carbon::parse($request->input('date', $reservation->date));
            $startTime = $request->input('start_time', $reservation->start_time);
            $endTime = $request->input('end_time', $reservation->end_time);
            $tableId = $request->input('restaurent_table_id', $reservation->restaurent_table_id);

            // 🔎 Vérifie s’il y a conflit sur les nouveaux créneaux
            $conflict = Slot::where('table_id', $tableId)
                ->whereTime('start_time', '<', $endTime)
                ->whereTime('end_time', '>', $startTime)
                ->whereDate('created_at', $date->toDateString())
                ->whereNotNull('reservation_id')
                ->where('reservation_id', '!=', $reservation->id) // ignore la réservation actuelle
                ->exists();

            if ($conflict) {
                return response()->json(['message' => 'Conflit détecté sur le nouveau créneau.'], 409);
            }

            // 🔁 Libérer les anciens slot
            Slot::where('reservation_id', $reservation->id)
                ->update(['reservation_id' => null]);

            // 🔗 Attacher les nouveaux slot
            $newSlot = Slot::where('table_id', $tableId)
                ->whereTime('start_time', '<', $endTime)
                ->whereTime('end_time', '>', $startTime)
                ->whereDate('created_at', $date->toDateString())
                ->get();

            foreach ($newSlot as $slot) {
                $slot->reservation_id = $reservation->id;
                $slot->save();
            }

            // 🔄 Mise à jour de la réservation
            $reservation->update([
                'nom_client' => $request->input('nom_client', $reservation->nom_client),
                'date' => $date,
                'start_time' => $startTime,
                'end_time' => $endTime,
                'nb_personnes' => $request->input('nb_personnes', $reservation->nb_personnes),
                'restaurent_table_id' => $tableId,
            ]);

            return response()->json(['message' => 'Réservation mise à jour avec succès.', 'reservation' => $reservation]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur : ' . $e->getMessage()], 500);
        }
    }


    // Supprime une réservation
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);

        // ⛓️ Libérer les créneaux liés
        Slot::where('reservation_id', $reservation->id)
            ->update(['reservation_id' => null]);

        $reservation->delete();

        return response()->json(['message' => 'Réservation supprimée et créneaux libérés']);
    }

    // Retourne les tables libres à une date + heure précises
    public function tablesLibres(Request $request)
    {
        try {
            $datetime = Carbon::createFromFormat('Y-m-d\TH:i', $request->datetime)->startOfMinute();
            $start = $datetime;
            $end = $datetime->copy()->addHour();

            $tablesOccupées = Slot::where('start_time', '<', $end)
                ->where('end_time', '>', $start)
                ->whereNotNull('reservation_id')
                ->pluck('table_id');

            $tablesLibres = RestaurentTable::whereNotIn('id', $tablesOccupées)
                ->with('salle')
                ->get();

            return response()->json($tablesLibres);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }


    public function slotsLibres(Request $request)
    {
        try {
            Log::debug('SlotLibres Request:', $request->all());

            $rawDate = $request->input('date');
            if (!$rawDate) {
                return response()->json(['error' => 'Paramètre "date" manquant'], 400);
            }

            $date = Carbon::createFromFormat('Y-m-d', $rawDate)->toDateString();

            // Récupère les slots non réservés et qui démarrent après la date
            $slots = Slot::whereBetween('start_time', [
                Carbon::parse($date)->startOfDay(),
                Carbon::parse($date)->endOfDay(),
            ])
                ->whereNull('reservation_id')
                ->orderBy('start_time')
                ->with('table.salle') // Inclus table et sa salle
                ->get()
                ->map(function ($slot) {
                    return [
                        'id' => $slot->id,
                        'start_time' => $slot->start_time,
                        'end_time' => $slot->end_time,
                        'table' => [
                            'id' => $slot->table->id,
                            'numero' => $slot->table->numero,
                            'capacite' => $slot->table->capacite,
                            'salle' => [
                                'nom' => optional($slot->table->salle)->nom,
                            ],
                        ],
                    ];
                });

            Log::debug('slotsLibres réponse générée');

            return response()->json($slots);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur: ' . $e->getMessage()], 500);
        }
    }

}
