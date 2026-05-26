import { Schema, model, type InferSchemaType } from "mongoose";

const questionTypeSchema = new Schema(
  {
    type: { type: String, required: true },
    count: { type: Number, required: true },
    marks: { type: Number, required: true },
  },
  { _id: false }
);

const assignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String },
    grade: { type: String },
    dueDate: { type: String },
    instructions: { type: String },
    material: { type: String },
    questionTypes: { type: [questionTypeSchema], required: true },
    inputHash: { type: String, index: true },
    status: {
      type: String,
      enum: ["queued", "processing", "done", "failed"],
      default: "queued",
      index: true,
    },
    result: { type: Schema.Types.Mixed, default: null },
    error: { type: String },
  },
  { timestamps: true }
);

export type AssignmentDoc = InferSchemaType<typeof assignmentSchema>;

export const Assignment = model("Assignment", assignmentSchema);
