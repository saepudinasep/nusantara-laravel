import { useState, FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Eye, EyeOff, ShieldCheck, Lock } from "lucide-react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5F3] px-6">
            <Head title="Konfirmasi Password" />

            <div className="w-full max-w-sm rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                    <span className="text-[15px] font-semibold tracking-tight text-[#1B1D23]">
                        SMK Nusantara
                    </span>
                </div>

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                    <ShieldCheck size={22} className="text-violet-500" />
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-[#1B1D23]">
                    Konfirmasi password
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    Ini adalah area rahasia. Mohon konfirmasi password Anda
                    sebelum melanjutkan.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-5">
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
                                autoComplete="current-password"
                                autoFocus
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-10 text-sm text-[#1B1D23] placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
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

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing ? "Memproses..." : "Konfirmasi"}
                    </button>
                </form>
            </div>
        </div>
    );
}
