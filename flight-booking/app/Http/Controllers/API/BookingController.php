<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Flight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::where('user_id', Auth::id())->get();
        return response()->json($bookings);
    }

    public function show($booking_id)
    {
        $booking = Booking::where('user_id', Auth::id())->findOrFail($booking_id);
        return response()->json($booking);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'flight_id' => 'required|exists:flights,flight_id',
            'status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $flight = Flight::findOrFail($request->flight_id);

        if ($flight->capacity < 1) {
            return response()->json(['message' => 'Not enough seats available.'], 400);
        }

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'flight_id' => $request->flight_id,
            'booking_date' => now(),
            'status' => $request->status,
        ]);

        $flight->decrement('capacity', 1);

        return response()->json($booking, 201);
    }

    public function update(Request $request, $booking_id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $booking = Booking::where('user_id', Auth::id())->findOrFail($booking_id);
        $booking->update([
            'status' => $request->status,
        ]);

        return response()->json($booking, 200);
    }

    public function destroy($booking_id)
    {
        $booking = Booking::where('user_id', Auth::id())->findOrFail($booking_id);

        $flight = $booking->flight;
        $flight->increment('capacity', 1);

        $booking->delete();

        return response()->json(null, 204);
    }

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
}
