"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { api } from "@/lib/api";

export type Assignment = {
  id: string;
  title: string;
  assignedOn: string;
  due: string;
};

export default function AssignmentCard({
  assignment,
  onDeleted,
}: {
  assignment: Assignment;
  onDeleted?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.deleteAssignment(assignment.id);
      onDeleted?.(assignment.id);
    } catch {
      setDeleting(false);
      setOpen(false);
    }
  };

  return (
    <div className="group relative rounded-2xl bg-surface px-6 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
      <div className="flex items-start justify-between">
        <Link
          href={`/assignments/${assignment.id}`}
          className="rounded-sm text-2xl font-extrabold leading-[1.2] tracking-[-0.04em] text-[#303030] underline decoration-1 underline-offset-[3px] transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          {assignment.title}
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Assignment options"
          className="-mr-2 -mt-1 flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-[#f4f4f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
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
          <div className="absolute right-5 top-12 z-20 w-52 origin-top-right animate-in fade-in zoom-in-95 rounded-2xl bg-surface p-2 shadow-[0_16px_40px_rgba(0,0,0,0.16)] duration-150">
            <Link
              href={`/assignments/${assignment.id}`}
              className="block rounded-xl px-4 py-2.5 text-[15px] font-medium text-[#303030] transition hover:bg-[#f5f5f5]"
            >
              View Assignment
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="block w-full rounded-xl px-4 py-2.5 text-left text-[15px] font-medium text-[#e5484d] transition hover:bg-[#f5f5f5] disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Delete"}
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
