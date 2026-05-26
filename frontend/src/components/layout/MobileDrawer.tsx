"use client";

import SidebarContent from "@/components/layout/SidebarContent";

export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div className={`lg:hidden ${open ? "" : "pointer-events-none"}`}>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-surface p-4 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onNavigate={onClose} />
      </div>
    </div>
  );
}
