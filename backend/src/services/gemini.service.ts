import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";
import { logger } from "../config/logger";
import { buildPrompt } from "./prompt.service";
import { questionPaperSchema, type QuestionPaper } from "../schemas/paper.schema";
import type { CreateAssignmentInput } from "../schemas/assignment.dto";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

function extractJson(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end !== -1) return trimmed.slice(start, end + 1);
  return trimmed;
}

function parsePaper(raw: string): QuestionPaper | null {
  try {
    const json = JSON.parse(extractJson(raw));
    const result = questionPaperSchema.safeParse(json);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

async function callModel(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: env.GEMINI_MODEL,
    contents: prompt,
    config: { responseMimeType: "application/json", temperature: 0.7 },
  });
  return response.text ?? "";
}

export async function generateQuestionPaper(
  input: CreateAssignmentInput
): Promise<QuestionPaper> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const raw = await callModel(buildPrompt(input, attempt > 0));
    const paper = parsePaper(raw);
    if (paper) return paper;
    logger.warn({ attempt }, "Model output failed validation, retrying");
  }
  throw new Error("Model did not return a valid question paper");
}
