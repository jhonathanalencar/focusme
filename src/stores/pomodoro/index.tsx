import { create } from 'zustand';

type Cycle = {
  id: string;
  duration: number;
  break: number;
  task?: string;
};

type Actions = {
  start: (cycle: Cycle) => void;
};

type Store = {
  state: {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | undefined;
    timerConfig: TimerSettins;
  };
  actions: Actions;
};

export const useCyclesStore = create<Store>((set) => ({
  state: {
    cycles: [],
    activeCycle: undefined,
    activeCycleId: undefined,
    timerConfig: {
      duration: 90,
      breakTime: 20,
      playSound: true,
    },
  },
  actions: {
    start: (cycle) => {
      return set((state) => ({
        state: {
          ...state.state,
          activeCycle: cycle,
          activeCycleId: cycle.id,
          cycles: [...state.state.cycles, cycle],
        },
      }));
    },
  },
}));
