import Topbar from "@/components/layout/Topbar";
import OutputHeader from "@/components/output/OutputHeader";
import { samplePaper } from "@/lib/paper";

export default function OutputPage() {
  const paper = samplePaper;

  return (
    <>
      <Topbar title="Create New" />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pb-8 scrollbar-thin">
        <div className="rounded-[20px] bg-[#5e5e5e] p-2 lg:rounded-[28px] lg:p-3">
          <OutputHeader message={paper.message} />

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

            <p className="mt-8 text-base font-bold">End of Question Paper</p>

            <section className="mt-10">
              <h2 className="text-base font-bold">Answer Key:</h2>
              <ol className="mt-4 list-decimal space-y-4 pl-6 text-base leading-relaxed">
                {paper.answerKey.map((answer, i) => (
                  <li key={i} className="whitespace-pre-line">
                    {answer}
                  </li>
                ))}
              </ol>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
