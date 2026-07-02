import { Head } from "@inertiajs/react";
import {
    LayoutDashboard,
    ClipboardList,
    CheckCircle2,
    Clock,
    ArrowUpRight,
} from "lucide-react";
import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";

const menus: SidebarMenuItem[] = [
    {
        label: "Dashboard",
        href: route("staff.dashboard"),
        icon: <LayoutDashboard size={18} />,
        active: true,
    },
    // Menu tambahan staff bisa ditambahkan di sini nanti
];

const stats = [
    {
        label: "Tugas Hari Ini",
        value: "—",
        icon: ClipboardList,
        accent: "text-teal-600 bg-teal-50",
    },
    {
        label: "Selesai Minggu Ini",
        value: "—",
        icon: CheckCircle2,
        accent: "text-teal-600 bg-teal-50",
    },
    {
        label: "Menunggu Tindakan",
        value: "—",
        icon: Clock,
        accent: "text-teal-600 bg-teal-50",
    },
];

export default function Dashboard() {
    return (
        <SidebarLayout role="staff" pageTitle="Dashboard Staff" menus={menus}>
            <Head title="Dashboard Staff" />

            <div className="mb-6">
                <p className="text-sm text-slate-500">
                    Ringkasan tugas dan data yang perlu kamu kelola hari ini.
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
                        Daftar Tugas
                    </h2>
                    <button className="flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700">
                        Lihat semua
                        <ArrowUpRight size={14} />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 py-12 text-center">
                    <p className="text-sm text-slate-400">
                        Belum ada tugas untuk ditampilkan.
                    </p>
                </div>
            </div>
        </SidebarLayout>
    );
}
