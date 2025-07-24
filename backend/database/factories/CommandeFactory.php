<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Restaurent_Table;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commande>
 */
class CommandeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\Commande::class;

    public function definition(): array
    {
        return [
            'date' => now(),
            'statut' => 'en attente',
            'serveur_id' => User::factory()->role('serveur'),
            'chef_id' => User::factory()->role('chef'),
            'restaurent_table_id' => Restaurent_Table::factory(),
        ];
    }
}
