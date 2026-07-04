import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        user_id: "",
        name: "",
        phone_number: "",
        date_of_birth: "",
        gender: "",
        address: "",
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
        post(route("admin.teachers.store"));
    };

    return (
        <SidebarLayout role="admin" pageTitle="Tambah Guru" menus={menus}>
            <Head title="Tambah Guru" />

            <div className="rounded-lg border border-black/5 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold">Tambah Guru</h2>
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
