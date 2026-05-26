"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  CalendarDays,
  ChevronDown,
  X,
  Plus,
  Mic,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import Stepper from "@/components/create/Stepper";

const questionTypeOptions = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Answer Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "True / False",
  "Fill in the Blanks",
];

type Row = {
  id: number;
  type: string;
  count: number;
  marks: number;
};

let rowId = 4;

export default function CreateAssignmentPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState("");
  const [instructions, setInstructions] = useState("");
  const [rows, setRows] = useState<Row[]>([
    { id: 1, type: "Multiple Choice Questions", count: 4, marks: 1 },
    { id: 2, type: "Short Questions", count: 3, marks: 2 },
    { id: 3, type: "Diagram/Graph-Based Questions", count: 5, marks: 5 },
    { id: 4, type: "Numerical Problems", count: 5, marks: 5 },
  ]);

  const totalQuestions = useMemo(
    () => rows.reduce((sum, r) => sum + r.count, 0),
    [rows]
  );
  const totalMarks = useMemo(
    () => rows.reduce((sum, r) => sum + r.count * r.marks, 0),
    [rows]
  );

  const updateRow = (id: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const removeRow = (id: number) =>
    setRows((prev) => prev.filter((r) => r.id !== id));

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      { id: ++rowId, type: questionTypeOptions[0], count: 1, marks: 1 },
    ]);

  return (
    <>
      <Topbar />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-6 scrollbar-thin">
        <div className="pt-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] ring-4 ring-[#22c55e]/15" />
            <h1 className="text-2xl font-bold">Create Assignment</h1>
          </div>
          <p className="mt-1 text-sm text-muted">
            Set up a new assignment for your students
          </p>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-4xl gap-3">
          <span className="h-1.5 flex-1 rounded-full bg-[#101010]" />
          <span className="h-1.5 flex-1 rounded-full bg-[#dcdcdc]" />
        </div>

        <div className="mx-auto mt-6 w-full max-w-4xl rounded-3xl bg-surface p-10 shadow-[0_4px_28px_rgba(0,0,0,0.05)]">
          <h2 className="text-xl font-bold">Assignment Details</h2>
          <p className="mt-1 text-sm text-muted">
            Basic information about your assignment
          </p>

          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.txt,image/png,image/jpeg"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-6 flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-[#d8d8d8] px-6 py-14 text-center transition hover:border-brand/60"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full text-ink">
              <UploadCloud className="h-7 w-7" />
            </span>
            <span className="mt-3 text-base font-bold">
              {fileName ?? "Choose a file or drag & drop it here"}
            </span>
            <span className="mt-1 text-xs text-faint">JPEG, PNG, upto 10MB</span>
            <span className="mt-5 rounded-full border border-line bg-white px-5 py-2.5 text-xs font-semibold shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
              Browse Files
            </span>
          </button>
          <p className="mt-4 text-center text-sm text-muted">
            Upload images of your preferred document/image
          </p>

          <label className="mt-8 block text-base font-bold">Due Date</label>
          <div className="mt-2 flex items-center justify-between rounded-xl border border-[#efefef] bg-white px-4 py-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="DD-MM-YYYY"
              className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
            />
            <CalendarDays className="h-4 w-4 text-muted" />
          </div>

          <div className="mt-8 flex items-center gap-3 text-base font-bold">
            <span className="flex-1">Question Type</span>
            <span className="w-8" />
            <span className="hidden w-32 text-center sm:block">
              No. of Questions
            </span>
            <span className="hidden w-32 text-center sm:block">Marks</span>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            {rows.map((row) => (
              <div key={row.id} className="flex items-center gap-3">
                <div className="relative flex-1">
                  <select
                    value={row.type}
                    onChange={(e) => updateRow(row.id, { type: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-[#efefef] bg-white px-4 py-3.5 pr-9 text-sm font-medium shadow-[0_1px_4px_rgba(0,0,0,0.05)] outline-none"
                  >
                    {questionTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-[#f4f4f4]"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="w-32">
                  <Stepper
                    value={row.count}
                    min={1}
                    onChange={(v) => updateRow(row.id, { count: v })}
                  />
                </div>
                <div className="w-32">
                  <Stepper
                    value={row.marks}
                    min={1}
                    onChange={(v) => updateRow(row.id, { marks: v })}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addRow}
            className="mt-4 flex items-center gap-2 text-sm font-semibold"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#101010] text-white">
              <Plus className="h-4 w-4" />
            </span>
            Add Question Type
          </button>

          <div className="mt-6 flex flex-col items-end gap-1 text-base font-bold">
            <p>
              Total Questions : <span>{totalQuestions}</span>
            </p>
            <p>
              Total Marks : <span>{totalMarks}</span>
            </p>
          </div>

          <label className="mt-8 block text-base font-bold">
            Additional Information (For better output)
          </label>
          <div className="relative mt-2">
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              className="w-full resize-none rounded-xl border border-[#efefef] bg-white px-4 py-3.5 pr-11 text-sm shadow-[0_1px_4px_rgba(0,0,0,0.05)] outline-none placeholder:text-faint"
            />
            <button className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-[#f4f4f4]">
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-4xl items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold transition hover:bg-[#f7f7f7]"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            onClick={() => router.push("/assignments/1")}
            className="flex items-center gap-2 rounded-full bg-[#101010] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </>
  );
}
