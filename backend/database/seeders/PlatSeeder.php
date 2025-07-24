<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plat;
use App\Models\Ingredient;

class PlatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $plats = [
            [
                'nom' => 'Tajine de poulet',
                'prix' => 90,
                'description' => 'Poulet aux olives et citron confit',
                'categorie' => 'plat',
                'statut' => 'disponible',
                'ingredients' => [
                    'Poulet' => 1,
                    'Oignons' => 1,
                    'Épices marocaines' => 1,
                    "Huile d'olive" => 1,
                ],
            ],
            [
                'nom' => 'Couscous royal',
                'prix' => 110,
                'description' => 'Semoule avec légumes, viandes, pois chiches',
                'categorie' => 'plat',
                'statut' => 'disponible',
                'ingredients' => [
                    'Viande hachée' => 1,
                    'Oignons' => 1,
                    'Pommes de terre' => 2,
                    'Épices marocaines' => 1,
                ],
            ],
            [
                'nom' => 'Pastilla',
                'prix' => 95,
                'description' => 'Feuilleté sucré-salé au poulet et amandes',
                'categorie' => 'entrée',
                'statut' => 'disponible',
                'ingredients' => [
                    'Poulet' => 1,
                    'Oignons' => 1,
                    'Farine' => 1,
                ],
            ],
            [
                'nom' => 'Harira',
                'prix' => 40,
                'description' => 'Soupe traditionnelle marocaine',
                'categorie' => 'entrée',
                'statut' => 'disponible',
                'ingredients' => [
                    'Tomates' => 1,
                    'Coriandre' => 1,
                    'Viande hachée' => 1,
                    'Épices marocaines' => 1,
                ],
            ],
            [
                'nom' => 'Jus d’orange frais',
                'prix' => 20,
                'description' => 'Pressé à la demande',
                'categorie' => 'boisson',
                'statut' => 'disponible',
                'ingredients' => [
                    'Oranges' => 5,
                    'Sucre' => 1,
                ],
            ],
            [
                'nom' => 'Thé à la menthe',
                'prix' => 15,
                'description' => 'Servi dans un verre marocain',
                'categorie' => 'boisson',
                'statut' => 'disponible',
                'ingredients' => [
                    'Menthe' => 1,
                    'Sucre' => 1,
                ],
            ],
        ];

        foreach ($plats as $data) {
            $ingredientsData = $data['ingredients'];
            unset($data['ingredients']);

            $plat = Plat::create($data);

            foreach ($ingredientsData as $nomIngredient => $quantite) {
                $ingredient = Ingredient::where('nom', $nomIngredient)->first();
                if ($ingredient) {
                    $plat->ingredients()->attach($ingredient->id, ['quantite' => $quantite]);
                }
            }
        }
    }
}
