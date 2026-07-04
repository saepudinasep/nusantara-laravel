import { Head, Link } from "@inertiajs/react";
import {
    GraduationCap,
    Users,
    CalendarCheck,
    FileBarChart,
    ArrowRight,
} from "lucide-react";
import { PageProps } from "@/types";

interface WelcomeProps extends PageProps {
    canLogin: boolean;
    canRegister: boolean;
}

export default function Welcome({ canLogin, canRegister }: WelcomeProps) {
    const features = [
        {
            icon: <Users size={20} className="text-violet-500" />,
            title: "Data guru & siswa",
            desc: "Kelola data guru dan siswa secara terpusat, rapi, dan mudah diakses kapan saja.",
        },
        {
            icon: <CalendarCheck size={20} className="text-violet-500" />,
            title: "Jadwal pelajaran",
            desc: "Susun dan finalisasi jadwal mengajar per kelas tanpa bentrok, otomatis tersinkron ke semua role.",
        },
        {
            icon: <FileBarChart size={20} className="text-violet-500" />,
            title: "Nilai & laporan",
            desc: "Guru input nilai, siswa pantau perkembangan, admin lihat laporan lengkap — semua real-time.",
        },
    ];

    return (
        <>
            <Head title="SMK Nusantara — Sistem Informasi Manajemen Sekolah" />

            <div className="min-h-screen bg-[#F5F5F3] text-[#1B1D23]">
                {/* ===== Navbar ===== */}
                <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                        <span className="text-[15px] font-semibold tracking-tight">
                            SMK Nusantara
                        </span>
                    </div>

                    <nav className="flex items-center gap-3">
                        {canLogin && (
                            <Link
                                href={route("login")}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#1B1D23]"
                            >
                                Masuk
                            </Link>
                        )}
                    </nav>
                </header>

                {/* ===== Hero ===== */}
                <main className="mx-auto max-w-6xl px-6">
                    <section className="flex flex-col items-start gap-6 py-16 sm:py-24">
                        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-xs font-medium text-violet-600">
                            <GraduationCap size={14} />
                            Sistem Informasi Manajemen Sekolah
                        </div>

                        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                            Satu platform untuk seluruh kegiatan akademik SMK
                            Nusantara
                        </h1>

                        <p className="max-w-xl text-base leading-relaxed text-slate-500">
                            Kelola data guru, siswa, jadwal pelajaran, hingga
                            nilai dalam satu sistem terintegrasi — dirancang
                            khusus untuk kebutuhan admin, guru, dan siswa.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Link
                                href={route(canLogin ? "login" : "register")}
                                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                            >
                                Mulai sekarang
                                <ArrowRight size={16} />
                            </Link>

                            <a
                                href="#fitur"
                                className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-[#1B1D23] transition hover:bg-black/[0.02]"
                            >
                                Lihat fitur
                            </a>
                        </div>
                    </section>

                    {/* ===== Fitur ===== */}
                    <section
                        id="fitur"
                        className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-3"
                    >
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-xl border border-black/5 bg-white p-6 shadow-sm"
                            >
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                                    {feature.icon}
                                </div>
                                <h3 className="text-sm font-semibold text-[#1B1D23]">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </section>

                    {/* ===== Role strip ===== */}
                    <section className="mb-20 rounded-2xl bg-[#12141C] px-8 py-10 text-white sm:px-12">
                        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-xl font-semibold tracking-tight">
                                    Dirancang untuk tiga peran
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Admin, guru, dan siswa — masing-masing punya
                                    dashboard sesuai kebutuhannya.
                                </p>
                            </div>
                            <div className="flex gap-3 text-xs font-medium">
                                <span className="rounded-full bg-violet-500/10 px-3 py-1.5 text-violet-400">
                                    Admin
                                </span>
                                <span className="rounded-full bg-teal-500/10 px-3 py-1.5 text-teal-400">
                                    Guru
                                </span>
                                <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-blue-400">
                                    Siswa
                                </span>
                            </div>
                        </div>
                    </section>
                </main>

                {/* ===== Footer ===== */}
                <footer className="mx-auto max-w-6xl px-6 py-8">
                    <p className="text-center text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} SMK Nusantara. Seluruh
                        hak dilindungi.
                    </p>
                </footer>
            </div>
        </>
    );
}
