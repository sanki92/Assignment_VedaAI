import Link from "next/link";
import { FileText, Search, X, Plus, Sparkles } from "lucide-react";

export default function EmptyAssignments() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8 h-44 w-56">
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f1f1f1]" />
        <div className="absolute left-8 top-3 h-24 w-20 rotate-[-6deg] rounded-md border border-[#e2e2e2] bg-white shadow-sm">
          <div className="mx-3 mt-4 h-1.5 w-10 rounded-full bg-[#cfcfcf]" />
          <div className="mx-3 mt-2 h-1.5 w-12 rounded-full bg-[#e4e4e4]" />
          <div className="mx-3 mt-2 h-1.5 w-9 rounded-full bg-[#e4e4e4]" />
        </div>
        <div className="absolute bottom-4 right-6 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-[#d9d9d9] bg-white">
          <Search className="h-8 w-8 text-[#bcbcbc]" />
          <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#e5484d] text-white">
            <X className="h-4 w-4" />
          </span>
        </div>
        <Sparkles className="absolute left-6 top-28 h-4 w-4 text-[#9ca3af]" />
        <FileText className="absolute right-2 top-2 h-3 w-3 text-[#c4c4c4]" />
      </div>

      <h2 className="text-xl font-bold">No assignments yet</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">
        Create your first assignment to start collecting and grading student
        submissions. You can set up rubrics, define marking criteria, and let AI
        assist with grading.
      </p>

      <Link
        href="/assignments/create"
        className="mt-7 flex items-center gap-2 rounded-full bg-[#101010] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
      >
        <Plus className="h-4 w-4" />
        Create Your First Assignment
      </Link>
    </div>
  );
}
