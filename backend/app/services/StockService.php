<?php

namespace App\Services;

use App\Models\Commande;
use Illuminate\Support\Facades\Log;
use App\Events\StockAlerte;

class StockService
{
    /**
     * Met à jour les stocks des ingrédients après une commande.
     */
    public function miseAJourStock(Commande $commande): void
    {
        foreach ($commande->lignesCommande as $ligne) {
            $plat = $ligne->plat;

            foreach ($plat->ingredients as $ingredient) {

                // Vérification que le pivot contient bien la quantité
                if (!isset($ingredient->pivot->quantite)) {
                    Log::warning("Quantité non définie pour l'ingrédient ID {$ingredient->id} dans le plat ID {$plat->id}");
                    continue; 
                }

                $quantiteUtilisee = $ingredient->pivot->quantite * $ligne->quantite;

                
                if ($ingredient->stock < $quantiteUtilisee) {
                    throw new \Exception("Stock insuffisant pour l'ingrédient {$ingredient->nom}");
                }

                $nouveauStock = $ingredient->stock - $quantiteUtilisee;
                $ingredient->decrement('stock', $quantiteUtilisee);

                if ($nouveauStock <= $ingredient->seuil_alerte) {
                    event(new StockAlerte($ingredient));
                }

            }
        }
    }
}
