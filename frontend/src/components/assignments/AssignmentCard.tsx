"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical } from "lucide-react";

export type Assignment = {
  id: string;
  title: string;
  assignedOn: string;
  due: string;
};

export default function AssignmentCard({
  assignment,
}: {
  assignment: Assignment;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-2xl bg-surface px-6 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between">
        <h3 className="text-2xl font-extrabold leading-[1.2] tracking-[-0.04em] text-[#303030] underline decoration-1 underline-offset-[3px]">
          {assignment.title}
        </h3>
        <button
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 -mt-1 flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-[#f4f4f4]"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <>
          <button
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-5 top-12 z-20 w-52 rounded-2xl bg-surface p-2 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
            <Link
              href={`/assignments/${assignment.id}`}
              className="block rounded-xl px-4 py-2.5 text-[15px] font-medium text-[#303030] transition hover:bg-[#f5f5f5]"
            >
              View Assignment
            </Link>
            <button className="block w-full rounded-xl px-4 py-2.5 text-left text-[15px] font-medium text-[#e5484d] transition hover:bg-[#f5f5f5]">
              Delete
            </button>
          </div>
        </>
      )}

      <div className="mt-10 flex items-center justify-between text-xs">
        <p className="text-muted">
          Assigned on : <span className="font-medium text-ink">{assignment.assignedOn}</span>
        </p>
        <p className="text-muted">
          <span className="font-semibold text-ink">Due</span> : {assignment.due}
        </p>
      </div>
    </div>
  );
}
