<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\PlatController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RapportController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\SlotController;


// Utilisateurs
Route::post('/register', [UserController::class, 'register'])->middleware('role:responsable');
Route::get('/users', [UserController::class, 'index'])->middleware('role:responsable');
Route::get('/users/role/{role}', [UserController::class, 'getByRole'])->middleware('role:responsable');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('role:responsable');
Route::put('/users/{id}', [UserController::class, 'update'])->middleware('role:responsable');

// Salles
Route::get('/salles', [SalleController::class, 'index']);
Route::apiResource('salles', SalleController::class)->except(['index'])->middleware('role:responsable');

// Tables
Route::get('/tables', [TableController::class, 'index']);
Route::get('/tables/{id}/slots', [SlotController::class, 'parTable']);
Route::put('/tables/{id}', [TableController::class, 'update'])->middleware('role:serveur,receptionniste,responsable');
Route::apiResource('tables', TableController::class)->except(['index', 'update'])->middleware('role:responsable');
Route::post('/tables/assign', [TableController::class, 'assignTable'])->middleware('role:responsable');
Route::get('/tables/disponibles', [TableController::class, 'tablesDisponibles']);

// Serveurs / Chefs
Route::get('/serveurs', [UserController::class, 'serveursDisponibles'])->middleware('role:responsable');
Route::get('/chefs', [UserController::class, 'chefsDisponibles'])->middleware('role:responsable');

// Plats / Ingrédients
Route::get('/plats', [PlatController::class, 'index']);
Route::apiResource('plats', PlatController::class)->except(['index'])->middleware(['role:responsable,chef']);
Route::apiResource('ingredients', IngredientController::class)->middleware('role:responsable,chef');

// Réservations
Route::get('/reservations/tables-libres', [ReservationController::class, 'tablesLibres']);
Route::get('/reservations/slots-libres', [ReservationController::class, 'slotsLibres']);
Route::apiResource('reservations', ReservationController::class);

// Commandes
Route::get('/commandes/chef', [CommandeController::class, 'commandesChef'])->middleware('role:chef');
Route::get('/commandes/statut', [CommandeController::class, 'commandesParStatut'])->middleware('role:chef');
Route::put('/commandes/statut/{id}', [CommandeController::class, 'updateStatut'])->middleware('role:chef');
Route::apiResource('commandes', CommandeController::class);

// Notifications
Route::get('/notifications', [NotificationController::class, 'index']);
Route::get('/notifications/unread', [NotificationController::class, 'unread']);
Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);

// Rapports
Route::middleware('role:responsable')->group(function () {
    Route::get('/rapports/ventes', [RapportController::class, 'statistiquesVentes']);
    Route::get('/rapports/plats-vendus', [RapportController::class, 'platsVendusParType']);
    Route::get('/rapports/occupation-tables', [RapportController::class, 'tauxOccupationTables']);
    Route::get('/rapports/performance-employes', [RapportController::class, 'performanceEmployes']);
});
