<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Salle>
 */
class SalleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\Salle::class;

    public function definition(): array
    {
        return [
            'nom' => $this->faker->word(),
            'etage' => $this->faker->numberBetween(0, 5),
            'capacite' => $this->faker->numberBetween(10, 100),
        ];
    }
}
