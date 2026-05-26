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
  return (
    <div className="flex items-center justify-between gap-3 rounded-full border border-[#efefef] bg-white px-2 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted transition hover:bg-[#f4f4f4]"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-5 text-center text-sm font-semibold">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted transition hover:bg-[#f4f4f4]"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
