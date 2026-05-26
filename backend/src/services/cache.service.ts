import crypto from "crypto";
import { redis } from "../config/redis";
import { questionPaperSchema, type QuestionPaper } from "../schemas/paper.schema";
import type { CreateAssignmentInput } from "../schemas/assignment.dto";

const TTL_SECONDS = 60 * 60 * 24;
const cacheKey = (hash: string) => `paper:${hash}`;

export function hashInput(input: CreateAssignmentInput): string {
  const normalized = JSON.stringify({
    subject: input.subject ?? "",
    grade: input.grade ?? "",
    instructions: input.instructions ?? "",
    questionTypes: input.questionTypes,
  });
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export async function getCachedPaper(
  hash: string
): Promise<QuestionPaper | null> {
  const cached = await redis.get(cacheKey(hash));
  if (!cached) return null;
  try {
    const parsed = questionPaperSchema.safeParse(JSON.parse(cached));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function setCachedPaper(
  hash: string,
  paper: QuestionPaper
): Promise<void> {
  await redis.set(cacheKey(hash), JSON.stringify(paper), "EX", TTL_SECONDS);
}
