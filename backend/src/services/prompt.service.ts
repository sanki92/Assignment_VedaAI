import type { CreateAssignmentInput } from "../schemas/assignment.dto";

const SCHOOL = "Delhi Public School, Sector-4, Bokaro";

export function buildPrompt(input: CreateAssignmentInput, retry = false): string {
  const totalMarks = input.questionTypes.reduce(
    (sum, q) => sum + q.count * q.marks,
    0
  );
  const totalQuestions = input.questionTypes.reduce(
    (sum, q) => sum + q.count,
    0
  );
  const breakdown = input.questionTypes
    .map((q) => `- ${q.count} x "${q.type}" worth ${q.marks} marks each`)
    .join("\n");

  const material = input.material?.trim()
    ? `\nBase the questions strictly on this source material provided by the teacher:\n"""\n${input.material.trim().slice(0, 8000)}\n"""\n`
    : "";

  const strictness = retry
    ? "\nYour previous response was not valid JSON. Respond with ONLY the JSON object, starting with { and ending with }."
    : "";

  return `You are an expert assignment paper setter for Indian CBSE schools.
Generate a complete question paper as STRICT JSON.

Context:
- School: ${SCHOOL}
- Subject: ${input.subject ?? "infer a suitable subject from the material and instructions"}
- Class/Grade: ${input.grade ?? "infer a suitable grade from the material and instructions"}
- Total questions: ${totalQuestions}
- Total marks: ${totalMarks}
${input.dueDate ? `- Due date: ${input.dueDate}` : ""}
${input.instructions ? `Teacher instructions: ${input.instructions}` : ""}
${material}
Question type breakdown:
${breakdown}

Rules:
- Group questions into sections (Section A, Section B, ...), one section per question type in the given order.
- Each section: id ("A", "B", ...), title ("Section A"), heading (a label for the question type), instruction (e.g. "Attempt all questions. Each question carries N marks"), and the questions.
- Each question: difficulty ("Easy" | "Moderate" | "Challenging"), text, marks. Use a balanced mix of difficulties.
- For Multiple Choice Questions, include the options (a) to (d) inside the question text.
- maxMarks must equal ${totalMarks}.
- grade: the class as an ordinal using Arabic numerals only, e.g. "8th" or "10th". Never use Roman numerals and never include the word "Class".
- timeAllowed: a sensible duration string based on total marks unless the instructions specify one.
- generalInstruction: a short line such as "All questions are compulsory unless stated otherwise.".
- title: a short descriptive paper title (3 to 6 words), e.g. "Class 8 Science - Force and Pressure".
- message: a one-line friendly intro to the paper.
- answerKey: concise model answers, one per question, in the same order questions appear across all sections.

Return ONLY a JSON object with this exact shape, no markdown, no commentary:
{
  "title": string,
  "message": string,
  "school": string,
  "subject": string,
  "grade": string,
  "timeAllowed": string,
  "maxMarks": number,
  "generalInstruction": string,
  "sections": [{ "id": string, "title": string, "heading": string, "instruction": string, "questions": [{ "difficulty": "Easy"|"Moderate"|"Challenging", "text": string, "marks": number }] }],
  "answerKey": string[]
}${strictness}`;
}
