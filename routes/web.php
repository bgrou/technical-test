<?php

use App\Http\Controllers\ComponentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TurbineController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [DashboardController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::prefix('farms')->group(function () {
        Route::get('/', [FarmController::class, 'index'])->name('farm.index');
        Route::get('/fetch', [FarmController::class, 'fetchIndex'])->name('farm.fetch');
    });

    Route::prefix('farm')->group(function () {
        Route::get('/create', [FarmController::class, 'create'])->name('farm.create');
        Route::get('/{id}', [FarmController::class, 'show'])->name('farm.show');
        Route::get('/edit/{id}', [FarmController::class, 'edit'])->name('farm.edit');
        Route::post('/edit', [FarmController::class, 'update'])->name('farm.update');
        Route::post('/create', [FarmController::class, 'store'])->name('farm.store');
        Route::delete('/delete/{id}', [FarmController::class, 'destroy'])->name('farm.destroy');

    });

    Route::prefix('inspections')->group(function () {
        Route::get('/', [InspectionController::class, 'index'])->name('inspection.index');
        Route::get('/fetch', [InspectionController::class, 'fetchIndex'])->name('inspections.fetch');
    });

    Route::prefix('inspection')->group(function () {
        Route::get('/{id}', [InspectionController::class, 'show'])->name('inspection.show');
        Route::get('/edit/{id}', [InspectionController::class, 'edit'])->name('inspection.edit');
        Route::post('/edit/', [InspectionController::class, 'update'])->name('inspection.update');
        Route::get('/create/{componentId}', [InspectionController::class, 'create'])->name('inspection.create');
        Route::post('/create/', [InspectionController::class, 'store'])->name('inspection.store');
        Route::delete('/delete/{id}', [InspectionController::class, 'destroy'])->name('inspection.destroy');
    });

    Route::prefix('components')->group(function () {
        Route::get('/', [ComponentController::class, 'index'])->name('component.index');
        Route::get('/fetch', [ComponentController::class, 'fetchIndex'])->name('component.fetch');
    });

    Route::prefix('component')->group(function () {
        Route::get('/{id}', [ComponentController::class, 'show'])->name('component.show');
        Route::get('/create/{typeRequired}/{turbineId}', [ComponentController::class, 'create'])->name(
            'component.create'
        );
        Route::post('/create', [ComponentController::class, 'store'])->name('component.store');
        Route::get('/edit/{id}', [ComponentController::class, 'edit'])->name('component.edit');
        Route::post('/edit/', [ComponentController::class, 'update'])->name('component.update');
        Route::delete('/delete/{id}', [ComponentController::class, 'destroy'])->name('component.destroy');
    });

    Route::prefix('turbines')->group(function () {
        Route::get('/', [TurbineController::class, 'index'])->name('turbine.index');
        Route::get('/fetch', [TurbineController::class, 'fetchIndex'])->name('turbines.fetch');
    });

    Route::prefix('turbine')->group(function () {
        Route::get('/create', [TurbineController::class, 'create'])->name('turbine.create');
        Route::post('/create', [TurbineController::class, 'store'])->name('turbine.store');
        Route::get('/{id}', [TurbineController::class, 'show'])->name('turbine.show');
        Route::get('/edit/{id}', [TurbineController::class, 'edit'])->name('turbine.edit');
        Route::post('/edit', [TurbineController::class, 'update'])->name('turbine.update');
        Route::delete('/delete/{id}', [TurbineController::class, 'destroy'])->name('turbine.destroy');
    });

    Route::prefix('manufacturers')->group(function () {
        Route::get('/', [ManufacturerController::class, 'index'])->name('manufacturer.index');
        Route::get('/fetch', [ManufacturerController::class, 'fetchIndex'])->name('manufacturer.fetch');
    });

    Route::prefix('manufacturer')->group(function () {
        Route::get('/create', [ManufacturerController::class, 'create'])->name('manufacturer.create');
        Route::get('/{id}', [ManufacturerController::class, 'show'])->name('manufacturer.show');
        Route::get('/edit/{id}', [ManufacturerController::class, 'edit'])->name('manufacturer.edit');
        Route::post('/edit', [ManufacturerController::class, 'update'])->name('manufacturer.update');
        Route::post('/create', [ManufacturerController::class, 'store'])->name('manufacturer.store');
        Route::delete('/delete/{id}', [ManufacturerController::class, 'destroy'])->name('manufacturer.destroy');
    });
});

require __DIR__ . '/auth.php';
