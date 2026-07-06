<?php

namespace App\Http\Controllers;

use App\Models\DetailClass;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->string('search')->trim()->toString();
        $classId = $request->string('class_id')->trim()->toString();

        $students = Student::with(['user:id,email', 'detailClasses.schoolClass'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('phone_number', 'like', "%{$search}%");
                });
            })
            ->when($classId, function ($query) use ($classId) {
                $query->whereHas('detailClasses', function ($q) use ($classId) {
                    $q->where('class_id', $classId);
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Student/Index', [
            'students' => $students,
            'classList' => SchoolClass::orderBy('grade')->orderBy('name')->get(['id', 'name', 'grade']),
            'filters' => ['search' => $search, 'class_id' => $classId],
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Student/Create', [
            'classList' => SchoolClass::orderBy('grade')->orderBy('name')->get(['id', 'name', 'grade']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'unique:users,email'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:L,P'],
            'address' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'class_id' => ['nullable', 'exists:school_classes,id'],
        ]);

        $classId = $data['class_id'] ?? null;
        unset($data['class_id']);

        DB::transaction(function () use ($data, $request, $classId) {
            // Buatkan akun login untuk siswa.
            $email = $data['email'] ?? Str::slug($data['name']) . '.' . time() . '@test.com';
            $password = "password";

            $user = User::create([
                'name' => $data['name'],
                'email' => $email,
                'password' => Hash::make($password),
            ]);

            if (method_exists($user, 'assignRole')) {
                try {
                    $user->assignRole('student');
                } catch (\Exception $e) {
                    // ignore if role doesn't exist
                }
            }

            $data['user_id'] = $user->id;

            if ($request->hasFile('photo')) {
                $data['photo'] = $request->file('photo')->store('students', 'public');
            }

            unset($data['email']);

            $student = Student::create($data);

            if ($classId) {
                DetailClass::create([
                    'class_id' => $classId,
                    'student_id' => $student->id,
                ]);
            }
        });

        return Redirect::route('admin.students.index')->with('status', 'Siswa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        // optional: not used
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $student->load(['user:id,email', 'detailClasses.schoolClass']);

        return Inertia::render('Admin/Student/Update', [
            'student' => $student,
            'currentClassId' => $student->detailClasses->first()?->class_id,
            'classList' => SchoolClass::orderBy('grade')->orderBy('name')->get(['id', 'name', 'grade']),
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'unique:users,email,' . ($student->user_id ?? 'NULL') . ',id'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'date_of_birth' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:L,P'],
            'address' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'class_id' => ['nullable', 'exists:school_classes,id'],
        ]);

        $classId = $data['class_id'] ?? null;
        unset($data['class_id']);

        // Sinkronkan email ke akun user terkait jika diisi.
        if (! empty($data['email']) && $student->user) {
            $student->user->update(['email' => $data['email']]);
        }
        unset($data['email']);

        if ($request->hasFile('photo')) {
            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }

            $data['photo'] = $request->file('photo')->store('students', 'public');
        }

        DB::transaction(function () use ($student, $data, $classId) {
            $student->update($data);

            // Satu siswa hanya berada di satu kelas aktif; ganti
            // penempatan lama dengan yang baru dipilih.
            if ($classId) {
                DetailClass::updateOrCreate(
                    ['student_id' => $student->id],
                    ['class_id' => $classId],
                );
            } else {
                $student->detailClasses()->delete();
            }
        });

        return Redirect::route('admin.students.index')->with('status', 'Siswa berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }

        DB::transaction(function () use ($student) {
            // Simpan referensi user sebelum student dihapus, supaya akun
            // login yang dibuat khusus untuk siswa ini ikut terhapus juga.
            // detail_classes ikut terhapus otomatis lewat cascadeOnDelete.
            $user = $student->user;

            $student->delete();

            $user?->delete();
        });

        return Redirect::route('admin.students.index')->with('status', 'Siswa berhasil dihapus.');
    }
}
