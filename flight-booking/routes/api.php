<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\AirportController;
use App\Http\Controllers\BookingController;

Route::apiResource('users', UserController::class);
Route::apiResource('admins', AdminController::class);
Route::apiResource('flights', FlightController::class);
Route::apiResource('airports', AirportController::class);
Route::apiResource('bookings', BookingController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/flights', [FlightController::class, 'search']);
Route::get('/flights/airline/{airline}', [FlightController::class, 'flightsByAirline']);
