import { create } from 'zustand';

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

export const useCyclesStore = create<Store>((set) => ({
  state: {
    cycles: [],
    activeCycle: undefined,
    cycleBreak: undefined,
  },
  actions: {
    startNewCycle: (cycle) =>
      set((state) => ({
        state: {
          ...state.state,
          activeCycle: cycle,
          cycles: [...state.state.cycles, cycle],
        },
      })),
    markActiveCycleAsCompleted: (cycleId) =>
      set((state) => ({
        state: {
          ...state.state,
          activeCycle: undefined,
          cycles: state.state.cycles.map((cycle) => {
            if (cycle.id === cycleId) {
              return {
                ...cycle,
                finishDate: new Date(),
              };
            }
            return cycle;
          }),
        },
      })),
    startBreak: (cycleBreak) =>
      set((state) => ({
        state: {
          ...state.state,
          cycleBreak,
        },
      })),
    interruptActiveCycle: (cycleId) =>
      set((state) => ({
        state: {
          ...state.state,
          activeCycle: undefined,
          cycles: state.state.cycles.map((cycle) => {
            if (cycle.id === cycleId) {
              return {
                ...cycle,
                interruptDate: new Date(),
              };
            }
            return cycle;
          }),
        },
      })),
    resetCycle: () =>
      set((state) => ({
        state: {
          ...state.state,
          cycleBreak: undefined,
        },
      })),
  },
}));
