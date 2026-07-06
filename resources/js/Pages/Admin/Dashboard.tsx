import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import { Head } from "@inertiajs/react";
import {
    LayoutDashboard,
    GraduationCap,
    Users,
    School,
    CalendarCheck,
    FileBarChart,
} from "lucide-react";

interface Stats {
    total_teacher: number;
    total_student: number;
    total_class: number;
    schedule_finalized: number;
    schedule_draft: number;
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
        href: route("admin.dashboard"),
        icon: <LayoutDashboard size={18} />,
        active: true,
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
    },
    { label: "Jadwal Pelajaran", href: "#", icon: <CalendarCheck size={18} /> },
    { label: "Laporan Nilai", href: "#", icon: <FileBarChart size={18} /> },
];

export default function Dashboard({ stats, recentActivities }: Props) {
    const cards = [
        {
            label: "Total Guru",
            value: stats.total_teacher,
            icon: <GraduationCap size={18} className="text-violet-500" />,
        },
        {
            label: "Total Siswa",
            value: stats.total_student,
            icon: <Users size={18} className="text-violet-500" />,
        },
        {
            label: "Total Kelas",
            value: stats.total_class,
            icon: <School size={18} className="text-violet-500" />,
        },
        {
            label: "Jadwal Final",
            value: stats.schedule_finalized,
            icon: <CalendarCheck size={18} className="text-violet-500" />,
        },
        {
            label: "Jadwal Draft",
            value: stats.schedule_draft,
            icon: <CalendarCheck size={18} className="text-violet-500" />,
        },
    ];

    return (
        <SidebarLayout role="admin" pageTitle="Dashboard Admin" menus={menus}>
            <Head title="Dashboard Admin" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
                        <p className="mt-2 text-2xl font-bold text-violet-500">
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
