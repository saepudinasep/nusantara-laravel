import { useState, FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import {
    Eye,
    EyeOff,
    GraduationCap,
    Mail,
    Lock,
    User as UserIcon,
} from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="flex min-h-screen bg-[#F5F5F3]">
            <Head title="Daftar" />

            {/* ===== Panel branding (hanya tampil di layar besar) ===== */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#12141C] p-12 text-white lg:flex">
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
                        Bergabung dengan sistem informasi sekolah
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">
                        Buat akun untuk mulai mengakses data akademik SMK
                        Nusantara sesuai peran Anda.
                    </p>
                </div>

                <p className="relative text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} SMK Nusantara. Seluruh hak
                    dilindungi.
                </p>
            </div>

            {/* ===== Panel form register ===== */}
            <div className="flex w-full flex-1 items-center justify-center px-6 py-12 lg:w-1/2">
                <div className="w-full max-w-sm">
                    <div className="mb-8 flex items-center gap-2.5 lg:hidden">
                        <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                        <span className="text-[15px] font-semibold tracking-tight text-[#1B1D23]">
                            SMK Nusantara
                        </span>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight text-[#1B1D23]">
                        Buat akun baru
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-500">
                        Lengkapi data di bawah untuk mendaftar.
                    </p>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                        {/* Nama */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1.5 block text-sm font-medium text-[#1B1D23]"
                            >
                                Nama lengkap
                            </label>
                            <div className="relative">
                                <UserIcon
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    autoComplete="name"
                                    autoFocus
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Nama sesuai identitas"
                                    className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm text-[#1B1D23] placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                />
                            </div>
                            <InputError
                                message={errors.name}
                                className="mt-1.5"
                            />
                        </div>

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
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-medium text-[#1B1D23]"
                            >
                                Password
                            </label>
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
                                    autoComplete="new-password"
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

                        {/* Konfirmasi Password */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="mb-1.5 block text-sm font-medium text-[#1B1D23]"
                            >
                                Konfirmasi password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    id="password_confirmation"
                                    type={showConfirm ? "text" : "password"}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-10 text-sm text-[#1B1D23] placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirm((prev) => !prev)
                                    }
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={
                                        showConfirm
                                            ? "Sembunyikan password"
                                            : "Tampilkan password"
                                    }
                                >
                                    {showConfirm ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-1.5"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? "Memproses..." : "Daftar"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Sudah punya akun?{" "}
                        <Link
                            href={route("login")}
                            className="font-medium text-violet-600 hover:text-violet-700"
                        >
                            Masuk di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
