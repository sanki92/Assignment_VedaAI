import { Queue } from "bullmq";
import { createRedisConnection } from "../config/redis";

export const GENERATION_QUEUE = "generation";

export type GenerationJobData = { assignmentId: string };

export const generationQueue = new Queue<GenerationJobData>(GENERATION_QUEUE, {
  connection: createRedisConnection(),
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: "exponential", delay: 3000 },
    removeOnComplete: 50,
    removeOnFail: 100,
  },
});

export async function enqueueGeneration(assignmentId: string) {
  return generationQueue.add("generate", { assignmentId });
}
