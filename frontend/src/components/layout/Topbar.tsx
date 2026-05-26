"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, LayoutGrid, Bell, ChevronDown, User } from "lucide-react";

export default function Topbar({ title = "Assignment" }: { title?: string }) {
  const router = useRouter();

  return (
    <header className="hidden h-16 shrink-0 items-center justify-between rounded-2xl bg-surface px-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:flex">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition hover:bg-[#f4f4f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-muted">
          <LayoutGrid className="h-4 w-4" />
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#f4f4f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef6820]" />
        </button>
        <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-[#f4f4f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4e4e4] text-[#6b6b6b]">
            <User className="h-[18px] w-[18px]" />
          </span>
          <span className="text-sm font-semibold">John Doe</span>
          <ChevronDown className="h-4 w-4 text-muted" />
        </button>
      </div>
    </header>
  );
}
