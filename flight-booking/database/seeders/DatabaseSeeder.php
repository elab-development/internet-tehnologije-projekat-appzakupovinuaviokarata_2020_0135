<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Flight;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Flight::create([
            'flight_id' => '1234',
            'airline' => 'ryanair',
            'origin' => 'da',
            'destination' => 'to',
            'departure_date' => '2023-07-10',
            'arrival_date' => '2023-07-11',
            'capacity' => '90',
            'price' => '123.2'
        ]);
        User::create([
            'user_id' => 1,
            'username' => 'vpetrovic',
            'password' => 'petrovicv',
            'email' => 'vladimir@gmail.com',
            'role' => 'admin1',
        ]);
    }
}
