<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = ['nom_client', 'date', 'start_time', 'end_time', 'nb_personnes', 'restaurent_table_id', 'user_id'];

    public function table()
    {
        return $this->belongsTo(RestaurentTable::class, 'restaurent_table_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function slot()
    {
        return $this->hasOne(Slot::class);
    }

}

