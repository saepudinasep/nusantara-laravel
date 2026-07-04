import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Update({ teacher }: any) {
    const { data, setData, patch, errors, processing } = useForm({
        user_id: teacher.user_id ?? "",
        name: teacher.name ?? "",
        phone_number: teacher.phone_number ?? "",
        date_of_birth: teacher.date_of_birth ?? "",
        gender: teacher.gender ?? "",
        address: teacher.address ?? "",
    });

    const { status } = usePage().props as any;

    const menus: SidebarMenuItem[] = [
        { label: "Dashboard", href: route("admin.dashboard"), icon: <></> },
        {
            label: "Data Guru",
            href: route("admin.teachers.index"),
            icon: <></>,
            active: true,
        },
    ];

    const submit = (e: any) => {
        e.preventDefault();
        patch(route("admin.teachers.update", teacher.id));
    };

    return (
        <SidebarLayout role="admin" pageTitle="Edit Guru" menus={menus}>
            <Head title="Edit Guru" />

            <div className="rounded-lg border border-black/5 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Edit Guru</h2>
                {status && (
                    <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Nama</label>
                        <input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full rounded border px-3 py-2"
                        />
                    </div>

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
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Alamat</label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full rounded border px-3 py-2"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-violet-600 px-4 py-2 text-white"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    );
}
