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
    <div className="relative rounded-2xl border border-line bg-surface px-6 py-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-bold underline decoration-1 underline-offset-[3px]">
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
          <div className="absolute right-5 top-12 z-20 w-44 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
            <Link
              href={`/assignments/${assignment.id}`}
              className="block px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-[#f7f7f7]"
            >
              View Assignment
            </Link>
            <button className="block w-full px-4 py-2.5 text-left text-sm font-medium text-[#e5484d] transition hover:bg-[#fdf2f2]">
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
