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
    },
    {
        label: "Data Siswa",
        href: route("admin.students.index"),
        icon: <Users size={18} />,
    },
    {
        label: "Data Kelas",
        href: route("admin.classes.index"),
        icon: <School size={18} />,
        active: true,
    },
    { label: "Jadwal Pelajaran", href: "#", icon: <CalendarCheck size={18} /> },
    { label: "Laporan Nilai", href: "#", icon: <FileBarChart size={18} /> },
];

/** Warna badge tingkat, konsisten dengan badge jenis kelamin di modul lain. */
const GRADE_BADGE: Record<string, string> = {
    X: "bg-emerald-50 text-emerald-700",
    XI: "bg-blue-50 text-blue-700",
    XII: "bg-amber-50 text-amber-700",
};

export default function Index() {
    const { classes, filters, status } = usePage().props as any;
    const [search, setSearch] = useState(filters?.search ?? "");
    const [searching, setSearching] = useState(false);

    const items = classes.data || [];

    const applyFilter = (nextSearch: string) => {
        router.get(
            route("admin.classes.index"),
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

    const handleDelete = (id: number, name: string, studentsCount: number) => {
        const warning =
            studentsCount > 0
                ? `Kelas ini masih memiliki ${studentsCount} siswa. Siswa tidak akan terhapus, tapi penempatan kelasnya akan dilepas. Jadwal pelajaran kelas ini juga akan ikut terhapus.`
                : "Data yang sudah dihapus tidak dapat dikembalikan.";

        Swal.fire({
            title: `Hapus kelas "${name}"?`,
            text: warning,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.classes.destroy", id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            title: "Kelas berhasil dihapus",
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
        <SidebarLayout role="admin" pageTitle="Data Kelas" menus={menus}>
            <Head title="Data Kelas" />

            <div className="mb-1 text-xs text-slate-400">
                Master Data · <span className="text-slate-600">Data Kelas</span>
            </div>
            <div className="mb-4">
                <h1 className="text-lg font-semibold text-slate-800">
                    Data Kelas
                </h1>
                <p className="text-sm text-slate-500">
                    Kelola data kelas atau rombongan belajar yang tersedia.
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
                            Daftar Kelas
                        </div>
                        <div className="text-xs text-slate-400">
                            {classes.total ?? items.length} kelas tersedia
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
                                placeholder="Cari nama kelas / tingkat..."
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
                            href={route("admin.classes.create")}
                            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm text-white hover:bg-violet-700"
                        >
                            <Plus size={16} />
                            Tambah Kelas
                        </Link>
                    </div>
                </div>

                {items.length === 0 ? (
                    <EmptyState
                        title="Belum ada data kelas"
                        description="Klik tombol Tambah Kelas untuk menambahkan data baru."
                    />
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                                        <th className="p-2 font-medium">No</th>
                                        <th className="p-2 font-medium">
                                            Nama Kelas
                                        </th>
                                        <th className="p-2 font-medium">
                                            Tingkat
                                        </th>
                                        <th className="p-2 font-medium">
                                            Jumlah Siswa
                                        </th>
                                        <th className="p-2 font-medium">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((c: any, idx: number) => (
                                        <tr
                                            key={c.id}
                                            className="border-t border-black/5 hover:bg-slate-50"
                                        >
                                            <td className="p-2 text-sm text-slate-500">
                                                {(classes.from ?? 1) + idx}
                                            </td>
                                            <td className="p-2 font-medium text-slate-700">
                                                {c.name}
                                            </td>
                                            <td className="p-2">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${GRADE_BADGE[c.grade] ?? "bg-slate-100 text-slate-500"}`}
                                                >
                                                    {c.grade}
                                                </span>
                                            </td>
                                            <td className="p-2 text-slate-600">
                                                {c.students_count} siswa
                                            </td>
                                            <td className="p-2">
                                                <div className="flex items-center gap-1">
                                                    <Link
                                                        href={route(
                                                            "admin.classes.edit",
                                                            c.id,
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
                                                                c.id,
                                                                c.name,
                                                                c.students_count,
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
                            links={classes.links}
                            from={classes.from}
                            to={classes.to}
                            total={classes.total}
                            itemLabel="kelas"
                        />
                    </>
                )}
            </div>
        </SidebarLayout>
    );
}
