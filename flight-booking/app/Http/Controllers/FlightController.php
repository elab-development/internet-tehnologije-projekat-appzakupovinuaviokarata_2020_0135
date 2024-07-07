<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Flight;

class FlightController extends Controller
{
    public function index(Request $request)
    {
        try {
            $flights = Flight::all();
            return response()->json($flights);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function search(Request $request)
    {
        try {
            $origin = $request->input('origin');
            $destination = $request->input('destination');
            $departure_date = $request->input('departure_date');
            $arrival_date = $request->input('arrival_date');

            // Validacija parametara
            if (!$origin || !$destination || !$departure_date) {
                return response()->json(['error' => 'Missing required parameters'], 400);
            }

            $flights = Flight::where('origin', $origin)
                ->where('destination', $destination)
                ->whereDate('departure_date', $departure_date);

            if ($arrival_date) {
                $flights = $flights->whereDate('arrival_date', $arrival_date);
            }

            $flights = $flights->get();

            return response()->json($flights);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function flightsByAirline($airline)
    {
        try {
            $flights = Flight::where('airline', $airline)->get();
            return response()->json($flights);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
