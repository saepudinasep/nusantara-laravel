import { useState, FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Eye, EyeOff, GraduationCap, Mail, Lock } from "lucide-react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="flex min-h-screen bg-[#F5F5F3]">
            <Head title="Masuk" />

            {/* ===== Panel branding (hanya tampil di layar besar) ===== */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#12141C] p-12 text-white lg:flex">
                {/* Aksen dekoratif, flat tanpa gradient */}
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10" />
                <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-violet-500/5" />

                <div className="relative flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                    <span className="text-[15px] font-semibold tracking-tight">
                        SMK Nusantara
                    </span>
                </div>

                <div className="relative max-w-md">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
                        <GraduationCap size={28} className="text-violet-400" />
                    </div>
                    <h1 className="text-3xl font-semibold leading-tight tracking-tight">
                        Sistem Informasi Manajemen Sekolah
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                        Kelola data guru, siswa, jadwal, dan nilai dalam satu
                        platform terintegrasi untuk SMK Nusantara.
                    </p>
                </div>

                <p className="relative text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} SMK Nusantara. Seluruh hak
                    dilindungi.
                </p>
            </div>

            {/* ===== Panel form login ===== */}
            <div className="flex w-full flex-1 items-center justify-center px-6 py-12 lg:w-1/2">
                <div className="w-full max-w-sm">
                    {/* Brand mobile-only */}
                    <div className="mb-8 flex items-center gap-2.5 lg:hidden">
                        <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                        <span className="text-[15px] font-semibold tracking-tight text-[#1B1D23]">
                            SMK Nusantara
                        </span>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight text-[#1B1D23]">
                        Selamat datang kembali
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-500">
                        Masuk untuk melanjutkan ke dashboard Anda.
                    </p>

                    {status && (
                        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-8 space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-medium text-[#1B1D23]"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="nama@smknusantara.sch.id"
                                    className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm text-[#1B1D23] placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                />
                            </div>
                            <InputError
                                message={errors.email}
                                className="mt-1.5"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-[#1B1D23]"
                                >
                                    Password
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-xs font-medium text-violet-600 hover:text-violet-700"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-10 text-sm text-[#1B1D23] placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={
                                        showPassword
                                            ? "Sembunyikan password"
                                            : "Tampilkan password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-1.5"
                            />
                        </div>

                        {/* Remember me */}
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="h-4 w-4 rounded border-black/20 text-violet-600 focus:ring-violet-500/30"
                            />
                            Ingat saya
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-slate-400">
                        Butuh akses? Hubungi administrator sekolah.
                    </p>
                </div>
            </div>
        </div>
    );
}
