<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\AirportController;
use App\Http\Controllers\API\FlightController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BookingController;


Route::apiResource('users', UserController::class);
Route::apiResource('admins', AdminController::class);
Route::apiResource('flights', FlightController::class);
Route::apiResource('airports', AirportController::class);
Route::apiResource('bookings', BookingController::class);


Route::get('/flights', [FlightController::class, 'index']);
Route::get('/flights/{flight_id}', [FlightController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
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

Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user_id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user_id}', [UserController::class, 'update']);
    Route::delete('/users/{user_id}', [UserController::class, 'destroy']);
});

Route::get('/airports', [AirportController::class, 'index']); // Ova ruta treba da bude javna
Route::get('/airports/{airport_id}', [AirportController::class, 'show']);
Route::middleware(['auth:sanctum'])->group(function () {
    // Route::get('/airports', [AirportController::class, 'index']);
    // Route::get('/airports/{airport_id}', [AirportController::class, 'show']);
    Route::post('/airports', [AirportController::class, 'store']);
    Route::put('/airports/{airport_id}', [AirportController::class, 'update']);
    Route::delete('/airports/{airport_id}', [AirportController::class, 'destroy']);
});
Route::get('/users', [UserController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user/profile', [AuthController::class, 'userProfile'])->middleware('auth:sanctum');

Route::options('{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');
