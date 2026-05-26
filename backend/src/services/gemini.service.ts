import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";
import { logger } from "../config/logger";
import { buildPrompt } from "./prompt.service";
import { questionPaperSchema, type QuestionPaper } from "../schemas/paper.schema";
import type { CreateAssignmentInput } from "../schemas/assignment.dto";

const clients = env.GEMINI_API_KEYS.map(
  (apiKey) => new GoogleGenAI({ apiKey })
);
let cursor = 0;

function isQuotaError(err: unknown): boolean {
  const message =
    err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
  return (
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("resource_exhausted")
  );
}

const ROMAN: Record<string, number> = {
  i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6,
  vii: 7, viii: 8, ix: 9, x: 10, xi: 11, xii: 12,
};

function ordinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

function normalizeGrade(raw: string): string {
  const cleaned = raw.replace(/^(class|grade)\s+/i, "").trim();
  const roman = ROMAN[cleaned.toLowerCase()];
  if (roman) return ordinal(roman);
  const digits = cleaned.match(/\d+/);
  if (digits) return ordinal(Number(digits[0]));
  return cleaned;
}

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

async function callWithRotation(prompt: string): Promise<string> {
  let lastError: unknown;
  for (let i = 0; i < clients.length; i++) {
    const client = clients[cursor % clients.length];
    cursor = (cursor + 1) % clients.length;
    try {
      const response = await client.models.generateContent({
        model: env.GEMINI_MODEL,
        contents: prompt,
        config: { responseMimeType: "application/json", temperature: 0.7 },
      });
      return response.text ?? "";
    } catch (err) {
      lastError = err;
      if (isQuotaError(err)) {
        logger.warn("Gemini key hit quota, rotating to next key");
        continue;
      }
      throw err;
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("All Gemini keys exhausted");
}

export async function generateQuestionPaper(
  input: CreateAssignmentInput
): Promise<QuestionPaper> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const raw = await callWithRotation(buildPrompt(input, attempt > 0));
    const paper = parsePaper(raw);
    if (paper) {
      paper.grade = normalizeGrade(paper.grade);
      return paper;
    }
    logger.warn({ attempt }, "Model output failed validation, retrying");
  }
  throw new Error("Model did not return a valid question paper");
}
