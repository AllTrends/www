import { create } from "zustand";

const useHistoryStore = create<{
  items: number[];
  addOneItem: () => void;
  removeAllItems: () => void;
}>((set) => ({
  items: [0],
  addOneItem: () => set((state) => ({ items: [...state.items, 0] })),
  removeAllItems: () => set({ items: [] }),
}));

export default useHistoryStore;
