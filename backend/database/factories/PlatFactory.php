<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commande>
 */
class PlatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\Plat::class;

    public function definition(): array
    {
        $categories = ['entrée', 'plat', 'dessert', 'boisson'];
        $statuts = ['disponible', 'indisponible'];

        return [
            'nom' => $this->faker->word(),
            'prix' => $this->faker->randomFloat(2, 5, 50),
            'description' => $this->faker->sentence(),
            'categorie' => $this->faker->randomElement($categories),
            'statut' => $this->faker->randomElement($statuts),
        ];
    }
}
