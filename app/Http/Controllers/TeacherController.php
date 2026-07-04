<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->string('search')->trim()->toString();

        $teachers = Teacher::with('user:id,email')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('phone_number', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Teacher/Index', [
            'teachers' => $teachers,
            'filters' => ['search' => $search],
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Teacher/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['nullable', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'unique:users,email'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:L,P'],
            'address' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
        ]);

        // If user_id provided, use existing user. Otherwise create a new User account.
        if (empty($data['user_id'])) {
            // Ensure we have an email; generate one if not provided.
            $email = $data['email'] ?? Str::slug($data['name']) . '.' . time() . '@test.com';
            $password = "password";

            $user = User::create([
                'name' => $data['name'],
                'email' => $email,
                'password' => Hash::make($password),
            ]);

            // Assign teacher role if roles exist
            if (method_exists($user, 'assignRole')) {
                try {
                    $user->assignRole('teacher');
                } catch (\Exception $e) {
                    // ignore if role doesn't exist
                }
            }

            $data['user_id'] = $user->id;
        }

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('teachers', 'public');
        }

        unset($data['email']);

        Teacher::create($data);

        return Redirect::route('admin.teachers.index')->with('status', 'Guru berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        // optional: not used
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        $teacher->load('user:id,email');

        return Inertia::render('Admin/Teacher/Update', [
            'teacher' => $teacher,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $data = $request->validate([
            'user_id' => ['nullable', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'unique:users,email,' . ($teacher->user_id ?? 'NULL') . ',id'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:L,P'],
            'address' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
        ]);

        // Keep the linked user's email in sync if one was provided.
        if (! empty($data['email']) && $teacher->user) {
            $teacher->user->update(['email' => $data['email']]);
        }
        unset($data['email']);

        if ($request->hasFile('photo')) {
            if ($teacher->photo) {
                Storage::disk('public')->delete($teacher->photo);
            }

            $data['photo'] = $request->file('photo')->store('teachers', 'public');
        }

        $teacher->update($data);

        return Redirect::route('admin.teachers.index')->with('status', 'Guru berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        if ($teacher->photo) {
            Storage::disk('public')->delete($teacher->photo);
        }

        DB::transaction(function () use ($teacher) {
            // Simpan referensi user sebelum teacher dihapus, supaya akun
            // login yang dibuat khusus untuk guru ini ikut terhapus juga.
            $user = $teacher->user;

            $teacher->delete();

            $user?->delete();
        });

        return Redirect::route('admin.teachers.index')->with('status', 'Guru berhasil dihapus.');
    }
}
