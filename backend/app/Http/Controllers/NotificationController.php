<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    // Liste toutes les notifications de l'utilisateur connecté
    public function index(Request $request)
    {
        return response()->json($request->user()->notifications);
    }

    // Liste uniquement les notifications non lues
    public function unread(Request $request)
    {
        return response()->json($request->user()->unreadNotifications);
    }

    // Marquer une notification comme lue
    public function markAsRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        return response()->json(['message' => 'Notification marquée comme lue']);
    }

    // Marquer toutes les notifications comme lues
    public function markAllAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return response()->json(['message' => 'Toutes les notifications ont été marquées comme lues']);
    }

    // Supprimer une notification
    public function destroy(Request $request, $id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification supprimée']);
    }
}
