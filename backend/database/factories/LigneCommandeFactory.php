<?php

namespace Database\Factories;
use App\Models\Commande;
use App\Models\Plat;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LigneCommande>
 */
class LigneCommandeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\LigneCommande::class;

    public function definition(): array
    {
        return [
            'commande_id' => Commande::factory(),
            'plat_id' => Plat::factory(),
            'quantite' => $this->faker->numberBetween(1, 5),
        ];
    }
}
