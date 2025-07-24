<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slot;
use App\Models\RestaurentTable;

class SlotController extends Controller
{
    public function parTable($id)
    {
        try {
            $table = RestaurentTable::findOrFail($id);

            $slot = Slot::where('restaurent_table_id', $table->id)
                ->orderBy('start_time')
                ->get()
                ->map(function ($slot) {
                    return [
                        'start_time' => $slot->start_time,
                        'end_time' => $slot->end_time,
                        'reserved' => $slot->reservation_id !== null,
                    ];
                });

            return response()->json([
                'table_id' => $table->id,
                'table_numero' => $table->numero,
                'slot' => $slot,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur : ' . $e->getMessage()], 500);
        }
    }
            
}
