<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\EnfermedadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [LoginController::class, 'login']);
Route::get('pacientes', [PacienteController::class, 'list']);
Route::get('paciente', [PacienteController::class, 'get']);
Route::post('paciente/crear', [PacienteController::class, 'create']);
Route::post('paciente/borrar', [PacienteController::class, 'delete']);

Route::get('enfermedades', [EnfermedadController::class, 'list']);
Route::get('enfermedad', [EnfermedadController::class, 'get']);
Route::post('enfermedad/crear', [EnfermedadController::class, 'create']);
Route::post('enfermedad/borrar', [EnfermedadController::class, 'delete']);