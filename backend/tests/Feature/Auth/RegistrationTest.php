<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_users_can_register(): void
    {
        $responsable = User::factory()->create(['role' => 'responsable']);

        $response = $this->actingAs($responsable)->postJson('/api/register', [
        'nom' => 'Test',
        'prenom' => 'User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'serveur',
        ]);

        //$this->assertAuthenticated();
        $response->assertStatus(201);
        $response->assertJson(['message' => 'Utilisateur créé avec succès']);
        //$response->assertNoContent();
    }
}
