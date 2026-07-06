<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SchoolClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->string('search')->trim()->toString();

        $classes = SchoolClass::withCount('detailClasses as students_count')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('grade', 'like', "%{$search}%");
                });
            })
            ->orderBy('grade')
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/SchoolClass/Index', [
            'classes' => $classes,
            'filters' => ['search' => $search],
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/SchoolClass/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:school_classes,name'],
            'grade' => ['required', 'in:X,XI,XII'],
        ]);

        SchoolClass::create($data);

        return Redirect::route('admin.classes.index')->with('status', 'Kelas berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SchoolClass $class)
    {
        // optional: not used
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SchoolClass $class)
    {
        return Inertia::render('Admin/SchoolClass/Update', [
            'schoolClass' => $class,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SchoolClass $class)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:school_classes,name,' . $class->id],
            'grade' => ['required', 'in:X,XI,XII'],
        ]);

        $class->update($data);

        return Redirect::route('admin.classes.index')->with('status', 'Kelas berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolClass $class)
    {
        // Siswa & jadwal yang terhubung ikut terhapus otomatis lewat
        // cascadeOnDelete di migration detail_classes & header_schedules.
        $class->delete();

        return Redirect::route('admin.classes.index')->with('status', 'Kelas berhasil dihapus.');
    }
}
