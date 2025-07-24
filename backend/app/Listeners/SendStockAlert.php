<?php

namespace App\Listeners;

use App\Events\StockAlerte;
use App\Models\User;
use App\Notifications\StockAlerteNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendStockAlert
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(StockAlerte $event)
    {
        $users = User::whereIn('role', ['responsable', 'chef'])->get();

        foreach ($users as $user) {
            $user->notify(new StockAlerteNotification($event->ingredient));
        }
    }
}
