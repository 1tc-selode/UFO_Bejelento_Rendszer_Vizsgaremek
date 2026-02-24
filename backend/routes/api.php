<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\AdminController;

// Authentikáció
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Bejelentések
Route::get('/reports', [ReportController::class, 'index']);
Route::get('/reports/{id}', [ReportController::class, 'show']);
Route::post('/reports', [ReportController::class, 'store'])->middleware('auth:sanctum');
Route::put('/reports/{id}', [ReportController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/reports/{id}', [ReportController::class, 'destroy'])->middleware('auth:sanctum');

// Térkép
Route::get('/map/reports', [ReportController::class, 'mapReports']);

// Képek
Route::post('/reports/{id}/images', [ImageController::class, 'store'])->middleware('auth:sanctum');
Route::get('/reports/{id}/images', [ImageController::class, 'index']);
Route::delete('/images/{id}', [ImageController::class, 'destroy'])->middleware('auth:sanctum');

// Kategóriák
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store'])->middleware(['auth:sanctum', 'isadmin']);
Route::put('/categories/{id}', [CategoryController::class, 'update'])->middleware(['auth:sanctum', 'isadmin']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->middleware(['auth:sanctum', 'isadmin']);

// Értékelések
Route::post('/reports/{id}/vote', [VoteController::class, 'vote'])->middleware('auth:sanctum');
Route::get('/reports/{id}/credibility', [VoteController::class, 'credibility']);

// Felhasználók
Route::get('/profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');
Route::put('/profile', [AuthController::class, 'updateProfile'])->middleware('auth:sanctum');
Route::get('/users/{id}/reports', [ReportController::class, 'userReports']);

// Admin végpontok (csak admin)
Route::middleware(['auth:sanctum', 'isadmin'])->prefix('admin')->group(function () {
    Route::get('/reports', [AdminController::class, 'getReports']);
    Route::delete('/reports/{id}', [AdminController::class, 'deleteReport']);
    Route::put('/reports/{id}/approve', [AdminController::class, 'approveReport']);
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::put('/users/{id}/ban', [AdminController::class, 'banUser']);
    Route::get('/statistics', [AdminController::class, 'getStatistics']);
});

// Statisztikák
Route::get('/statistics', [AdminController::class, 'getStatistics']);

// További API route-ok ide jöhetnek...
