import { create } from "zustand";
import type { Position } from "~/types";

const usePositionsStore = create<{
  positions: Position[];
  addPosition: (position: Position) => void;
  removePosition: (positionId: Position["positionId"]) => void;
}>((set) => ({
  positions: [],
  addPosition: (position) =>
    set((state) => ({
      positions: [...state.positions, position],
    })),
  removePosition: (positionId) =>
    set((state) => ({
      positions: state.positions.filter(
        (position) => position.positionId !== positionId,
      ),
    })),
}));

export default usePositionsStore;
