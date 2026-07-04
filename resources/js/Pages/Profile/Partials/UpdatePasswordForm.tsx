import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const [show, setShow] = useState({
        current: false,
        password: false,
        confirm: false,
    });

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors: any) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    const fields = [
        {
            id: "current_password",
            label: "Password saat ini",
            value: data.current_password,
            error: errors.current_password,
            ref: currentPasswordInput,
            show: show.current,
            toggle: () => setShow((s) => ({ ...s, current: !s.current })),
            onChange: (v: string) => setData("current_password", v),
            autoComplete: "current-password",
        },
        {
            id: "password",
            label: "Password baru",
            value: data.password,
            error: errors.password,
            ref: passwordInput,
            show: show.password,
            toggle: () => setShow((s) => ({ ...s, password: !s.password })),
            onChange: (v: string) => setData("password", v),
            autoComplete: "new-password",
        },
        {
            id: "password_confirmation",
            label: "Konfirmasi password baru",
            value: data.password_confirmation,
            error: errors.password_confirmation,
            ref: undefined,
            show: show.confirm,
            toggle: () => setShow((s) => ({ ...s, confirm: !s.confirm })),
            onChange: (v: string) => setData("password_confirmation", v),
            autoComplete: "new-password",
        },
    ];

    return (
        <form onSubmit={submit} className={`space-y-5 ${className}`}>
            {fields.map((field) => (
                <div key={field.id}>
                    <label
                        htmlFor={field.id}
                        className="mb-1.5 block text-sm font-medium text-[#1B1D23]"
                    >
                        {field.label}
                    </label>
                    <div className="relative">
                        <Lock
                            size={18}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            id={field.id}
                            ref={field.ref}
                            type={field.show ? "text" : "password"}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            autoComplete={field.autoComplete}
                            className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-10 text-sm text-[#1B1D23] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        />
                        <button
                            type="button"
                            onClick={field.toggle}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            aria-label={
                                field.show
                                    ? "Sembunyikan password"
                                    : "Tampilkan password"
                            }
                        >
                            {field.show ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                    <InputError message={field.error} className="mt-1.5" />
                </div>
            ))}

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Simpan
                </button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-emerald-600">Tersimpan.</p>
                </Transition>
            </div>
        </form>
    );
}
