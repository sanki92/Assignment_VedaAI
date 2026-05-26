"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Download, RefreshCw, Loader2, TriangleAlert } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import { api, type AssignmentDetail } from "@/lib/api";
import { getSocket } from "@/lib/socket";

export default function OutputPage() {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<AssignmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    const load = async () => {
      try {
        const data = await api.getAssignment(id);
        if (!active) return;
        setDetail(data);
        setLoading(false);
        setRegenerating(false);
        if (data.status === "queued" || data.status === "processing") {
          timer = setTimeout(load, 3000);
        }
      } catch {
        if (active) setLoading(false);
      }
    };

    load();
    const socket = getSocket();
    socket.emit("assignment:subscribe", id);
    const onUpdate = () => load();
    socket.on("assignment:update", onUpdate);

    return () => {
      active = false;
      clearTimeout(timer);
      socket.off("assignment:update", onUpdate);
      socket.emit("assignment:unsubscribe", id);
    };
  }, [id]);

  const regenerate = async () => {
    setRegenerating(true);
    await api.regenerate(id);
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
  const pending =
    !detail || detail.status === "queued" || detail.status === "processing";

  return (
    <>
      <Topbar title="Create New" />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-8 scrollbar-thin">
        <div className="rounded-[20px] bg-[#5e5e5e] p-2 lg:rounded-[28px] lg:p-3">
          {loading ? (
            <PendingBanner label="Loading assignment..." />
          ) : pending ? (
            <PendingBanner label="Generating your question paper..." />
          ) : detail?.status === "failed" ? (
            <div className="rounded-2xl bg-[#171717] px-5 py-5 text-white lg:px-7 lg:py-6">
              <p className="flex items-center gap-2 text-sm font-bold lg:text-lg">
                <TriangleAlert className="h-5 w-5" />
                Generation failed. Please try again.
              </p>
              <button
                onClick={regenerate}
                disabled={regenerating}
                className="mt-4 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#f1f1f1] disabled:opacity-60"
              >
                <RefreshCw className={`h-4 w-4 ${regenerating ? "animate-spin" : ""}`} />
                Regenerate
              </button>
            </div>
          ) : paper ? (
            <div className="rounded-2xl bg-[#171717] px-5 py-5 text-white lg:px-7 lg:py-6">
              <p className="text-sm font-bold leading-6 lg:text-lg lg:leading-7">
                {paper.message}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={downloadPdf}
                  disabled={downloading}
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#f1f1f1] disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {downloading ? "Preparing..." : "Download as PDF"}
                </button>
                <button
                  onClick={regenerate}
                  disabled={regenerating}
                  className="flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
                >
                  <RefreshCw className={`h-4 w-4 ${regenerating ? "animate-spin" : ""}`} />
                  Regenerate
                </button>
              </div>
            </div>
          ) : null}

          {paper && !pending && (
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
                  <h2 className="text-center text-lg font-bold">{section.title}</h2>
                  <h3 className="mt-6 text-base font-bold">{section.heading}</h3>
                  <p className="mt-1 text-sm italic text-muted">
                    {section.instruction}
                  </p>
                  <ol className="mt-4 list-decimal space-y-4 pl-6 text-sm leading-relaxed lg:text-base">
                    {section.questions.map((q, i) => (
                      <li key={i}>
                        [{q.difficulty}] {q.text} [{q.marks} Marks]
                      </li>
                    ))}
                  </ol>
                </section>
              ))}

              <p className="mt-8 text-sm font-bold lg:text-base">
                End of Question Paper
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
          )}
        </div>
      </main>
    </>
  );
}

function PendingBanner({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#171717] px-5 py-6 text-white lg:px-7">
      <Loader2 className="h-5 w-5 animate-spin" />
      <p className="text-sm font-bold lg:text-lg">{label}</p>
    </div>
  );
}
