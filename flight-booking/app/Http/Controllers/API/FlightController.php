<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Flight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FlightController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
        $this->middleware('is_admin')->only(['store', 'update', 'destroy']);
    }
    public function index()
    {
        $flights = Flight::all()->map(function ($flight) {
            return [
                'flight_id' => $flight->flight_id,
                'airline' => $flight->airline,
                'origin' => $flight->origin,
                'destination' => $flight->destination,
                'departure_date' => \Carbon\Carbon::parse($flight->departure_date)->format('Y-m-d H:i'),
                'arrival_date' => \Carbon\Carbon::parse($flight->arrival_date)->format('Y-m-d H:i'),
                'capacity' => $flight->capacity,
                'price' => $flight->price,
            ];
        });

        return response()->json($flights);
    }

    public function show($flight_id)
    {
        $flight = Flight::findOrFail($flight_id);
        return response()->json($flight);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'airline' => 'required|string|max:255',
            'origin' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'departure_date' => 'required|date',
            'arrival_date' => 'required|date|after_or_equal:departure_date',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $flight = Flight::create([
            'airline' => $request->airline,
            'origin' => $request->origin,
            'destination' => $request->destination,
            'departure_date' => $request->departure_date,
            'arrival_date' => $request->arrival_date,
            'capacity' => $request->capacity,
            'price' => $request->price,
        ]);

        return response()->json($flight, 201);
    }

    public function update(Request $request, $flight_id)
    {
        $validator = Validator::make($request->all(), [
            'airline' => 'required|string|max:255',
            'origin' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'departure_date' => 'required|date',
            'arrival_date' => 'required|date|after_or_equal:departure_date',
            'capacity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $flight = Flight::findOrFail($flight_id);

        $flight->update([
            'airline' => $request->airline,
            'origin' => $request->origin,
            'destination' => $request->destination,
            'departure_date' => $request->departure_date,
            'arrival_date' => $request->arrival_date,
            'capacity' => $request->capacity,
            'price' => $request->price,
        ]);

        return response()->json($flight, 200);
    }

    public function destroy($flight_id)
    {
        $flight = Flight::findOrFail($flight_id);
        $flight->delete();

        return response()->json(['message' => 'Flight deleted successfully'], 200);
    }

    public function checkFlight($id)
    {
        $exists = Flight::where('flight_id', $id)->exists();

        return response()->json(['exists' => $exists]);
    }
}
