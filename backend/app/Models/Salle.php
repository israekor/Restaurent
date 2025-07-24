<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RestaurentTable;

class Salle extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'etage', 'capacite'];

    public function restaurent_tables()
    {
        return $this->hasMany(RestaurentTable::class);
    }
}

