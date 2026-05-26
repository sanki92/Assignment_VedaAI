import Link from "next/link";
import { Plus } from "lucide-react";

export default function EmptyAssignments() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <img
        src="/image/Illustrations.svg"
        alt=""
        width={300}
        height={300}
        className="mb-6 h-auto w-[300px]"
      />

      <h2 className="text-xl font-bold">No assignments yet</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">
        Create your first assignment to start collecting and grading student
        submissions. You can set up rubrics, define marking criteria, and let AI
        assist with grading.
      </p>

      <Link
        href="/assignments/create"
        className="mt-7 flex items-center gap-2 rounded-full bg-[#101010] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 active:translate-y-px"
      >
        <Plus className="h-4 w-4" />
        Create Your First Assignment
      </Link>
    </div>
  );
}
