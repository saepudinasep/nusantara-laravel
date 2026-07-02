<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Permissions
        $permissions = [
            'manage users',
            'view dashboard admin',
            'manage staff data',
            'view dashboard staff',
            'view own data',
            'view dashboard user',
        ];
        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // Roles + assign permission
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->givePermissionTo(['manage users', 'view dashboard admin']);

        $staff = Role::firstOrCreate(['name' => 'staff']);
        $staff->givePermissionTo(['manage staff data', 'view dashboard staff']);

        $user = Role::firstOrCreate(['name' => 'user']);
        $user->givePermissionTo(['view own data', 'view dashboard user']);
    }
}
