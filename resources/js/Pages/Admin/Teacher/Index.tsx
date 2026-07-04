import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import Pagination from "@/Components/Pagination";
import EmptyState from "@/Components/EmptyState";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    GraduationCap,
    Users,
    School,
    CalendarCheck,
    FileBarChart,
    Search,
    X,
    Pencil,
    Trash2,
    Plus,
} from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const menus: SidebarMenuItem[] = [
    {
        label: "Dashboard",
        href: route("admin.dashboard"),
        icon: <LayoutDashboard size={18} />,
    },
    {
        label: "Data Guru",
        href: route("admin.teachers.index"),
        icon: <GraduationCap size={18} />,
        active: true,
    },
    { label: "Data Siswa", href: "#", icon: <Users size={18} /> },
    { label: "Data Kelas", href: "#", icon: <School size={18} /> },
    { label: "Jadwal Pelajaran", href: "#", icon: <CalendarCheck size={18} /> },
    { label: "Laporan Nilai", href: "#", icon: <FileBarChart size={18} /> },
];

/** Warna avatar konsisten berdasarkan nama (deterministik, bukan acak). */
const AVATAR_COLORS = [
    "#7c3aed", // violet-600
    "#0d9488", // teal-600
    "#d97706", // amber-600
    "#dc2626", // red-600
    "#2563eb", // blue-600
    "#db2777", // pink-600
];

function avatarColor(name: string) {
    const sum = name
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function initials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default function Index() {
    const { teachers, filters, status } = usePage().props as any;
    const [search, setSearch] = useState(filters?.search ?? "");
    const [searching, setSearching] = useState(false);

    const items = teachers.data || [];

    const applyFilter = (nextSearch: string) => {
        router.get(
            route("admin.teachers.index"),
            { search: nextSearch || undefined },
            {
                preserveState: true,
                replace: true,
                onStart: () => setSearching(true),
                onFinish: () => setSearching(false),
            },
        );
    };

    // Pencarian dipicu manual lewat tombol "Cari" atau tombol Enter,
    // bukan otomatis saat mengetik.
    const handleSearch = () => applyFilter(search);

    const handleClearSearch = () => {
        setSearch("");
        applyFilter("");
    };

    const handleDelete = (id: number, name: string) => {
        Swal.fire({
            title: `Hapus guru "${name}"?`,
            text: "Data yang sudah dihapus tidak dapat dikembalikan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.teachers.destroy", id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: "Guru berhasil dihapus",
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    },
                });
            }
        });
    };

    return (
        <SidebarLayout role="admin" pageTitle="Daftar Guru" menus={menus}>
            <Head title="Daftar Guru" />

            <div className="mb-1 text-xs text-slate-400">
                Master Data · <span className="text-slate-600">Data Guru</span>
            </div>
            <div className="mb-4">
                <h1 className="text-lg font-semibold text-slate-800">
                    Data Guru
                </h1>
                <p className="text-sm text-slate-500">
                    Kelola data guru yang terdaftar di sistem.
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                    {status}
                </div>
            )}

            <div className="rounded-lg border border-black/5 bg-white p-4 shadow-sm">
                <div className="mb-4 flex flex-col gap-3 border-b border-black/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="text-sm font-semibold text-slate-700">
                            Daftar Guru
                        </div>
                        <div className="text-xs text-slate-400">
                            {teachers.total ?? items.length} guru terdaftar
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <Search
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSearch();
                                    }
                                }}
                                placeholder="Cari nama / telepon..."
                                className="w-56 rounded-lg border px-3 py-2 pl-9 pr-8 text-sm focus:border-violet-500 focus:outline-none"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    aria-label="Hapus pencarian"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={searching}
                            className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-100 disabled:opacity-60"
                        >
                            {searching ? (
                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-violet-300 border-t-violet-700" />
                            ) : (
                                <Search size={14} />
                            )}
                            Cari
                        </button>

                        <Link
                            href={route("admin.teachers.create")}
                            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm text-white hover:bg-violet-700"
                        >
                            <Plus size={16} />
                            Tambah Guru
                        </Link>
                    </div>
                </div>

                {items.length === 0 ? (
                    <EmptyState
                        title="Belum ada data guru"
                        description="Klik tombol Tambah Guru untuk menambahkan data baru."
                    />
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                                        <th className="p-2 font-medium">No</th>
                                        <th className="p-2 font-medium">
                                            Nama Guru
                                        </th>
                                        <th className="p-2 font-medium">
                                            Email
                                        </th>
                                        <th className="p-2 font-medium">
                                            No. Telepon
                                        </th>
                                        <th className="p-2 font-medium">
                                            Jenis Kelamin
                                        </th>
                                        <th className="p-2 font-medium">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((t: any, idx: number) => (
                                        <tr
                                            key={t.id}
                                            className="border-t border-black/5 hover:bg-slate-50"
                                        >
                                            <td className="p-2 text-sm text-slate-500">
                                                {(teachers.from ?? 1) + idx}
                                            </td>
                                            <td className="p-2">
                                                <div className="flex items-center gap-3">
                                                    {t.photo ? (
                                                        <img
                                                            src={`/storage/${t.photo}`}
                                                            alt={t.name}
                                                            className="h-9 w-9 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                                                            style={{
                                                                background:
                                                                    avatarColor(
                                                                        t.name,
                                                                    ),
                                                            }}
                                                        >
                                                            {initials(t.name)}
                                                        </div>
                                                    )}
                                                    <span className="font-medium text-slate-700">
                                                        {t.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-2 font-mono text-xs text-slate-500">
                                                {t.user?.email ?? "—"}
                                            </td>
                                            <td className="p-2 text-slate-600">
                                                {t.phone_number || "—"}
                                            </td>
                                            <td className="p-2">
                                                {t.gender === "L" ? (
                                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                                        Laki-laki
                                                    </span>
                                                ) : t.gender === "P" ? (
                                                    <span className="inline-flex items-center rounded-full bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-700">
                                                        Perempuan
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                                                        —
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-2">
                                                <div className="flex items-center gap-1">
                                                    <Link
                                                        href={route(
                                                            "admin.teachers.edit",
                                                            t.id,
                                                        )}
                                                        title="Edit"
                                                        className="rounded p-1.5 text-slate-500 hover:bg-violet-50 hover:text-violet-600"
                                                    >
                                                        <Pencil size={15} />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        title="Hapus"
                                                        onClick={() =>
                                                            handleDelete(
                                                                t.id,
                                                                t.name,
                                                            )
                                                        }
                                                        className="rounded p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            links={teachers.links}
                            from={teachers.from}
                            to={teachers.to}
                            total={teachers.total}
                            itemLabel="guru"
                        />
                    </>
                )}
            </div>
        </SidebarLayout>
    );
}
