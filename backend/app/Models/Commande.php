<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'statut', 'serveur_id', 'chef_id', 'restaurent_table_id'];

    public function serveur()
    {
        return $this->belongsTo(User::class, 'serveur_id');
    }

    public function chef()
    {
        return $this->belongsTo(User::class, 'chef_id');
    }

    public function table()
    {
        return $this->belongsTo(RestaurentTable::class, 'restaurent_table_id');
    }

    public function lignesCommande()
    {
        return $this->hasMany(LigneCommande::class);
    }
}
