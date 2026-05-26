"use client";

import { Download } from "lucide-react";

export default function OutputHeader({ message }: { message: string }) {
  return (
    <div className="rounded-2xl bg-[#171717] px-7 py-6 text-white">
      <p className="text-lg font-bold leading-7">{message}</p>
      <button
        onClick={() => window.print()}
        className="mt-4 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#f1f1f1]"
      >
        <Download className="h-4 w-4" />
        Download as PDF
      </button>
    </div>
  );
}
