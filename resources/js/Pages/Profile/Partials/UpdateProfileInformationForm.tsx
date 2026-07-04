import InputError from "@/Components/InputError";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import {
    User as UserIcon,
    Mail,
    Phone,
    CalendarDays,
    MapPin,
} from "lucide-react";

interface TeacherDetail {
    phone_number: string | null;
    date_of_birth: string | null;
    gender: "L" | "P" | null;
    address: string | null;
    photo: string | null;
}

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    role,
    profileDetail,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    role: "admin" | "teacher" | "student";
    profileDetail: TeacherDetail | null;
    className?: string;
}) {
    const user = usePage().props.auth.user as any;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone_number: profileDetail?.phone_number ?? "",
            date_of_birth: profileDetail?.date_of_birth ?? "",
            gender: profileDetail?.gender ?? "",
            address: profileDetail?.address ?? "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    const hasExtraFields = role === "teacher" || role === "student";

    return (
        <form onSubmit={submit} className={`space-y-5 ${className}`}>
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
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="name"
                        className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm text-[#1B1D23] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    />
                </div>
                <InputError message={errors.name} className="mt-1.5" />
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
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                        className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm text-[#1B1D23] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    />
                </div>
                <InputError message={errors.email} className="mt-1.5" />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <p className="mt-2 text-sm text-slate-600">
                        Email Anda belum terverifikasi.{" "}
                        <Link
                            href={route("verification.send")}
                            method="post"
                            as="button"
                            className="font-medium text-violet-600 hover:text-violet-700"
                        >
                            Kirim ulang email verifikasi
                        </Link>
                    </p>
                )}
            </div>

            {/* Field tambahan khusus teacher & student */}
            {hasExtraFields && (
                <>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="phone_number"
                                className="mb-1.5 block text-sm font-medium text-[#1B1D23]"
                            >
                                No. Telepon
                            </label>
                            <div className="relative">
                                <Phone
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    id="phone_number"
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                    placeholder="0812xxxxxxxx"
                                    className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm text-[#1B1D23] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                />
                            </div>
                            <InputError
                                message={errors.phone_number}
                                className="mt-1.5"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="date_of_birth"
                                className="mb-1.5 block text-sm font-medium text-[#1B1D23]"
                            >
                                Tanggal Lahir
                            </label>
                            <div className="relative">
                                <CalendarDays
                                    size={18}
                                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    id="date_of_birth"
                                    type="date"
                                    value={data.date_of_birth}
                                    onChange={(e) =>
                                        setData("date_of_birth", e.target.value)
                                    }
                                    className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm text-[#1B1D23] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                />
                            </div>
                            <InputError
                                message={errors.date_of_birth}
                                className="mt-1.5"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-[#1B1D23]">
                            Jenis Kelamin
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={data.gender === "L"}
                                    onChange={() => setData("gender", "L")}
                                    className="h-4 w-4 text-violet-600 focus:ring-violet-500/30"
                                />
                                Laki-laki
                            </label>
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={data.gender === "P"}
                                    onChange={() => setData("gender", "P")}
                                    className="h-4 w-4 text-violet-600 focus:ring-violet-500/30"
                                />
                                Perempuan
                            </label>
                        </div>
                        <InputError
                            message={errors.gender}
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="address"
                            className="mb-1.5 block text-sm font-medium text-[#1B1D23]"
                        >
                            Alamat
                        </label>
                        <div className="relative">
                            <MapPin
                                size={18}
                                className="pointer-events-none absolute left-3.5 top-3 text-slate-400"
                            />
                            <textarea
                                id="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                rows={3}
                                placeholder="Alamat lengkap"
                                className="w-full rounded-lg border border-black/10 bg-white py-2.5 pl-10 pr-3 text-sm text-[#1B1D23] focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                            />
                        </div>
                        <InputError
                            message={errors.address}
                            className="mt-1.5"
                        />
                    </div>
                </>
            )}

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
