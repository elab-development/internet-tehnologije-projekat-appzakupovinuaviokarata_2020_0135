<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $primaryKey = 'flight_id';

    protected $fillable = [
        'airline', 'origin', 'destination', 'departure_date', 'arrival_date', 'capacity', 'price',
    ];
}
