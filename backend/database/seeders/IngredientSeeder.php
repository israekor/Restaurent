<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ingredient;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ingredients = [
            ['nom' => 'Tomates', 'stock' => 25, 'seuil_alerte' => 10],
            ['nom' => 'Oignons', 'stock' => 15, 'seuil_alerte' => 5],
            ['nom' => 'Pommes de terre', 'stock' => 40, 'seuil_alerte' => 20],
            ['nom' => 'Poulet', 'stock' => 12, 'seuil_alerte' => 5],
            ['nom' => 'Viande hachée', 'stock' => 8, 'seuil_alerte' => 4],
            ['nom' => 'Coriandre', 'stock' => 2, 'seuil_alerte' => 1],
            ['nom' => "Huile d'olive", 'stock' => 18, 'seuil_alerte' => 5],
            ['nom' => 'Farine', 'stock' => 30, 'seuil_alerte' => 10],
            ['nom' => 'Riz', 'stock' => 50, 'seuil_alerte' => 20],
            ['nom' => 'Épices marocaines', 'stock' => 5, 'seuil_alerte' => 2],
            ['nom' => 'Oranges', 'stock' => 40, 'seuil_alerte' => 10],    
            ['nom' => 'Menthe', 'stock' => 30, 'seuil_alerte' => 8],      
            ['nom' => 'Sucre', 'stock' => 50, 'seuil_alerte' => 10],  
        ];

        foreach ($ingredients as $data) {
            Ingredient::create($data);
        }
    }
}
