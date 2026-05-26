import { Bell, Menu, User } from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between rounded-2xl bg-surface px-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:hidden">
      <div className="flex items-center gap-2">
        <img
          src="/image/logo.png"
          alt="VedaAI"
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-extrabold tracking-[-0.05em]">VedaAI</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f4f4]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#ef6820]" />
        </button>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4e4e4] text-[#6b6b6b]">
          <User className="h-5 w-5" />
        </span>
        <button
          aria-disabled
          className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full text-ink opacity-40"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
