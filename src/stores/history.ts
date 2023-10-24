import { create } from "zustand";

const useHistoryStore = create<{
  items: number[];
  addOneItem: () => void;
  removeAllItems: () => void;
}>((set) => ({
  items: [0],
  addOneItem: () => {
    return set((state) => ({ items: [0, ...state.items] }));
  },
  removeAllItems: () => set({ items: [] }),
}));

export default useHistoryStore;
