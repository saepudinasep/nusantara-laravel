<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@test.com'],
            ['name' => 'Admin', 'password' => bcrypt('password')]
        );
        $admin->assignRole('admin');

        $staff = User::firstOrCreate(
            ['email' => 'staff@test.com'],
            ['name' => 'Staff', 'password' => bcrypt('password')]
        );
        $staff->assignRole('staff');

        $user = User::firstOrCreate(
            ['email' => 'user@test.com'],
            ['name' => 'User', 'password' => bcrypt('password')]
        );
        $user->assignRole('user');
    }
}
