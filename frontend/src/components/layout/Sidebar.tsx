"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { PiSquaresFourBold } from "react-icons/pi";
import { MdCoPresent } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiBookLine } from "react-icons/ri";
import { LuChartPie } from "react-icons/lu";
import { Sparkles, Settings } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: IconType;
  badge?: number;
  disabled?: boolean;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/home", icon: PiSquaresFourBold, disabled: true },
  { label: "My Groups", href: "/groups", icon: MdCoPresent, disabled: true },
  { label: "Assignments", href: "/assignments", icon: IoDocumentTextOutline, badge: 10 },
  { label: "AI Teacher's Toolkit", href: "/toolkit", icon: RiBookLine, disabled: true },
  { label: "My Library", href: "/library", icon: LuChartPie, disabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[264px] shrink-0 flex-col rounded-2xl bg-surface p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:flex">
      <div className="flex items-center gap-2 px-2 pb-5 pt-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg brand-gradient text-sm font-extrabold text-white">
          V
        </span>
        <span className="text-lg font-extrabold tracking-tight">VedaAI</span>
      </div>

      <Link
        href="/assignments/create"
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
    </aside>
  );
}
