<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nom' => "Khamlichi",
            'prenom' => "Salma",
            'email' => "salma@example.com",
            'password' => Hash::make('salma123'),
            'role' => 'responsable',
        ]);

        User::factory()->create([
            'nom' => 'Bajaja',
            'prenom' => 'Yassmine',
            'email' => 'yassmine@example.com',
            'role' => 'serveur',
            'password' => Hash::make('yassmine123'),
        ]);

        User::factory()->create([
            'nom' => 'Filali',
            'prenom' => 'Anas',
            'email' => 'anas@example.com',
            'role' => 'serveur',
            'password' => Hash::make('anas123'),
        ]);

        User::factory()->create([
            'nom' => 'Malki',
            'prenom' => 'kenza',
            'email' => 'kenza@example.com',
            'role' => 'serveur',
            'password' => Hash::make('kenza123'),
        ]);

        User::factory()->create([
            'nom' => 'Korchi',
            'prenom' => 'Alaa',
            'email' => 'alaa@example.com',
            'role' => 'chef',
            'password' => Hash::make('alaa123'),
        ]);

        User::factory()->create([
            'nom' => 'Toulali',
            'prenom' => 'Samira',
            'email' => 'samira@example.com',
            'role' => 'chef',
            'password' => Hash::make('samira123'),
        ]);

        User::factory()->create([
            'nom' => 'Jamali',
            'prenom' => 'Imran',
            'email' => 'imran@example.com',
            'role' => 'chef',
            'password' => Hash::make('imran123'),
        ]);
        
        User::factory()->create([
            'nom' => 'Hakimi',
            'prenom' => 'Karim',
            'email' => 'karim@example.com',
            'role' => 'receptionniste',
            'password' => Hash::make('karim123'),
        ]);    

        User::factory()->create([
            'nom' => 'Boukmakh',
            'prenom' => 'Hamza',
            'email' => 'hamza@example.com',
            'role' => 'receptionniste',
            'password' => Hash::make('hamza123'),
        ]);

        User::factory()->create([
            'nom' => 'Salama',
            'prenom' => 'Fatima',
            'email' => 'fatima@example.com',
            'role' => 'receptionniste',
            'password' => Hash::make('fatima123'),
        ]);
    }
}
