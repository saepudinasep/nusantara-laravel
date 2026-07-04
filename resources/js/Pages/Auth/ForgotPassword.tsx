import { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { KeyRound, Mail } from "lucide-react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5F3] px-6">
            <Head title="Lupa Password" />

            <div className="w-full max-w-sm rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                    <span className="text-[15px] font-semibold tracking-tight text-[#1B1D23]">
                        SMK Nusantara
                    </span>
                </div>

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                    <KeyRound size={22} className="text-violet-500" />
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-[#1B1D23]">
                    Lupa password?
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    Masukkan email Anda, kami akan mengirimkan tautan untuk
                    membuat password baru.
                </p>

                {status && (
                    <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-6 space-y-5">
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
                        <InputError message={errors.email} className="mt-1.5" />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing ? "Mengirim..." : "Kirim tautan reset"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Sudah ingat password?{" "}
                    <a
                        href={route("login")}
                        className="font-medium text-violet-600 hover:text-violet-700"
                    >
                        Kembali ke halaman masuk
                    </a>
                </p>
            </div>
        </div>
    );
}
