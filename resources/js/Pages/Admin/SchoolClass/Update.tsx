import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    LayoutDashboard,
    GraduationCap,
    Users,
    School,
    CalendarCheck,
    FileBarChart,
    ArrowLeft,
} from "lucide-react";
import React from "react";

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

const GRADES = ["X", "XI", "XII"];

export default function Update({ schoolClass }: any) {
    const { data, setData, put, errors, processing } = useForm({
        name: schoolClass.name ?? "",
        grade: schoolClass.grade ?? "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.classes.update", schoolClass.id));
    };

    return (
        <SidebarLayout role="admin" pageTitle="Edit Kelas" menus={menus}>
            <Head title="Edit Kelas" />

            <div className="mb-4">
                <Link
                    href={route("admin.classes.index")}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft size={14} /> Kembali ke Daftar Kelas
                </Link>
            </div>

            <div className="rounded-lg border border-black/5 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Edit Kelas</h2>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Tingkat</label>
                        <div className="flex items-center gap-4">
                            {GRADES.map((g) => (
                                <label
                                    key={g}
                                    className="inline-flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="radio"
                                        name="grade"
                                        value={g}
                                        checked={data.grade === g}
                                        onChange={(e) =>
                                            setData("grade", e.target.value)
                                        }
                                    />
                                    {g}
                                </label>
                            ))}
                        </div>
                        {errors.grade && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.grade}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Nama Kelas</label>
                        <input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Contoh: XI RPL 1"
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-violet-600 px-4 py-2 text-white hover:bg-violet-700 disabled:opacity-60"
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                        <Link
                            href={route("admin.classes.index")}
                            className="rounded px-4 py-2 text-sm text-slate-600 hover:bg-black/5"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    );
}
