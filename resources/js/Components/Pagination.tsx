import { Link } from "@inertiajs/react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    links?: PaginationLink[];
    from?: number | null;
    to?: number | null;
    total?: number;
    /** Satuan item yang ditampilkan, contoh: "guru", "siswa". Default "data". */
    itemLabel?: string;
}

export default function Pagination({
    links,
    from,
    to,
    total,
    itemLabel = "data",
}: Props) {
    // Laravel selalu menyertakan tombol "Previous" & "Next" di links, jadi
    // paginasi baru perlu ditampilkan kalau ada minimal 1 nomor halaman lain.
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-black/5 pt-4 sm:flex-row">
            <p className="text-sm text-slate-500">
                {from && to && total
                    ? `Menampilkan ${from}–${to} dari ${total} ${itemLabel}`
                    : ""}
            </p>

            <nav className="inline-flex items-center gap-1">
                {links.map((link, i) => {
                    let label = link.label;

                    if (label.includes("Previous")) {
                        label = "&larr;";
                    } else if (label.includes("Next")) {
                        label = "&rarr;";
                    }

                    if (!link.url) {
                        return (
                            <span
                                key={i}
                                className="min-w-[32px] rounded px-2 py-1 text-center text-sm text-slate-300"
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={i}
                            href={link.url}
                            preserveScroll
                            className={`min-w-[32px] rounded px-2 py-1 text-center text-sm transition-colors ${
                                link.active
                                    ? "bg-violet-600 text-white"
                                    : "text-slate-600 hover:bg-black/5"
                            }`}
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                })}
            </nav>
        </div>
    );
}
