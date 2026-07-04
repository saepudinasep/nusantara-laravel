import SidebarLayout, { SidebarMenuItem } from "@/Layouts/SidebarLayout";
import { Head, usePage } from "@inertiajs/react";
import { LayoutDashboard, UserCog } from "lucide-react";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";
import { User } from "@/types";

interface TeacherDetail {
    phone_number: string | null;
    date_of_birth: string | null;
    gender: "L" | "P" | null;
    address: string | null;
    photo: string | null;
}

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
    profileDetail: TeacherDetail | null;
}

export default function Edit({
    mustVerifyEmail,
    status,
    profileDetail,
}: Props) {
    const { auth } = usePage<{ auth: { user: User } }>().props;

    const roleKey = auth.user.roles?.[0]?.name as
        | "admin"
        | "teacher"
        | "student";

    const dashboardRoute: Record<string, string> = {
        admin: "admin.dashboard",
        teacher: "teacher.dashboard",
        student: "student.dashboard",
    };

    const menus: SidebarMenuItem[] = [
        {
            label: "Dashboard",
            href: route(dashboardRoute[roleKey] ?? "dashboard"),
            icon: <LayoutDashboard size={18} />,
        },
        {
            label: "Profil",
            href: route("profile.edit"),
            icon: <UserCog size={18} />,
            active: true,
        },
    ];

    return (
        <SidebarLayout role={roleKey} pageTitle="Profil Saya" menus={menus}>
            <Head title="Profil" />

            <div className="space-y-6">
                <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
                    <h2 className="text-base font-semibold text-[#1B1D23]">
                        Informasi Profil
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Perbarui data akun dan informasi pribadi Anda.
                    </p>

                    <div className="mt-6">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            role={roleKey}
                            profileDetail={profileDetail}
                            className="max-w-xl"
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
                    <h2 className="text-base font-semibold text-[#1B1D23]">
                        Ubah Password
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Gunakan password yang panjang dan unik untuk keamanan
                        akun.
                    </p>

                    <div className="mt-6">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>

                <div className="rounded-xl border border-red-200 bg-red-50/40 p-6 shadow-sm">
                    <h2 className="text-base font-semibold text-red-700">
                        Hapus Akun
                    </h2>
                    <p className="mt-1 text-sm text-red-600/80">
                        Setelah akun dihapus, seluruh data terkait akan hilang
                        permanen. Pastikan Anda sudah mengunduh data penting
                        sebelum melanjutkan.
                    </p>

                    <div className="mt-6">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
