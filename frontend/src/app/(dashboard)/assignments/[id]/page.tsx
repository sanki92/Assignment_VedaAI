import Topbar from "@/components/layout/Topbar";
import OutputHeader from "@/components/output/OutputHeader";
import { samplePaper } from "@/lib/paper";

export default function OutputPage() {
  const paper = samplePaper;

  return (
    <>
      <Topbar title="Create New" />
      <main className="flex flex-1 flex-col overflow-y-auto pb-8 scrollbar-thin">
        <div className="rounded-[28px] bg-[#2c2c2c] p-3">
          <OutputHeader message={paper.message} />

          <article className="mt-3 rounded-2xl bg-white px-12 py-10 text-ink">
            <header className="text-center">
              <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em]">
                {paper.school}
              </h1>
              <p className="mt-2 text-lg font-bold">Subject: {paper.subject}</p>
              <p className="text-lg font-bold">Class: {paper.grade}</p>
            </header>

            <div className="mt-8 flex items-center justify-between text-base font-bold">
              <span>Time Allowed: {paper.timeAllowed}</span>
              <span>Maximum Marks: {paper.maxMarks}</span>
            </div>

            <p className="mt-5 text-base font-bold">{paper.generalInstruction}</p>

            <div className="mt-5 space-y-2 text-base font-bold">
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
                <ol className="mt-4 list-decimal space-y-4 pl-6 text-base leading-relaxed">
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
