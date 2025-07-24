<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['nom', 'prenom', 'email', 'password', 'role', 'actif'];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function commandesChef()
    {
        return $this->hasMany(Commande::class, 'chef_id');
    }

    public function commandesServeur()
    {
        return $this->hasMany(Commande::class, 'serveur_id');
    }
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
