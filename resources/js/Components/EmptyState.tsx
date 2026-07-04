import { Inbox } from "lucide-react";
import React from "react";

interface Props {
    title: string;
    description?: string;
}

export default function EmptyState({ title, description }: Props) {
    return (
        <div className="flex flex-col items-center justify-center py-14 text-center">
            <Inbox size={40} className="mb-3 text-slate-300" />
            <p className="font-semibold text-slate-500">{title}</p>
            {description && (
                <p className="mt-1 text-xs text-slate-400">{description}</p>
            )}
        </div>
    );
}
