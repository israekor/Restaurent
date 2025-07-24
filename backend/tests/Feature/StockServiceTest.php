<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Plat;
use App\Models\Ingredient;
use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Salle;
use App\Models\Restaurent_Table;
use App\Models\User;
use App\Services\StockService;

class StockServiceTest extends TestCase
{
    use RefreshDatabase;

     public function test_mise_a_jour_stock_reduit_correctement_les_ingredients()
    {
        // Création d'un ingrédient avec stock initial
        $ingredient = Ingredient::factory()->create([
            'stock' => 100,
            'seuil_alerte' => 10,
        ]);

        // Création d'un plat
        $plat = Plat::factory()->create();

        // Association plat - ingrédient avec quantité utilisée
        $plat->ingredients()->attach($ingredient->id, ['quantite' => 5]);

        // Création de la salle
        $salle = Salle::factory()->create();

        // Création de la table liée à la salle
        $table = Restaurent_Table::factory()->create([
            'salle_id' => $salle->id,
        ]);

        // Création des utilisateurs Serveur et Chef
        $serveur = User::factory()->create(['role' => 'serveur']);
        $chef = User::factory()->create(['role' => 'chef']);

        // Simuler un responsable connecté pour créer un utilisateur via API
        $responsable = User::factory()->create(['role' => 'responsable']);

        $response = $this->actingAs($responsable)->postJson('/api/register', [
            'nom' => 'Test',
            'prenom' => 'User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'serveur',
        ]);

        $response->assertStatus(201);
        $response->assertJson(['message' => 'Utilisateur créé avec succès']);

        // Création de la commande avec références valides
        $commande = Commande::factory()->create([
            'restaurent_table_id' => $table->id,
            'serveur_id' => $serveur->id,
            'chef_id' => $chef->id,
        ]);

        // Création d'une ligne de commande
        $ligneCommande = LigneCommande::create([
            'commande_id' => $commande->id,
            'plat_id' => $plat->id,
            'quantite' => 2,
        ]);

        // Charger les relations nécessaires
        $commande->load('lignesCommande.plat.ingredients');

        // Appeler le service
        $stockService = new StockService();
        $stockService->miseAJourStock($commande);

        // Actualiser l'ingrédient
        $ingredient->refresh();

        // Vérifier que le stock a bien été décrémenté : 100 - (5 * 2) = 90
        $this->assertEquals(90, $ingredient->stock);
    }
}
