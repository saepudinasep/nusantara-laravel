import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import { Head } from "@inertiajs/react";
import {
    LayoutDashboard,
    CalendarClock,
    BookOpen,
    ClipboardCheck,
} from "lucide-react";

interface Stats {
    total_teaching_hours: number;
    total_subject: number;
    total_score_input: number;
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
        href: route("teacher.dashboard"),
        icon: <LayoutDashboard size={18} />,
        active: true,
    },
    { label: "Jadwal Mengajar", href: "#", icon: <CalendarClock size={18} /> },
    { label: "Input Nilai", href: "#", icon: <ClipboardCheck size={18} /> },
];

export default function Dashboard({ stats, recentActivities }: Props) {
    const cards = [
        {
            label: "Jam Mengajar",
            value: stats.total_teaching_hours,
            icon: <CalendarClock size={18} className="text-teal-500" />,
        },
        {
            label: "Mata Pelajaran Diampu",
            value: stats.total_subject,
            icon: <BookOpen size={18} className="text-teal-500" />,
        },
        {
            label: "Nilai Terinput",
            value: stats.total_score_input,
            icon: <ClipboardCheck size={18} className="text-teal-500" />,
        },
    ];

    return (
        <SidebarLayout role="teacher" pageTitle="Dashboard Guru" menus={menus}>
            <Head title="Dashboard Guru" />

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
                        <p className="mt-2 text-2xl font-bold text-teal-500">
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
