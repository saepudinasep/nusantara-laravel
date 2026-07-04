import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    GraduationCap,
    Users,
    School,
    CalendarCheck,
    FileBarChart,
    ArrowLeft,
} from "lucide-react";
import React, { useState } from "react";

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
        active: true,
    },
    { label: "Data Kelas", href: "#", icon: <School size={18} /> },
    { label: "Jadwal Pelajaran", href: "#", icon: <CalendarCheck size={18} /> },
    { label: "Laporan Nilai", href: "#", icon: <FileBarChart size={18} /> },
];

export default function Update({ student, currentClassId }: any) {
    const { classList } = usePage().props as any;

    const { data, setData, post, errors, processing } = useForm({
        name: student.name ?? "",
        email: student.user?.email ?? "",
        phone_number: student.phone_number ?? "",
        date_of_birth: student.date_of_birth ?? "",
        gender: student.gender ?? "",
        address: student.address ?? "",
        class_id: currentClassId ? String(currentClassId) : "",
        photo: null as File | null,
        _method: "put",
    });

    const [preview, setPreview] = useState<string | null>(
        student.photo ? `/storage/${student.photo}` : null,
    );

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData("photo", file);
        setPreview(file ? URL.createObjectURL(file) : preview);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Files can't be sent with a real PUT request, so we POST with
        // a spoofed _method field (handled above in useForm's data).
        post(route("admin.students.update", student.id), {
            forceFormData: true,
        });
    };

    return (
        <SidebarLayout role="admin" pageTitle="Edit Siswa" menus={menus}>
            <Head title="Edit Siswa" />

            <div className="mb-4">
                <Link
                    href={route("admin.students.index")}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft size={14} /> Kembali ke Daftar Siswa
                </Link>
            </div>

            <div className="rounded-lg border border-black/5 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Edit Siswa</h2>

                <form
                    onSubmit={submit}
                    className="space-y-4"
                    encType="multipart/form-data"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-violet-500">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-xs">Foto</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                Ganti Foto (opsional)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="text-sm"
                            />
                            {errors.photo && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.photo}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Nama</label>
                        <input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Kelas</label>
                        <select
                            value={data.class_id}
                            onChange={(e) =>
                                setData("class_id", e.target.value)
                            }
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value="">Belum ditempatkan</option>
                            {(classList || []).map((c: any) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        {errors.class_id && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.class_id}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm mb-1">
                                No. Telepon
                            </label>
                            <input
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.phone_number && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.phone_number}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm mb-1">
                                Tanggal Lahir
                            </label>
                            <input
                                type="date"
                                value={data.date_of_birth ?? ""}
                                onChange={(e) =>
                                    setData("date_of_birth", e.target.value)
                                }
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.date_of_birth && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.date_of_birth}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Jenis Kelamin
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="inline-flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="L"
                                    checked={data.gender === "L"}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                />
                                Laki-laki
                            </label>
                            <label className="inline-flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="P"
                                    checked={data.gender === "P"}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                />
                                Perempuan
                            </label>
                        </div>
                        {errors.gender && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.gender}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Alamat</label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            rows={3}
                            className="w-full rounded border px-3 py-2"
                        />
                        {errors.address && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.address}
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
                            href={route("admin.students.index")}
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
