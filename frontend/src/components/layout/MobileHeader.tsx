"use client";

import { Bell, Menu } from "lucide-react";

export default function MobileHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between rounded-2xl bg-surface px-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:hidden">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg brand-gradient text-sm font-extrabold text-white">
          V
        </span>
        <span className="text-lg font-extrabold tracking-tight">VedaAI</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f4f4]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef6820]" />
        </button>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f0c27a] to-[#e0884a] text-sm">
          🧑
        </span>
        <button
          onClick={onMenu}
          className="flex h-9 w-9 items-center justify-center rounded-full"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
