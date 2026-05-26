import type { QuestionPaper } from "@/lib/paper";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type AssignmentStatus = "queued" | "processing" | "done" | "failed";

export type QuestionTypeInput = {
  type: string;
  count: number;
  marks: number;
};

export type AssignmentSummary = {
  id: string;
  title: string;
  subject?: string;
  grade?: string;
  dueDate?: string;
  status: AssignmentStatus;
  createdAt: string;
};

export type AssignmentDetail = AssignmentSummary & {
  instructions?: string;
  questionTypes: QuestionTypeInput[];
  result: QuestionPaper | null;
  error?: string;
};

export type CreateAssignmentPayload = {
  title?: string;
  subject?: string;
  grade?: string;
  dueDate?: string;
  instructions?: string;
  questionTypes: QuestionTypeInput[];
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  listAssignments: () => request<AssignmentSummary[]>("/api/assignments"),
  getAssignment: (id: string) =>
    request<AssignmentDetail>(`/api/assignments/${id}`),
  createAssignment: (payload: CreateAssignmentPayload) =>
    request<{ id: string; status: AssignmentStatus }>("/api/assignments", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  regenerate: (id: string) =>
    request<{ id: string; status: AssignmentStatus }>(
      `/api/assignments/${id}/regenerate`,
      { method: "POST" }
    ),
};
