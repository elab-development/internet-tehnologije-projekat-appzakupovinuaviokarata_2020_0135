<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Airport;
use Illuminate\Http\Request;

class AirportController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }
    public function index()
    {

        $airports = Airport::all();
        return response()->json($airports);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $airport = Airport::create($validatedData);
        return response()->json($airport, 201);
    }

    public function show($id)
    {
        $airport = Airport::findOrFail($id);
        return response()->json($airport);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'city' => 'string|max:255',
            'country' => 'string|max:255',
        ]);

        $airport = Airport::findOrFail($id);
        $airport->update($validatedData);

        return response()->json($airport);
    }

    public function destroy($id)
    {
        $airport = Airport::findOrFail($id);
        $airport->delete();

        return response()->json(null, 204);
    }
    

}
