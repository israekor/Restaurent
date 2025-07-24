<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    // Liste tous les utilisateurs
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Liste des utilisateurs par rôle (ex: Serveur, Chef, etc.)
    public function getByRole($role)
    {
        $users = User::where('role', $role)->get();
        return response()->json($users);
    }

    // Supprimer un utilisateur
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }

     // Modifier un utilisateur
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $request->validate([
            'nom' => 'string|nullable',
            'prenom' => 'string|nullable',
            'email' => 'email|nullable|unique:users,email,' . $id,
            'role' => 'in:Serveur,Chef,Receptionniste,Responsable|nullable',
            'actif' => 'boolean|nullable',
        ]);

        $user->update($request->only('nom', 'prenom', 'email', 'role', 'actif'));

        return response()->json(['message' => 'Utilisateur mis à jour', 'user' => $user]);
    }

    // Création utilisateur test (pas recommandé en prod)
    function createUser(Request $request) {
        $user = User::create([
            "nom" => "Khamlichi",
            "prenom" => "Salma",
            "email" => "salma@example.com",
            "password" => bcrypt("salma123"),
            "role" => "responsable"
        ]);
        return $user;
    }
    
    // Inscription (création via API)
    public function register(Request $request)
    {
        if ($request->user()->role !== 'responsable') {
            return response()->json(['message' => 'Accès refusé. Seul un Responsable peut créer des comptes.'], 403);
        }

        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:responsable,serveur,chef,receptionniste'
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Utilisateur créé avec succès', 'user' => $user], 201);
    }

    // Connexion
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => Auth::user(),
        ]);
    }

    // Déconnexion
    public function logout(Request $request)
    {
        Auth::guard('web')->logout(); // 🔐 détruit la session Laravel
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    public function serveursDisponibles()
    {
        return User::where('role', 'Serveur')->get(['id', 'nom', 'prenom', 'email']);
    }

    public function chefsDisponibles()
    {
        return User::where('role', 'Chef')->get(['id', 'nom', 'prenom']);
    }

}
