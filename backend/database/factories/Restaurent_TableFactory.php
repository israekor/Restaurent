<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restaurent_Table>
 */
class Restaurent_TableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\Restaurent_Table::class;

    public function definition(): array
    {
        return [
            'numero' => $this->faker->unique()->numberBetween(1, 100),
            'capacite' => $this->faker->numberBetween(2, 10),
            'user_id' => null,
            'salle_id' => null,
        ];
    }
}
