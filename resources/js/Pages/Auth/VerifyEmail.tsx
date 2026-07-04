import { FormEventHandler } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { MailCheck } from "lucide-react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5F3] px-6">
            <Head title="Verifikasi Email" />

            <div className="w-full max-w-sm rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                    <span className="text-[15px] font-semibold tracking-tight text-[#1B1D23]">
                        SMK Nusantara
                    </span>
                </div>

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                    <MailCheck size={22} className="text-violet-500" />
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-[#1B1D23]">
                    Verifikasi email Anda
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    Terima kasih telah mendaftar. Sebelum melanjutkan, mohon
                    verifikasi alamat email Anda dengan mengklik tautan yang
                    baru saja kami kirimkan. Tidak menerima email? Kami akan
                    kirimkan yang baru.
                </p>

                {status === "verification-link-sent" && (
                    <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        Tautan verifikasi baru telah dikirim ke alamat email
                        yang Anda daftarkan.
                    </div>
                )}

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing
                            ? "Mengirim..."
                            : "Kirim ulang email verifikasi"}
                    </button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full rounded-lg border border-black/10 bg-white py-2.5 text-sm font-medium text-slate-600 transition hover:bg-black/[0.02]"
                    >
                        Keluar
                    </Link>
                </form>
            </div>
        </div>
    );
}
