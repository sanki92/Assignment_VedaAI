"use client";

import { Minus, Plus } from "lucide-react";

export default function Stepper({
  value,
  onChange,
  min = 0,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
}) {
  const atMin = value <= min;

  return (
    <div className="flex items-center justify-between gap-3 rounded-full border border-[#efefef] bg-white px-2 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition focus-within:border-brand/40">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={atMin}
        aria-label="Decrease"
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted transition hover:bg-[#f4f4f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 active:scale-95 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-5 text-center text-sm font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase"
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted transition hover:bg-[#f4f4f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 active:scale-95"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
