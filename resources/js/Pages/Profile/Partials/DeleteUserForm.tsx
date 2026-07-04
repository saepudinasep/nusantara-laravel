import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";
import { Lock } from "lucide-react";
import Swal from "sweetalert2";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirming, setConfirming] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmDelete = () => setConfirming(true);

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirming(false);
                Swal.fire({
                    title: "Akun dihapus",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirming(false);
        clearErrors();
        reset();
    };

    return (
        <div className={className}>
            <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
                Hapus Akun
            </button>

            {confirming && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="text-base font-semibold text-[#1B1D23]">
                            Apakah Anda yakin ingin menghapus akun?
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Setelah akun dihapus, seluruh data akan hilang
                            permanen. Masukkan password untuk konfirmasi.
                        </p>

                        <form onSubmit={deleteUser} className="mt-5">
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    ref={passwordInput}
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Password"
                                    className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm text-[#1B1D23] focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                />
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-1.5"
                            />

                            <div className="mt-5 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-black/[0.02]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                                >
                                    Hapus Akun
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
