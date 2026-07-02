<?php

use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Redirect generik: lempar ke dashboard sesuai role user yang login
Route::get('/dashboard', function () {
    /** @var User|null $user */
    $user = Auth::user();

    if (! $user) {
        abort(401, 'Silakan login terlebih dahulu.');
    }

    return match (true) {
        $user->hasRole('admin') => redirect()->route('admin.dashboard'),
        $user->hasRole('staff') => redirect()->route('staff.dashboard'),
        $user->hasRole('user') => redirect()->route('user.dashboard'),
        default => abort(403, 'Akun Anda belum memiliki role. Hubungi administrator.'),
    };
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:staff'])->prefix('staff')->name('staff.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Staff/Dashboard'))->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:user'])->prefix('user')->name('user.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('User/Dashboard'))->name('dashboard');
});

require __DIR__ . '/auth.php';
