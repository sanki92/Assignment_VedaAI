"use client";

import { Download } from "lucide-react";

export default function OutputHeader({ message }: { message: string }) {
  return (
    <div className="rounded-2xl bg-[#171717] px-5 py-5 text-white lg:px-7 lg:py-6">
      <p className="text-sm font-bold leading-6 lg:text-lg lg:leading-7">
        {message}
      </p>
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
