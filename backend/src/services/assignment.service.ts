import { isValidObjectId } from "mongoose";
import { Assignment } from "../models/assignment.model";
import type { CreateAssignmentInput } from "../schemas/assignment.dto";
import type { QuestionPaper } from "../schemas/paper.schema";
import { hashInput } from "./cache.service";

export async function createAssignment(input: CreateAssignmentInput) {
  const inputHash = hashInput(input);
  return Assignment.create({ ...input, inputHash, status: "queued" });
}

export async function getAssignment(id: string) {
  if (!isValidObjectId(id)) return null;
  return Assignment.findById(id).lean();
}

export async function markProcessing(id: string) {
  return Assignment.findByIdAndUpdate(id, {
    status: "processing",
    error: undefined,
  });
}

export async function markDone(id: string, result: QuestionPaper) {
  return Assignment.findByIdAndUpdate(id, { status: "done", result });
}

export async function markFailed(id: string, error: string) {
  return Assignment.findByIdAndUpdate(id, { status: "failed", error });
}

export async function resetForRegeneration(id: string) {
  return Assignment.findByIdAndUpdate(id, {
    status: "queued",
    result: null,
    error: undefined,
  });
}
