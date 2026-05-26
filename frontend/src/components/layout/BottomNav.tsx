"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { HiSquares2X2 } from "react-icons/hi2";
import { HiCalendar } from "react-icons/hi";
import { BiSolidFilePlus } from "react-icons/bi";
import { RiSparkling2Line } from "react-icons/ri";

type Tab = {
  label: string;
  href: string;
  icon: IconType;
  disabled?: boolean;
};

const tabs: Tab[] = [
  { label: "Home", href: "/home", icon: HiSquares2X2, disabled: true },
  { label: "Assignments", href: "/assignments", icon: HiCalendar },
  { label: "Library", href: "/library", icon: BiSolidFilePlus, disabled: true },
  { label: "AI Toolkit", href: "/toolkit", icon: RiSparkling2Line, disabled: true },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="shrink-0 lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between rounded-2xl bg-[#161616] px-2 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = !tab.disabled && pathname.startsWith(tab.href);

          const content = (
            <span className="flex flex-1 flex-col items-center gap-1">
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </span>
          );

          if (tab.disabled) {
            return (
              <div
                key={tab.href}
                aria-disabled
                className="flex flex-1 cursor-not-allowed flex-col items-center text-[#6b6b6b]"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-1 flex-col items-center ${
                active ? "text-white" : "text-[#6b6b6b]"
              }`}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
