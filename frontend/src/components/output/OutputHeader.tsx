"use client";

import { useRouter } from "next/navigation";
import { Download, X } from "lucide-react";

export default function OutputHeader({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div className="relative">
      <button
        onClick={() => router.push("/assignments")}
        className="absolute -top-3 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-[#101010] text-white shadow-md"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="rounded-2xl bg-[#101010] px-6 pb-5 pt-7 text-white">
        <p className="text-sm leading-6">{message}</p>
        <button
          onClick={() => window.print()}
          className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[#f1f1f1]"
        >
          <Download className="h-4 w-4" />
          Download as PDF
        </button>
      </div>
    </div>
  );
}
