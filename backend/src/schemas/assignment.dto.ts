import { z } from "zod";

export const questionTypeSchema = z.object({
  type: z.string().min(1).max(80),
  count: z.number().int().min(1).max(50),
  marks: z.number().int().min(1).max(100),
});

export const createAssignmentSchema = z.object({
  title: z.string().min(1).max(120).default("Quiz"),
  subject: z.string().min(1).max(80).optional(),
  grade: z.string().min(1).max(40).optional(),
  dueDate: z.string().max(40).optional(),
  instructions: z.string().max(2000).optional(),
  material: z.string().max(20000).optional(),
  questionTypes: z.array(questionTypeSchema).min(1).max(15),
});

export type QuestionTypeInput = z.infer<typeof questionTypeSchema>;
export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;
