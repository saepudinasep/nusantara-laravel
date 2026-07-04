import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import { Head } from "@inertiajs/react";
import { LayoutDashboard, BookOpen, Award, School } from "lucide-react";

interface Stats {
    total_subject: number;
    average_score: number;
    class_name: string;
}

interface Activity {
    title: string;
    time: string;
}

interface Props {
    stats: Stats;
    recentActivities: Activity[];
}

const menus: SidebarMenuItem[] = [
    {
        label: "Dashboard",
        href: route("student.dashboard"),
        icon: <LayoutDashboard size={18} />,
        active: true,
    },
    { label: "Nilai Saya", href: "#", icon: <Award size={18} /> },
    { label: "Jadwal Kelas", href: "#", icon: <BookOpen size={18} /> },
];

export default function Dashboard({ stats, recentActivities }: Props) {
    const cards = [
        {
            label: "Kelas",
            value: stats.class_name,
            icon: <School size={18} className="text-blue-500" />,
        },
        {
            label: "Mata Pelajaran",
            value: stats.total_subject,
            icon: <BookOpen size={18} className="text-blue-500" />,
        },
        {
            label: "Rata-rata Nilai",
            value: stats.average_score,
            icon: <Award size={18} className="text-blue-500" />,
        },
    ];

    return (
        <SidebarLayout role="student" pageTitle="Dashboard Siswa" menus={menus}>
            <Head title="Dashboard Siswa" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {card.label}
                            </p>
                            {card.icon}
                        </div>
                        <p className="mt-2 text-2xl font-bold text-blue-500">
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-[#1B1D23]">
                    Aktivitas Terbaru
                </h2>
                {recentActivities.length === 0 ? (
                    <p className="text-sm text-slate-400">
                        Belum ada aktivitas.
                    </p>
                ) : (
                    <ul className="divide-y divide-black/5">
                        {recentActivities.map((activity, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between py-3"
                            >
                                <span className="text-sm text-slate-700">
                                    {activity.title}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {activity.time}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </SidebarLayout>
    );
}
