"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Settings } from "lucide-react";
import { navItems } from "@/lib/nav";

export default function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center gap-2 px-2 pb-5 pt-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg brand-gradient text-sm font-extrabold text-white">
          V
        </span>
        <span className="text-lg font-extrabold tracking-tight">VedaAI</span>
      </div>

      <Link
        href="/assignments/create"
        onClick={onNavigate}
        className="btn-create mb-6 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
      >
        <Sparkles className="h-4 w-4" />
        Create Assignment
      </Link>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.disabled) {
            return (
              <div
                key={item.href}
                aria-disabled
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium tracking-[-0.04em] text-[#303030] opacity-40"
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="flex-1">{item.label}</span>
              </div>
            );
          }

          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium tracking-[-0.04em] transition ${
                active
                  ? "bg-[#f4f4f4] text-ink"
                  : "text-[#303030] hover:bg-[#f7f7f7]"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full brand-gradient px-1.5 text-xs font-semibold text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3 pt-6">
        <div
          aria-disabled
          className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium tracking-[-0.04em] text-[#303030] opacity-40"
        >
          <Settings className="h-[18px] w-[18px]" />
          Settings
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#f6f6f6] p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0c27a] text-base">
            🧑‍🏫
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Delhi Public School</p>
            <p className="text-xs text-muted">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </>
  );
}
