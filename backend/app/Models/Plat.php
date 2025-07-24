<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plat extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prix',
        'description',
        'categorie',
        'statut'
    ];

    public function ligneCommandes()
    {
        return $this->hasMany(LigneCommande::class);
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'compose')
                    ->withPivot('quantite')
                    ->withTimestamps();
    }
}
