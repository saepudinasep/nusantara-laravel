import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { LogOut, Menu, User as UserIcon, X } from "lucide-react";
import type { User } from "@/types";

export interface SidebarMenuItem {
    label: string;
    href: string;
    icon: ReactNode;
    active?: boolean;
}

type RoleKey = "admin" | "teacher" | "student";

interface RoleTheme {
    label: string;
    accentText: string;
    accentBg: string;
    accentBgSoft: string;
    accentRing: string;
}

const ROLE_THEME: Record<RoleKey, RoleTheme> = {
    admin: {
        label: "Administrator",
        accentText: "text-violet-400",
        accentBg: "bg-violet-500",
        accentBgSoft: "bg-violet-500/10",
        accentRing: "ring-violet-500/40",
    },
    teacher: {
        label: "Guru",
        accentText: "text-teal-400",
        accentBg: "bg-teal-500",
        accentBgSoft: "bg-teal-500/10",
        accentRing: "ring-teal-500/40",
    },
    student: {
        label: "Siswa",
        accentText: "text-blue-400",
        accentBg: "bg-blue-500",
        accentBgSoft: "bg-blue-500/10",
        accentRing: "ring-blue-500/40",
    },
};

interface SidebarLayoutProps {
    role: RoleKey;
    pageTitle: string;
    menus: SidebarMenuItem[];
}

export default function SidebarLayout({
    role,
    pageTitle,
    menus,
    children,
}: PropsWithChildren<SidebarLayoutProps>) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const theme = ROLE_THEME[role];
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const initials = auth.user.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const handleLogout = () => {
        router.post(route("logout"));
    };

    // Tutup sidebar otomatis setiap kali pindah halaman (khusus tampilan mobile)
    useEffect(() => {
        return router.on("navigate", () => setSidebarOpen(false));
    }, []);

    return (
        <div className="flex min-h-screen bg-[#F5F5F3]">
            {/* Overlay untuk mobile saat sidebar terbuka */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-shrink-0 transform flex-col justify-between bg-[#12141C] text-slate-300 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div>
                    {/* Brand */}
                    <div className="flex items-center justify-between gap-2.5 px-6 py-6">
                        <div className="flex items-center gap-2.5">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${theme.accentBg}`}
                            />
                            <span className="text-[15px] font-semibold tracking-tight text-white">
                                SMK Nusantara
                            </span>
                        </div>
                        {/* Tombol tutup, hanya tampil di mobile */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Role badge */}
                    <div className="mx-4 mb-6 flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${theme.accentBg}`}
                        />
                        <span
                            className={`text-xs font-medium uppercase tracking-wide ${theme.accentText}`}
                        >
                            {theme.label}
                        </span>
                    </div>

                    {/* Menu */}
                    <nav className="space-y-1 px-3">
                        {menus.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                                    item.active
                                        ? `${theme.accentBgSoft} text-white`
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <span
                                    className={
                                        item.active ? theme.accentText : ""
                                    }
                                >
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* User footer */}
                <div className="border-t border-white/5 p-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div
                            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ring-2 ${theme.accentBg} ${theme.accentRing}`}
                        >
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                                {auth.user.name}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                                {auth.user.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={route("profile.edit")}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 py-2 text-xs text-slate-300 transition hover:bg-white/5 hover:text-white"
                        >
                            <UserIcon size={14} />
                            Profil
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 py-2 text-xs text-slate-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                        >
                            <LogOut size={14} />
                            Keluar
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="min-w-0 flex-1">
                <header className="flex items-center justify-between border-b border-black/5 bg-white px-4 py-5 sm:px-8">
                    <div className="flex items-center gap-3">
                        {/* Tombol hamburger, hanya tampil di mobile/tablet */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-black/5 lg:hidden"
                            aria-label="Buka menu"
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="text-lg font-semibold tracking-tight text-[#1B1D23]">
                            {pageTitle}
                        </h1>
                    </div>
                    <span className="hidden text-xs text-slate-400 sm:inline">
                        {new Date().toLocaleDateString("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </header>
                <main className="p-4 sm:p-8">{children}</main>
            </div>
        </div>
    );
}
