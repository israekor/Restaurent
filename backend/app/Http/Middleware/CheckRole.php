<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
   /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        Log::info('Middleware role déclenché', [
            'user_id' => optional($user)->id,
            'role_attendu' => $roles,
            'role_reçu' => optional($user)->role,
        ]);

        if (!$user || !in_array($user->role, $roles)) {
            return response()->json(['message' => 'Accès refusé : rôle insuffisant'], 403);
        }

        return $next($request);
    }
}
