import Topbar from "@/components/layout/Topbar";
import OutputHeader from "@/components/output/OutputHeader";
import { samplePaper, type Difficulty } from "@/lib/paper";

const difficultyColor: Record<Difficulty, string> = {
  Easy: "text-[#16a34a]",
  Moderate: "text-[#d97706]",
  Challenging: "text-[#dc2626]",
};

export default function OutputPage() {
  const paper = samplePaper;

  return (
    <>
      <Topbar title="Create New" />
      <main className="flex flex-1 flex-col overflow-y-auto px-2 pb-8 scrollbar-thin">
        <div className="mx-auto w-full max-w-3xl pt-4">
          <OutputHeader message={paper.message} />

          <article className="mt-4 rounded-2xl bg-surface px-10 py-9 text-[#1b1b1b] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <header className="text-center">
              <h1 className="text-xl font-bold">{paper.school}</h1>
              <p className="mt-1 font-semibold">Subject: {paper.subject}</p>
              <p className="font-semibold">Class: {paper.grade}</p>
            </header>

            <div className="mt-6 flex items-center justify-between text-sm font-medium">
              <span>Time Allowed: {paper.timeAllowed}</span>
              <span>Maximum Marks: {paper.maxMarks}</span>
            </div>

            <p className="mt-4 text-sm font-medium">{paper.generalInstruction}</p>

            <div className="mt-5 space-y-2 text-sm">
              <p>
                Name:{" "}
                <span className="inline-block w-48 border-b border-[#9ca3af] align-bottom" />
              </p>
              <p>
                Roll Number:{" "}
                <span className="inline-block w-40 border-b border-[#9ca3af] align-bottom" />
              </p>
              <p>
                Class: {paper.grade} Section:{" "}
                <span className="inline-block w-28 border-b border-[#9ca3af] align-bottom" />
              </p>
            </div>

            {paper.sections.map((section) => (
              <section key={section.id} className="mt-8">
                <h2 className="text-center text-base font-bold">{section.title}</h2>
                <h3 className="mt-4 text-sm font-semibold">{section.heading}</h3>
                <p className="mt-1 text-sm italic text-muted">
                  {section.instruction}
                </p>
                <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed">
                  {section.questions.map((q, i) => (
                    <li key={i}>
                      <span className={`font-semibold ${difficultyColor[q.difficulty]}`}>
                        [{q.difficulty}]
                      </span>{" "}
                      {q.text}{" "}
                      <span className="text-muted">[{q.marks} Marks]</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}

            <p className="mt-6 text-sm font-bold">End of Question Paper</p>

            <section className="mt-8">
              <h2 className="text-sm font-bold">Answer Key:</h2>
              <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed">
                {paper.answerKey.map((answer, i) => (
                  <li key={i}>{answer}</li>
                ))}
              </ol>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
