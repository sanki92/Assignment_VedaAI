"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, RefreshCw, TriangleAlert } from "lucide-react";
import { PuffLoader } from "react-spinners";
import Topbar from "@/components/layout/Topbar";
import { api, type AssignmentDetail } from "@/lib/api";
import { getSocket } from "@/lib/socket";
import type { Difficulty } from "@/lib/paper";

const difficultyChip: Record<Difficulty, string> = {
  Easy: "bg-[#e7f6ec] text-[#1f7a44]",
  Moderate: "bg-[#fdf2e0] text-[#a8650e]",
  Challenging: "bg-[#fcebe9] text-[#b4332c]",
};

export default function OutputPage() {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<AssignmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const activeRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const load = useCallback(async () => {
    try {
      const data = await api.getAssignment(id);
      if (!activeRef.current) return;
      setDetail(data);
      setNotFound(false);
      setLoading(false);
      clearTimeout(timerRef.current);
      if (data.status === "queued" || data.status === "processing") {
        timerRef.current = setTimeout(load, 3000);
      }
    } catch {
      if (!activeRef.current) return;
      setLoading(false);
      setNotFound(true);
    }
  }, [id]);

  useEffect(() => {
    activeRef.current = true;
    load();

    const socket = getSocket();
    socket.emit("assignment:subscribe", id);
    const onUpdate = () => load();
    socket.on("assignment:update", onUpdate);

    return () => {
      activeRef.current = false;
      clearTimeout(timerRef.current);
      socket.off("assignment:update", onUpdate);
      socket.emit("assignment:unsubscribe", id);
    };
  }, [id, load]);

  const regenerate = async () => {
    setDetail((d) => (d ? { ...d, status: "queued", result: null } : d));
    try {
      await api.regenerate(id);
    } finally {
      load();
    }
  };

  const downloadPdf = async () => {
    if (!detail?.result) return;
    setDownloading(true);
    try {
      const { downloadPaperPdf } = await import("@/components/output/PaperPdf");
      await downloadPaperPdf(detail.result);
    } finally {
      setDownloading(false);
    }
  };

  const paper = detail?.result;

  if (notFound) {
    return (
      <>
        <Topbar title="Create New" />
        <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f4f4f4] text-muted">
            <TriangleAlert className="h-6 w-6" />
          </span>
          <div>
            <p className="text-base font-bold lg:text-lg">Assignment not found</p>
            <p className="mt-1 text-sm text-muted">
              This assignment may have been deleted or never existed.
            </p>
          </div>
          <Link
            href="/assignments"
            className="flex items-center gap-2 rounded-full bg-[#101010] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 active:translate-y-px"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Assignments
          </Link>
        </main>
      </>
    );
  }

  const pending =
    loading ||
    !detail ||
    detail.status === "queued" ||
    detail.status === "processing";

  if (pending) {
    return (
      <>
        <Topbar title="Create New" />
        <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6">
          <PuffLoader color="#ef6820" size={72} />
          <p className="text-sm font-semibold text-muted lg:text-base">
            {loading ? "Loading assignment..." : "Generating your assignment..."}
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Topbar title="Create New" />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-8 scrollbar-thin">
        <div className="rounded-[20px] bg-[#5e5e5e] p-2 lg:rounded-[28px] lg:p-3">
          {detail?.status === "failed" ? (
            <div className="rounded-2xl bg-[#171717] px-5 py-5 text-white lg:px-7 lg:py-6">
              <p className="flex items-center gap-2 text-sm font-bold lg:text-lg">
                <TriangleAlert className="h-5 w-5" />
                Generation failed. Please try again.
              </p>
              <button
                onClick={regenerate}
                className="mt-4 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#f1f1f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:translate-y-px"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </button>
            </div>
          ) : paper ? (
            <>
              <div className="rounded-2xl bg-[#171717] px-5 py-5 text-white lg:px-7 lg:py-6">
                <p className="text-sm font-bold leading-6 lg:text-lg lg:leading-7">
                  {paper.message}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={downloadPdf}
                    disabled={downloading}
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#f1f1f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:translate-y-px disabled:opacity-60"
                  >
                    <Download className={`h-4 w-4 ${downloading ? "animate-pulse" : ""}`} />
                    {downloading ? "Preparing..." : "Download as PDF"}
                  </button>
                  <button
                    onClick={regenerate}
                    className="flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:translate-y-px"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </button>
                </div>
              </div>

              <article className="mt-2 rounded-2xl bg-white px-5 py-7 font-paper text-ink lg:mt-3 lg:px-12 lg:py-10">
                <header className="text-center">
                  <h1 className="text-[22px] font-bold leading-tight tracking-[-0.04em] lg:text-[32px]">
                    {paper.school}
                  </h1>
                  <p className="mt-2 text-base font-semibold lg:text-lg">
                    Subject: {paper.subject}
                  </p>
                  <p className="text-base font-semibold lg:text-lg">
                    Class: {paper.grade}
                  </p>
                </header>

                <div className="mt-6 flex flex-col gap-1 text-sm font-bold lg:mt-8 lg:flex-row lg:items-center lg:justify-between lg:text-base">
                  <span>Time Allowed: {paper.timeAllowed}</span>
                  <span>Maximum Marks: {paper.maxMarks}</span>
                </div>

                <p className="mt-5 text-sm font-bold lg:text-base">
                  {paper.generalInstruction}
                </p>

                <div className="mt-5 space-y-2 text-sm font-bold lg:text-base">
                  <p>Name: ________________________</p>
                  <p>Roll Number: __________________</p>
                  <p>Class: {paper.grade} Section: ____________</p>
                </div>

                {paper.sections.map((section) => (
                  <section key={section.id} className="mt-10">
                    <h2 className="text-center text-lg font-bold">
                      {section.title}
                    </h2>
                    <h3 className="mt-6 text-base font-bold">{section.heading}</h3>
                    <p className="mt-1 text-sm italic text-muted">
                      {section.instruction}
                    </p>
                    <ol className="mt-4 list-decimal space-y-4 pl-6 text-sm leading-relaxed lg:text-base">
                      {section.questions.map((q, i) => (
                        <li key={i}>
                          <span
                            className={`mr-2 inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${difficultyChip[q.difficulty]}`}
                          >
                            {q.difficulty}
                          </span>
                          {q.text}{" "}
                          <span className="font-semibold">[{q.marks} Marks]</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}

                <p className="mt-8 text-sm font-bold lg:text-base">
                  End of Assignment
                </p>

                <section className="mt-10">
                  <h2 className="text-base font-bold">Answer Key:</h2>
                  <ol className="mt-4 list-decimal space-y-4 pl-6 text-sm leading-relaxed lg:text-base">
                    {paper.answerKey.map((answer, i) => (
                      <li key={i} className="whitespace-pre-line">
                        {answer}
                      </li>
                    ))}
                  </ol>
                </section>
              </article>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
