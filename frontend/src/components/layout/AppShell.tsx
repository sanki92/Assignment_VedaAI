"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileDrawer from "@/components/layout/MobileDrawer";
import BottomNav from "@/components/layout/BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen gap-3 overflow-hidden bg-gradient-to-b from-[#eeeeee] to-[#dadada] p-3">
      <Sidebar />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
        <MobileHeader onMenu={() => setDrawerOpen(true)} />
        <div className="flex min-h-0 flex-1 flex-col gap-3">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
