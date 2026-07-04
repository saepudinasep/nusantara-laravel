<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Tampilkan halaman edit profile.
     * Field tambahan (phone_number, date_of_birth, gender, address, photo)
     * hanya dikirim kalau user punya relasi teacher/student.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'profileDetail' => match (true) {
                $user->hasRole('teacher') => $user->teacher,
                $user->hasRole('student') => $user->student,
                default => null,
            },
        ]);
    }

    /**
     * Update data profile (name, email) + data role-specific (teacher/student).
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Update data tambahan sesuai role
        if ($user->hasRole('teacher')) {
            $user->teacher()->updateOrCreate(
                ['user_id' => $user->id],
                $request->validate([
                    'phone_number' => ['nullable', 'string', 'max:20'],
                    'date_of_birth' => ['nullable', 'date'],
                    'gender' => ['nullable', 'in:L,P'],
                    'address' => ['nullable', 'string'],
                ])
            );
        } elseif ($user->hasRole('student')) {
            $user->student()->updateOrCreate(
                ['user_id' => $user->id],
                $request->validate([
                    'phone_number' => ['nullable', 'string', 'max:20'],
                    'date_of_birth' => ['nullable', 'date'],
                    'gender' => ['nullable', 'in:L,P'],
                    'address' => ['nullable', 'string'],
                ])
            );
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Hapus akun user (beserta data teacher/student jika ada, via cascade FK).
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
