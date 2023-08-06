import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Cycle = {
  id: string;
  duration: number;
  startDate: Date;
  task?: string;
  finishDate?: Date;
  interruptDate?: Date;
};

export type Break = {
  duration: number;
  startDate: Date;
};

type CyclesActions = {
  startNewCycle: (cycle: Cycle) => void;
  markActiveCycleAsCompleted: (cycleId: string) => void;
  startBreak: (cycleBreak: Break) => void;
  interruptActiveCycle: (cycleId: string) => void;
  resetCycle: () => void;
};

export type CyclesState = {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  cycleBreak: Break | undefined;
};

export type Store = {
  state: CyclesState;
  actions: CyclesActions;
};

export const useCyclesStore = create(
  immer<Store>((set) => ({
    state: {
      cycles: [],
      activeCycle: undefined,
      cycleBreak: undefined,
    },
    actions: {
      startNewCycle: (cycle) =>
        set((state) => {
          state.state.cycles.push(cycle);
          state.state.activeCycle = cycle;
        }),
      markActiveCycleAsCompleted: (cycleId) =>
        set((state) => {
          const tempCycles = state.state.cycles.map((cycle) => {
            if (cycle.id === cycleId) {
              return {
                ...cycle,
                finishDate: new Date(),
              };
            }

            return cycle;
          });

          state.state.activeCycle = undefined;
          state.state.cycles = tempCycles;
        }),
      startBreak: (cycleBreak) =>
        set((state) => {
          state.state.cycleBreak = cycleBreak;
        }),
      interruptActiveCycle: (cycleId) =>
        set((state) => {
          const tempCycles = state.state.cycles.map((cycle) => {
            if (cycle.id === cycleId) {
              return {
                ...cycle,
                interruptDate: new Date(),
              };
            }
            return cycle;
          });

          state.state.activeCycle = undefined;
          state.state.cycles = tempCycles;
        }),
      resetCycle: () =>
        set((state) => {
          state.state.cycleBreak = undefined;
        }),
    },
  }))
);
