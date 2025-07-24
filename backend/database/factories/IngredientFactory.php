<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commande>
 */
class IngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\Ingredient::class;

    public function definition(): array
    {
        return [
            'nom' => $this->faker->word(),
            'stock' => $this->faker->numberBetween(50, 200),
            'seuil_alerte' => $this->faker->numberBetween(5, 20),
        ];
    }
}
