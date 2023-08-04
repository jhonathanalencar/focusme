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
  markActiveCycleAsCompleted: () => void;
  setBreak: () => void;
  interruptActiveCycle: () => void;
  resetCycle: () => void;
};

export type CyclesState = {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  Cyclebreak: Break | undefined;
};

export type Store = {
  state: CyclesState;
  actions: CyclesActions;
};

export const useCyclesStore = create<Store>((set) => ({
  state: {
    cycles: [],
    activeCycle: undefined,
    Cyclebreak: undefined,
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
    markActiveCycleAsCompleted: () => ({}),
    setBreak: () => ({}),
    interruptActiveCycle: () => ({}),
    resetCycle: () => ({}),
  },
}));
