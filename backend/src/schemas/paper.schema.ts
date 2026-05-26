import { z } from "zod";

export const difficultySchema = z.enum(["Easy", "Moderate", "Challenging"]);

export const questionSchema = z.object({
  difficulty: difficultySchema,
  text: z.string().min(1),
  marks: z.number().int().positive(),
});

export const sectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  heading: z.string().min(1),
  instruction: z.string().min(1),
  questions: z.array(questionSchema).min(1),
});

export const questionPaperSchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  school: z.string().min(1),
  subject: z.string().min(1),
  grade: z.string().min(1),
  timeAllowed: z.string().min(1),
  maxMarks: z.number().int().positive(),
  generalInstruction: z.string().min(1),
  sections: z.array(sectionSchema).min(1),
  answerKey: z.array(z.string()),
});

export type Difficulty = z.infer<typeof difficultySchema>;
export type Question = z.infer<typeof questionSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type QuestionPaper = z.infer<typeof questionPaperSchema>;
