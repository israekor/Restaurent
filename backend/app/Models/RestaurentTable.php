<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurentTable extends Model
{
    use HasFactory;

    protected $fillable = ['numero', 'capacite', 'user_id', 'salle_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function salle()
    {
        return $this->belongsTo(Salle::class);
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }

    public function slots() {
        return $this->hasMany(Slot::class);
    }

    public function isAvailable($start, $end) {
        return !$this->slots()
            ->where('start_time', '<', $end)
            ->where('end_time', '>', $start)
            ->whereNotNull('reservation_id')
            ->exists();
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
