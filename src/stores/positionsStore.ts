import { create } from "zustand";
import type { Position } from "~/types";

type positionId = Position["positionId"];

const usePositionsStore = create<{
  positions: Position[];
  addPosition: (position: Position) => void;
  removePosition: (positionId: positionId) => void;
  setPositionClosing: (positionId: positionId) => void;
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
  setPositionClosing: (positionId: positionId) =>
    set((state) => ({
      positions: state.positions.map((position) => {
        if (position.positionId === positionId) {
          return { ...position, closing: true };
        }
        return position;
      }),
    })),
}));

export default usePositionsStore;
