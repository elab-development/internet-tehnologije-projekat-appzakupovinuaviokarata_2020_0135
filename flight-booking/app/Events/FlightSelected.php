<?php

namespace App\Events;

use App\Models\Flight;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class FlightSelected implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $flightId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($flightId)
    {
        $this->flightId = $flightId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('flights.' . $this->flightId);
    }
    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'flight.selected';
    }
    // public function handle(FlightSelected $event)
    // {
    //     $flightId = $event->flightId;
    //     $userCount = Redis::incr('flight_' . $flightId . '_users');

    //     $flight = Flight::find($flightId);

    //     if ($userCount >= $flight->capacity) {
    //         Redis::publish('flight.' . $flightId, json_encode(['status' => 'full']));
    //     }
    // }
    public function handle(FlightSelected $event)
    {
        $flightId = $event->flightId;

        Log::info('Emituje se događaj za flightId: ' . $flightId);
        event(new FlightSelected($flightId));
        

        // Dodaj neki log ovde da proveriš
        Log::info('FlightSelected event emitted for flightId: ' . $flightId);
    }
}
