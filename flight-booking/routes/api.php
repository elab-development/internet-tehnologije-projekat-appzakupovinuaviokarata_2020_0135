<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UserController;
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

Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user_id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user_id}', [UserController::class, 'update']);
    Route::delete('/users/{user_id}', [UserController::class, 'destroy']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user/profile', [AuthController::class, 'userProfile'])->middleware('auth:sanctum');
