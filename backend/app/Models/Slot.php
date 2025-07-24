<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slot extends Model
{
    use HasFactory;

    protected $fillable = ['start_time', 'end_time', 'restaurent_table_id', 'reservation_id'];

    public function table()
    {
        return $this->belongsTo(RestaurentTable::class, 'restaurent_table_id');
    }

    public function reservation() {
        return $this->belongsTo(Reservation::class);
    }
}
