"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function MobileSubHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="relative flex h-12 items-center lg:hidden">
      <button
        onClick={() => router.back()}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e4e4e4] text-ink"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold">
        {title}
      </h1>
    </div>
  );
}
