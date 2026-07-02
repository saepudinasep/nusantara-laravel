import { Head } from "@inertiajs/react";
import {
    LayoutDashboard,
    ShieldCheck,
    Users,
    Activity,
    ArrowUpRight,
} from "lucide-react";
import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";

const menus: SidebarMenuItem[] = [
    {
        label: "Dashboard",
        href: route("admin.dashboard"),
        icon: <LayoutDashboard size={18} />,
        active: true,
    },
    // Menu tambahan admin bisa ditambahkan di sini nanti
];

const stats = [
    {
        label: "Total Pengguna",
        value: "—",
        icon: Users,
        accent: "text-violet-600 bg-violet-50",
    },
    {
        label: "Total Staff",
        value: "—",
        icon: ShieldCheck,
        accent: "text-violet-600 bg-violet-50",
    },
    {
        label: "Aktivitas Hari Ini",
        value: "—",
        icon: Activity,
        accent: "text-violet-600 bg-violet-50",
    },
];

export default function Dashboard() {
    return (
        <SidebarLayout role="admin" pageTitle="Dashboard Admin" menus={menus}>
            <Head title="Dashboard Admin" />

            <div className="mb-6">
                <p className="text-sm text-slate-500">
                    Ringkasan sistem dan aktivitas terbaru dari seluruh
                    pengguna.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map(({ label, value, icon: Icon, accent }) => (
                    <div
                        key={label}
                        className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
                    >
                        <div
                            className={`mb-3 inline-flex rounded-lg p-2 ${accent}`}
                        >
                            <Icon size={18} />
                        </div>
                        <p className="text-2xl font-semibold text-[#1B1D23]">
                            {value}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">{label}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-xl border border-black/5 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-[#1B1D23]">
                        Aktivitas Terbaru
                    </h2>
                    <button className="flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-700">
                        Lihat semua
                        <ArrowUpRight size={14} />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 py-12 text-center">
                    <p className="text-sm text-slate-400">
                        Belum ada aktivitas untuk ditampilkan.
                    </p>
                </div>
            </div>
        </SidebarLayout>
    );
}
