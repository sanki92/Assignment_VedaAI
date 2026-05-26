import { Worker } from "bullmq";
import { createRedisConnection } from "../config/redis";
import { GENERATION_QUEUE, type GenerationJobData } from "../queues/generation.queue";
import { Assignment } from "../models/assignment.model";
import { generateQuestionPaper } from "../services/gemini.service";
import {
  markProcessing,
  markDone,
  markFailed,
} from "../services/assignment.service";
import { getCachedPaper, setCachedPaper } from "../services/cache.service";
import { emitAssignmentUpdate } from "../ws/socket";
import { logger } from "../config/logger";
import type { CreateAssignmentInput } from "../schemas/assignment.dto";

export function startGenerationWorker(): Worker<GenerationJobData> {
  const worker = new Worker<GenerationJobData>(
    GENERATION_QUEUE,
    async (job) => {
      const { assignmentId } = job.data;
      const doc = await Assignment.findById(assignmentId).lean();
      if (!doc) throw new Error(`Assignment ${assignmentId} not found`);

      await markProcessing(assignmentId);
      emitAssignmentUpdate(assignmentId, { status: "processing" });

      const input: CreateAssignmentInput = {
        title: doc.title,
        subject: doc.subject ?? undefined,
        grade: doc.grade ?? undefined,
        dueDate: doc.dueDate ?? undefined,
        instructions: doc.instructions ?? undefined,
        questionTypes: doc.questionTypes as CreateAssignmentInput["questionTypes"],
      };

      let paper = doc.inputHash ? await getCachedPaper(doc.inputHash) : null;
      if (!paper) {
        paper = await generateQuestionPaper(input);
        if (doc.inputHash) await setCachedPaper(doc.inputHash, paper);
      }

      await markDone(assignmentId, paper);
      emitAssignmentUpdate(assignmentId, { status: "done", result: paper });
    },
    { connection: createRedisConnection(), concurrency: 3 }
  );

  worker.on("completed", (job) =>
    logger.info({ jobId: job.id }, "Generation job completed")
  );

  worker.on("failed", async (job, err) => {
    logger.error({ jobId: job?.id, err: err.message }, "Generation job failed");
    if (!job) return;
    const attemptsLimit = job.opts.attempts ?? 1;
    if (job.attemptsMade >= attemptsLimit) {
      await markFailed(job.data.assignmentId, err.message);
      emitAssignmentUpdate(job.data.assignmentId, {
        status: "failed",
        error: err.message,
      });
    }
  });

  logger.info("Generation worker started");
  return worker;
}
