<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Teacher/Index', [
            'teachers' => $teachers,
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
        ]);

        // If user_id provided, use existing user. Otherwise create a new User account.
        if (empty($data['user_id'])) {
            // Ensure we have an email; generate one if not provided.
            $email = $data['email'] ?? Str::slug($data['name']) . '.' . time() . '@example.com';
            $password = Str::random(12);

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
            'phone_number' => ['nullable', 'string', 'max:20'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:L,P'],
            'address' => ['nullable', 'string'],
        ]);

        $teacher->update($data);

        return Redirect::route('admin.teachers.index')->with('status', 'Guru berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return Redirect::route('admin.teachers.index')->with('status', 'Guru berhasil dihapus.');
    }
}
