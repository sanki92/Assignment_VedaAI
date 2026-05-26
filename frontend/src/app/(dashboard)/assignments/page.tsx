import Link from "next/link";
import { Filter, Search, Plus } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import MobileSubHeader from "@/components/layout/MobileSubHeader";
import AssignmentCard, {
  type Assignment,
} from "@/components/assignments/AssignmentCard";
import EmptyAssignments from "@/components/assignments/EmptyAssignments";

const assignments: Assignment[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  title: "Quiz on Electricity",
  assignedOn: "20-06-2025",
  due: "21-06-2025",
}));

export default function AssignmentsPage() {
  return (
    <>
      <Topbar />
      {assignments.length === 0 ? (
        <main className="relative flex min-h-0 flex-1">
          <EmptyAssignments />
          <Link
            href="/assignments/create"
            className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] lg:hidden"
          >
            <Plus className="h-6 w-6 text-[#ef6820]" />
          </Link>
        </main>
      ) : (
        <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <MobileSubHeader title="Assignments" />
          <div className="flex flex-1 flex-col overflow-y-auto px-2 pb-28 scrollbar-thin">
            <div className="hidden pt-1 lg:block">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] ring-4 ring-[#22c55e]/15" />
                <h1 className="text-2xl font-bold">Assignments</h1>
              </div>
              <p className="mt-1 text-sm text-muted">
                Manage and create assignments for your classes.
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-surface px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] lg:mt-5">
              <button className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <div className="flex w-full items-center gap-2 rounded-full border border-line px-4 py-2 lg:w-72">
                <Search className="h-4 w-4 text-faint" />
                <input
                  placeholder="Search Assignment"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {assignments.map((a) => (
                <AssignmentCard key={a.id} assignment={a} />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center lg:flex">
            <Link
              href="/assignments/create"
              className="pointer-events-auto flex items-center gap-2 rounded-full bg-[#101010] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:bg-black"
            >
              <Plus className="h-4 w-4" />
              Create Assignment
            </Link>
          </div>

          <Link
            href="/assignments/create"
            className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] lg:hidden"
          >
            <Plus className="h-6 w-6 text-[#ef6820]" />
          </Link>
        </main>
      )}
    </>
  );
}
