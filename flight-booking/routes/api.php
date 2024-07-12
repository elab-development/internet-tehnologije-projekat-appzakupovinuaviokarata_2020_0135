<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\FlightController;
use App\Http\Controllers\AirportController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookingController;


Route::apiResource('users', UserController::class);
Route::apiResource('admins', AdminController::class);
Route::apiResource('flights', FlightController::class);
Route::apiResource('airports', AirportController::class);
Route::apiResource('bookings', BookingController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/flights', [FlightController::class, 'index']);
    Route::get('/flights/{flight_id}', [FlightController::class, 'show']);
    Route::post('/flights', [FlightController::class, 'store']);
    Route::put('/flights/{flight_id}', [FlightController::class, 'update']);
    Route::delete('/flights/{flight_id}', [FlightController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{booking_id}', [BookingController::class, 'show']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::put('/bookings/{booking_id}', [BookingController::class, 'update']);
    Route::delete('/bookings/{booking_id}', [BookingController::class, 'destroy']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'userProfile']);
