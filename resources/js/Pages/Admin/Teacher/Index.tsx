import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Trash2, Edit, Plus } from "lucide-react";
import React from "react";

export default function Index() {
    const { teachers, status } = usePage().props as any;

    const menus: SidebarMenuItem[] = [
        {
            label: "Dashboard",
            href: route("admin.dashboard"),
            icon: <Plus size={16} />,
        },
        {
            label: "Data Guru",
            href: route("admin.teachers.index"),
            icon: <Plus size={16} />,
            active: true,
        },
    ];

    const items = teachers.data || [];

    return (
        <SidebarLayout role="admin" pageTitle="Daftar Guru" menus={menus}>
            <Head title="Daftar Guru" />

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-semibold">Daftar Guru</h1>
                <Link
                    href={route("admin.teachers.create")}
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm text-white"
                >
                    <Plus size={16} />
                    Tambah Guru
                </Link>
            </div>

            {status && (
                <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                    {status}
                </div>
            )}

            <div className="rounded-lg border border-black/5 bg-white p-4">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left text-sm text-slate-500">
                                <th className="p-2">Nama</th>
                                <th className="p-2">Telepon</th>
                                <th className="p-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((t: any) => (
                                <tr key={t.id} className="border-t">
                                    <td className="p-2">{t.name}</td>
                                    <td className="p-2">{t.phone_number}</td>
                                    <td className="p-2">
                                        <Link
                                            href={route(
                                                "admin.teachers.edit",
                                                t.id,
                                            )}
                                            className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm text-slate-600 hover:bg-black/5"
                                        >
                                            <Edit size={14} /> Edit
                                        </Link>
                                        <form
                                            method="post"
                                            action={route(
                                                "admin.teachers.destroy",
                                                t.id,
                                            )}
                                            className="inline-block ml-2"
                                            onSubmit={(e) => {
                                                if (!confirm("Hapus guru ini?"))
                                                    e.preventDefault();
                                            }}
                                        >
                                            <input
                                                type="hidden"
                                                name="_method"
                                                value="delete"
                                            />
                                            <input
                                                type="hidden"
                                                name="_token"
                                                value={
                                                    (
                                                        document.querySelector(
                                                            'meta[name="csrf-token"]',
                                                        ) as any
                                                    )?.content
                                                }
                                            />
                                            <button className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50">
                                                <Trash2 size={14} /> Hapus
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-end space-x-2">
                    {teachers.links && (
                        <nav className="inline-flex items-center gap-2">
                            {teachers.links.map((link: any, idx: number) =>
                                link.url ? (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        className={`rounded px-3 py-1 text-sm ${link.active ? "bg-violet-600 text-white" : "text-slate-600 hover:bg-black/5"}`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        key={idx}
                                        className="rounded px-3 py-1 text-sm text-slate-400"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ),
                            )}
                        </nav>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}
