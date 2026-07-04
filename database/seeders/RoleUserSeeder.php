<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleUserSeeder extends Seeder
{
    /**
     * Membuat 1 user default per role.
     * Pola email: {role}@test.com, password: "password"
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@test.com'],
            [
                'name' => 'Admin Sekolah',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->syncRoles(['admin']);

        $teacherUser = User::firstOrCreate(
            ['email' => 'teacher@test.com'],
            [
                'name' => 'Budi Guru',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $teacherUser->syncRoles(['teacher']);

        Teacher::firstOrCreate(
            ['user_id' => $teacherUser->id],
            [
                'name' => $teacherUser->name,
                'phone_number' => '081200000001',
                'gender' => 'L',
            ]
        );

        $studentUser = User::firstOrCreate(
            ['email' => 'student@test.com'],
            [
                'name' => 'Siti Siswa',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $studentUser->syncRoles(['student']);

        Student::firstOrCreate(
            ['user_id' => $studentUser->id],
            [
                'name' => $studentUser->name,
                'gender' => 'P',
            ]
        );
    }
}
