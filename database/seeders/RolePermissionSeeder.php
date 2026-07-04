<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Daftar permission per role.
     * Mengikuti pola: satu seeder mendefinisikan seluruh role & permission,
     * lalu setiap role diberi permission sesuai kebutuhan modulnya.
     */
    public function run(): void
    {
        // Reset cache permission agar tidak ada data lama yang nyangkut
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            // Admin
            'manage teacher',
            'manage siswa',
            'view dashboard admin',
            'manage schedule',
            'manage class',
            'finalize schedule',
            'view report score',

            // Teacher
            'manage nilai',
            'view dashboard teacher',
            'teaching schedule',

            // Student
            'view nilai sendiri',
            'view dashboard student',
            'class schedule',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions([
            'manage teacher',
            'manage siswa',
            'view dashboard admin',
            'manage schedule',
            'manage class',
            'finalize schedule',
            'view report score',
        ]);

        $teacher = Role::firstOrCreate(['name' => 'teacher']);
        $teacher->syncPermissions([
            'manage nilai',
            'view dashboard teacher',
            'teaching schedule',
        ]);

        $student = Role::firstOrCreate(['name' => 'student']);
        $student->syncPermissions([
            'view nilai sendiri',
            'view dashboard student',
            'class schedule',
        ]);
    }
}
