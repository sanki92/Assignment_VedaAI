"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, LayoutGrid, Bell, ChevronDown } from "lucide-react";

export default function Topbar({ title = "Assignment" }: { title?: string }) {
  const router = useRouter();

  return (
    <header className="flex h-16 items-center justify-between rounded-2xl bg-surface px-5">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition hover:bg-[#f4f4f4]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-muted">
          <LayoutGrid className="h-4 w-4" />
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#f4f4f4]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef6820]" />
        </button>
        <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-[#f4f4f4]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#f0c27a] to-[#e0884a] text-sm">
            🧑
          </span>
          <span className="text-sm font-semibold">John Doe</span>
          <ChevronDown className="h-4 w-4 text-muted" />
        </button>
      </div>
    </header>
  );
}
