'use client';

import { ReactNode } from 'react';

import TimerFormContext from '@/app/components/TimerFormContext';
import { CycleContextProvider } from '@/contexts/CycleContex';
import InitializerStore from '@/stores/InitializerStore';

import type { CyclesState } from '@/stores/cycles';

interface providersProps {
  children: ReactNode;
}

function getStorageState(): CyclesState {
  const storageSettignsKey = '@focusme:0.0.1';

  const storageJSON = window.localStorage.getItem(storageSettignsKey);

  if (storageJSON) {
    return JSON.parse(storageJSON);
  } else {
    return {
      cycles: [],
      activeCycle: undefined,
      cycleBreak: undefined,
    };
  }
}
const state = getStorageState();

export default function Providers({ children }: providersProps) {
  return (
    <TimerFormContext>
      <InitializerStore {...state} />
      <CycleContextProvider>{children}</CycleContextProvider>
    </TimerFormContext>
  );
}
