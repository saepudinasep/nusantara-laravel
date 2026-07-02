# Setup Laravel — Boilerplate Role-Based (Admin / Staff / User)

Boilerplate **Laravel 12 + Inertia.js + React (TypeScript) + Tailwind CSS** dengan sistem
multi-role siap pakai (role & permission, dashboard terpisah per role, sidebar bertema warna
per role). Dokumen ini juga berfungsi sebagai **blueprint** — cukup ganti nama role di beberapa
titik untuk dipakai ulang di project lain (mis. Admin/Guru/Siswa, Admin/Kasir/Pelanggan, dll),
tanpa perlu menjelaskan ulang arsitekturnya dari nol ke AI assistant.

---

## Tech Stack

| Layer             | Teknologi                    |
| ----------------- | ---------------------------- |
| Backend           | Laravel 12 (PHP ^8.2)        |
| Auth scaffolding  | Laravel Breeze               |
| Bridge            | Inertia.js v2                |
| Frontend          | React 18 + TypeScript        |
| Styling           | Tailwind CSS 3               |
| Build tool        | Vite                         |
| Role & permission | spatie/laravel-permission ^6 |
| Route helper JS   | Ziggy                        |
| Icon              | lucide-react                 |
| Testing           | Pest                         |

---

## Struktur Proyek yang Relevan

```
app/
  Models/User.php                          # pakai trait HasRoles (spatie)
database/
  migrations/..._create_permission_tables.php
  seeders/
    RolePermissionSeeder.php               # definisi role + permission
    RoleUserSeeder.php                     # user default per role (untuk testing)
    DatabaseSeeder.php                     # memanggil 2 seeder di atas
routes/
  web.php                                  # redirect dashboard sesuai role + route group per role
resources/js/
  Layouts/
    SidebarLayout.tsx                      # sidebar reusable, tema warna per role
    AuthenticatedLayout.tsx                # layout bawaan Breeze (navbar + hamburger, tidak dipakai dashboard role)
  Pages/
    Admin/Dashboard.tsx
    Staff/Dashboard.tsx
    User/Dashboard.tsx
  Components/                              # komponen bawaan Breeze (Dropdown, TextInput, dll)
bootstrap/app.php                          # alias middleware 'role' & 'permission'
```

---

## Cara Kerja Sistem Role

1. **Role & permission** didefinisikan di `database/seeders/RolePermissionSeeder.php`.
2. **User default** per role dibuat di `database/seeders/RoleUserSeeder.php` (email `{role}@test.com`, password `password`) — untuk kebutuhan testing/demo.
3. **Routing**: setiap role punya route group sendiri dengan prefix, name, dan middleware `role:{nama_role}`:
    ```php
    Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('dashboard');
    });
    ```
4. **Redirect generik** `/dashboard` melempar user ke dashboard sesuai role-nya (lihat `match(true)` di `routes/web.php`).
5. **Halaman dashboard** tiap role ada di `resources/js/Pages/{Role}/Dashboard.tsx`, memakai `SidebarLayout` dengan prop `role`.
6. **SidebarLayout** (`resources/js/Layouts/SidebarLayout.tsx`) punya `ROLE_THEME` — mapping warna aksen (violet/teal/blue) per role — dan menerima `menus[]` sebagai daftar item navigasi.

---

## Instalasi

```bash
composer install
cp .env.example .env
php artisan key:generate
# atur koneksi database di .env, lalu:
php artisan migrate --seed
npm install
npm run dev   # atau: composer run dev (jalankan server + queue + vite sekaligus)
```

Login default hasil seeding:

| Role  | Email          | Password |
| ----- | -------------- | -------- |
| admin | admin@test.com | password |
| staff | staff@test.com | password |
| user  | user@test.com  | password |

---

## Checklist: Mengganti Role (mis. Admin/Staff/User → Admin/Guru/Siswa)

Kalau mau reuse boilerplate ini dengan nama role berbeda, titik yang perlu diubah cuma ini:

1. `database/seeders/RolePermissionSeeder.php` — nama role & permission
2. `database/seeders/RoleUserSeeder.php` — email/nama user default per role
3. `routes/web.php` — `match()` redirect + route group (prefix, name, `role:...`) per role
4. `resources/js/Layouts/SidebarLayout.tsx` — `RoleKey` type + `ROLE_THEME` (label & warna aksen)
5. `resources/js/Pages/{Role}/Dashboard.tsx` — folder & isi dashboard per role (copy dari salah satu yang ada, ganti label/stat/warna)

Tidak perlu menyentuh: middleware alias, migration permission tables, komponen Breeze, layout auth.

---

## 🔁 Prompt Template (untuk dipakai ulang di project baru)

Salin prompt di bawah ini dan isi bagian `{{...}}` sesuai kebutuhan project baru, lalu kirim ke
AI assistant (Claude) untuk regenerasi cepat tanpa menjelaskan ulang arsitekturnya:

```
Saya punya boilerplate Laravel 12 + Inertia React (TypeScript) + Tailwind dengan sistem
role menggunakan spatie/laravel-permission, mengikuti pola dari repo saepudinasep/setup-laravel:

- Role & permission didefinisikan di database/seeders/RolePermissionSeeder.php
- User default per role di database/seeders/RoleUserSeeder.php (email {role}@test.com, password "password")
- routes/web.php: redirect /dashboard sesuai role via match(true), plus route group per role
  dengan prefix, name, dan middleware role:{nama_role}
- resources/js/Layouts/SidebarLayout.tsx: sidebar reusable dengan ROLE_THEME (RoleKey type +
  warna aksen per role: label, accentText, accentBg, accentBgSoft, accentRing)
- resources/js/Pages/{Role}/Dashboard.tsx: dashboard per role pakai <SidebarLayout role="..." pageTitle="..." menus={...}>,
  berisi stat cards + panel "Aktivitas Terbaru"

Tolong adaptasi seluruh pola di atas untuk role berikut:
- Role 1: {{admin}} — permission: {{manage users, view dashboard admin}}
- Role 2: {{guru}} — permission: {{manage nilai, view dashboard guru}}
- Role 3: {{siswa}} — permission: {{view nilai sendiri, view dashboard siswa}}

Ketentuan:
- Warna aksen tiap role beri warna berbeda (pilih dari palet Tailwind: violet, teal, blue,
  amber, rose, dst — sesuaikan agar kontras dan enak dilihat)
- Nama & email user seed default: {{Nama Sesuai Role}} / {{role}}@test.com / password "password"
- Struktur folder, konvensi penamaan file, dan cara routing HARUS mengikuti persis pola yang sudah ada
- Jangan ubah bagian yang tidak terkait role (middleware alias, layout auth, komponen Breeze)
```

Contoh isian cepat: `admin, petugas, siswa` / `admin, kasir, pelanggan` / `admin, guru, siswa` —
tinggal ganti nama & permission-nya, sisanya AI tinggal ikuti pola yang sudah didokumentasikan
di atas.

---

## Catatan

- README asli bawaan Laravel skeleton telah diganti dengan dokumen ini agar langsung berguna
  sebagai referensi arsitektur proyek.
- Dashboard role saat ini masih berisi data placeholder (`—`) — sambungkan ke data asli sesuai
  kebutuhan masing-masing project turunan.
