<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Gérer l'exception d'authentification pour les requêtes API.
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Accès non autorisé, authentification requise.'
            ], 401);
        }

        return redirect()->guest(route('login'));
    }
    
    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
            if ($exception instanceof ModelNotFoundException) {
        Log::warning('ModelNotFound déclenchée', [
            'url' => $request->url(),
            'message' => $exception->getMessage(),
        ]);
        return response()->json(['message' => 'Donnée introuvable'], 404);
    }
}
}