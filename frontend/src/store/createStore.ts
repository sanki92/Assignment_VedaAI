import { create } from "zustand";
import { format } from "date-fns";
import { api } from "@/lib/api";
import { useAssignmentsCount } from "@/store/countStore";

export type QuestionRow = {
  id: number;
  type: string;
  count: number;
  marks: number;
};

type Errors = {
  dueDate?: string;
  questionTypes?: string;
};

type CreateState = {
  dueDate?: Date;
  instructions: string;
  fileName: string | null;
  material: string;
  rows: QuestionRow[];
  submitting: boolean;
  errors: Errors;
  nextId: number;
  setDueDate: (date?: Date) => void;
  setInstructions: (value: string) => void;
  setFileName: (name: string | null) => void;
  setMaterial: (value: string) => void;
  addRow: () => void;
  removeRow: (id: number) => void;
  updateRow: (id: number, patch: Partial<QuestionRow>) => void;
  loadExample: () => void;
  validate: () => boolean;
  submit: () => Promise<string | null>;
  reset: () => void;
};

const initialRows: QuestionRow[] = [
  { id: 1, type: "Multiple Choice Questions", count: 4, marks: 1 },
  { id: 2, type: "Short Questions", count: 3, marks: 2 },
  { id: 3, type: "Diagram/Graph-Based Questions", count: 5, marks: 5 },
  { id: 4, type: "Numerical Problems", count: 5, marks: 5 },
];

const exampleRows: QuestionRow[] = [
  { id: 1, type: "Multiple Choice Questions", count: 5, marks: 1 },
  { id: 2, type: "Fill in the Blanks", count: 4, marks: 1 },
  { id: 3, type: "Short Questions", count: 4, marks: 3 },
  { id: 4, type: "Long Answer Questions", count: 2, marks: 5 },
];

const exampleMaterial = `Chapter 6: Life Processes (Class 10 Science)

All living organisms carry out a set of basic functions called life processes. The main life processes are nutrition, respiration, transportation, and excretion.

Nutrition: Autotrophs such as green plants prepare their own food through photosynthesis using carbon dioxide, water, sunlight, and chlorophyll. Heterotrophs depend on other organisms for food. Photosynthesis takes place mainly in the chloroplasts of leaf cells and produces glucose and oxygen.

Respiration: The breakdown of glucose to release energy occurs in the mitochondria. Aerobic respiration uses oxygen and releases more energy, while anaerobic respiration occurs in the absence of oxygen and produces lactic acid in muscles or ethanol in yeast.

Transportation: In humans, the heart pumps blood through arteries, veins, and capillaries. The blood carries oxygen, carbon dioxide, nutrients, and waste. In plants, xylem transports water and minerals upward while phloem transports food made in the leaves to other parts.

Excretion: The kidneys filter waste such as urea from the blood to form urine. In plants, waste products may be stored in leaves or removed as gases through stomata.`;

const exampleInstructions =
  "Prepare a one hour class test for Class 10 students on the chapter Life Processes. Keep the language simple, cover photosynthesis, respiration, transportation, and excretion, and arrange questions from easy to hard.";

export const useCreateStore = create<CreateState>((set, get) => ({
  dueDate: undefined,
  instructions: "",
  fileName: null,
  material: "",
  rows: initialRows,
  submitting: false,
  errors: {},
  nextId: 5,

  setDueDate: (date) =>
    set((s) => ({ dueDate: date, errors: { ...s.errors, dueDate: undefined } })),
  setInstructions: (value) => set({ instructions: value }),
  setFileName: (name) => set({ fileName: name }),
  setMaterial: (value) => set({ material: value }),

  addRow: () =>
    set((s) => ({
      rows: [
        ...s.rows,
        { id: s.nextId, type: "Multiple Choice Questions", count: 1, marks: 1 },
      ],
      nextId: s.nextId + 1,
    })),

  removeRow: (id) => set((s) => ({ rows: s.rows.filter((r) => r.id !== id) })),

  loadExample: () =>
    set({
      instructions: exampleInstructions,
      fileName: "life-processes-class10.txt",
      material: exampleMaterial,
      rows: exampleRows.map((r) => ({ ...r })),
      errors: {},
      nextId: exampleRows.length + 1,
    }),

  updateRow: (id, patch) =>
    set((s) => ({
      rows: s.rows.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    })),

  validate: () => {
    const { dueDate, rows } = get();
    const errors: Errors = {};
    if (!dueDate) errors.dueDate = "Please select a due date";
    if (rows.length === 0) errors.questionTypes = "Add at least one question type";
    if (rows.some((r) => r.count < 1 || r.marks < 1))
      errors.questionTypes = "Questions and marks must be at least 1";
    set({ errors });
    return Object.keys(errors).length === 0;
  },

  submit: async () => {
    if (!get().validate()) return null;
    set({ submitting: true });
    try {
      const { dueDate, instructions, material, rows } = get();
      const { id } = await api.createAssignment({
        dueDate: dueDate ? format(dueDate, "dd-MM-yyyy") : undefined,
        instructions: instructions.trim() || undefined,
        material: material.trim() || undefined,
        questionTypes: rows.map((r) => ({
          type: r.type,
          count: r.count,
          marks: r.marks,
        })),
      });
      void useAssignmentsCount.getState().refresh();
      return id;
    } finally {
      set({ submitting: false });
    }
  },

  reset: () =>
    set({
      dueDate: undefined,
      instructions: "",
      fileName: null,
      material: "",
      rows: initialRows,
      errors: {},
      nextId: 5,
    }),
}));
