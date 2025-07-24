<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PlatPretNotification extends Notification
{
    use Queueable;

    protected $commandeId;
    protected $message;

    /**
     * Create a new notification instance.
     */
    public function __construct($commandeId)
    {
        $this->commandeId = $commandeId;
        $this->message = "La commande #{$commandeId} est prête à être servie.";
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['database'];
    }


    /**
     * Get the mail representation of the notification.
     */
    public function toDatabase($notifiable)
    {
        return [
            'commande_id' => $this->commandeId,
            'message' => $this->message,
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
