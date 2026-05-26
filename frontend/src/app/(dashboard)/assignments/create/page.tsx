"use client";

import { useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  CalendarDays,
  X,
  Plus,
  Mic,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import Topbar from "@/components/layout/Topbar";
import MobileSubHeader from "@/components/layout/MobileSubHeader";
import Stepper from "@/components/create/Stepper";
import { useCreateStore } from "@/store/createStore";
import { extractFileText } from "@/lib/extractText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const questionTypeOptions = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Answer Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "True / False",
  "Fill in the Blanks",
];

export default function CreateAssignmentPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    dueDate,
    instructions,
    fileName,
    rows,
    errors,
    submitting,
    setDueDate,
    setInstructions,
    setFileName,
    setMaterial,
    addRow,
    removeRow,
    updateRow,
    submit,
  } = useCreateStore();

  const totalQuestions = useMemo(
    () => rows.reduce((sum, r) => sum + r.count, 0),
    [rows]
  );
  const totalMarks = useMemo(
    () => rows.reduce((sum, r) => sum + r.count * r.marks, 0),
    [rows]
  );

  const onNext = async () => {
    const id = await submit();
    if (id) router.push(`/assignments/${id}`);
  };

  return (
    <>
      <Topbar />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-6 scrollbar-thin">
        <MobileSubHeader title="Create Assignment" />
        <div className="hidden pt-1 lg:block">
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

        <div className="mx-auto mt-6 w-full max-w-4xl rounded-3xl bg-surface p-5 shadow-[0_4px_28px_rgba(0,0,0,0.05)] lg:p-10">
          <h2 className="text-xl font-bold">Assignment Details</h2>
          <p className="mt-1 text-sm text-muted">
            Basic information about your assignment
          </p>

          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.txt,image/png,image/jpeg"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setFileName(file.name);
              try {
                setMaterial(await extractFileText(file));
              } catch {
                setMaterial("");
              }
            }}
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
          <Popover>
            <PopoverTrigger
              className={`mt-2 flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-sm shadow-[0_1px_4px_rgba(0,0,0,0.05)] outline-none ${
                errors.dueDate ? "border-[#e5484d]" : "border-[#efefef]"
              }`}
            >
              <span className={dueDate ? "" : "text-faint"}>
                {dueDate ? format(dueDate, "dd-MM-yyyy") : "DD-MM-YYYY"}
              </span>
              <CalendarDays className="h-4 w-4 text-muted" />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </PopoverContent>
          </Popover>
          {errors.dueDate && (
            <p className="mt-1.5 text-xs font-medium text-[#e5484d]">
              {errors.dueDate}
            </p>
          )}

          <div className="mt-8 flex items-center gap-3 text-base font-bold">
            <span className="flex-1">Question Type</span>
            <span className="hidden w-8 lg:block" />
            <span className="hidden w-32 text-center lg:block">
              No. of Questions
            </span>
            <span className="hidden w-32 text-center lg:block">Marks</span>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            {rows.map((row) => (
              <div
                key={row.id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)] lg:flex-row lg:items-center lg:gap-3 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none"
              >
                <div className="flex items-center gap-3 lg:flex-1">
                  <Select
                    value={row.type}
                    onValueChange={(v) => updateRow(row.id, { type: v ?? row.type })}
                  >
                    <SelectTrigger className="!h-12 flex-1 rounded-xl border-[#efefef] bg-white px-4 text-sm font-medium shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypeOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-[#f4f4f4]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-2xl bg-[#f6f6f6] p-4 lg:flex lg:gap-3 lg:bg-transparent lg:p-0">
                  <div className="lg:w-32">
                    <p className="mb-2 text-center text-sm font-semibold lg:hidden">
                      No. of Questions
                    </p>
                    <Stepper
                      value={row.count}
                      min={1}
                      onChange={(v) => updateRow(row.id, { count: v })}
                    />
                  </div>
                  <div className="lg:w-32">
                    <p className="mb-2 text-center text-sm font-semibold lg:hidden">
                      Marks
                    </p>
                    <Stepper
                      value={row.marks}
                      min={1}
                      onChange={(v) => updateRow(row.id, { marks: v })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {errors.questionTypes && (
            <p className="mt-2 text-xs font-medium text-[#e5484d]">
              {errors.questionTypes}
            </p>
          )}

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
              placeholder="e.g Generate a question paper for a 3 hour assignment..."
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
            onClick={onNext}
            disabled={submitting}
            className="flex items-center gap-2 rounded-full bg-[#101010] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
          >
            {submitting ? "Generating..." : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    </>
  );
}
