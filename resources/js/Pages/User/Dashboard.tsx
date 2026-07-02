import { Head } from "@inertiajs/react";
import {
    LayoutDashboard,
    FileText,
    TrendingUp,
    Bell,
    ArrowUpRight,
} from "lucide-react";
import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";

const menus: SidebarMenuItem[] = [
    {
        label: "Dashboard",
        href: route("user.dashboard"),
        icon: <LayoutDashboard size={18} />,
        active: true,
    },
    // Menu tambahan user bisa ditambahkan di sini nanti
];

const stats = [
    {
        label: "Data Saya",
        value: "—",
        icon: FileText,
        accent: "text-blue-600 bg-blue-50",
    },
    {
        label: "Progres",
        value: "—",
        icon: TrendingUp,
        accent: "text-blue-600 bg-blue-50",
    },
    {
        label: "Notifikasi Baru",
        value: "—",
        icon: Bell,
        accent: "text-blue-600 bg-blue-50",
    },
];

export default function Dashboard() {
    return (
        <SidebarLayout role="user" pageTitle="Dashboard" menus={menus}>
            <Head title="Dashboard" />

            <div className="mb-6">
                <p className="text-sm text-slate-500">
                    Selamat datang kembali! Berikut ringkasan aktivitas kamu.
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
                        Aktivitas Terakhir
                    </h2>
                    <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
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
