import { create } from "zustand";
import { api } from "@/lib/api";

type CountState = {
  count: number;
  setCount: (n: number) => void;
  refresh: () => Promise<void>;
};

export const useAssignmentsCount = create<CountState>((set) => ({
  count: 0,
  setCount: (n) => set({ count: Math.max(0, n) }),
  refresh: async () => {
    try {
      const items = await api.listAssignments();
      set({ count: items.length });
    } catch {
      // ignore network errors for the badge
    }
  },
}));
