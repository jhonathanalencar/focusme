import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import { type Break, type Cycle, useCyclesStore } from '@/stores/cycles';

import { TimerFormInputs } from '@/app/components/TimerFormContext';

import logo from '@/assets/logo.png';
import notificationSound from '@/assets/tiny-bell.mp3';

type CycleContextData = {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  cycleBreak: Break | undefined;
  minutes: string;
  seconds: string;
  progressPercentage: number;
  isCycleActive: boolean;
  hadBreak: boolean;
  startCountdown: (cycle: Cycle) => void;
  interruptCountdown: () => void;
};

export const CycleContext = createContext({} as CycleContextData);

interface CycleContextProviderProps {
  children: ReactNode;
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const interval = useRef<NodeJS.Timer | null>(null);

  const state = useCyclesStore.getState().state;
  const actions = useCyclesStore.getState().actions;

  const {
    startNewCycle,
    startBreak,
    markActiveCycleAsCompleted,
    resetCycle,
    interruptActiveCycle,
  } = actions;

  const { cycles, activeCycle, cycleBreak } = state;

  const [hadBreak, setHadBreak] = useState(() => {
    if (cycleBreak) {
      return true;
    }

    return false;
  });

  const [isCycleActive, setIsCycleActive] = useState(() => {
    if (activeCycle || cycleBreak) {
      return true;
    }
    return false;
  });

  const [elapsedTime, setElapsedTime] = useState(() => {
    if (activeCycle) {
      interval.current = setInterval(() => {
        updateCountdown();
      }, 1000);
      return dayjs(new Date()).diff(new Date(activeCycle.startDate), 's');
    }
    if (cycleBreak) {
      interval.current = setInterval(() => {
        updateCountdown();
      }, 1000);
      return dayjs(new Date()).diff(new Date(cycleBreak.startDate), 's');
    }

    return 0;
  });

  const {
    watch,
    getFieldState,
    resetField,
    formState: { defaultValues },
  } = useFormContext<TimerFormInputs>();

  const isPlaySound = watch().playSound;

  const isDurationInvalid = getFieldState('duration').invalid;
  const defaultDuration = defaultValues?.duration ?? 0;
  const isBreakInvalid = getFieldState('breakTime').invalid;
  const defaultBreak = defaultValues?.breakTime ?? 0;

  const durationInMinutes = isDurationInvalid
    ? defaultDuration
    : watch().duration;
  const breakInMinutes = isBreakInvalid ? defaultBreak : watch().breakTime;

  const durationInSeconds = activeCycle
    ? activeCycle.duration * 60
    : durationInMinutes * 60;
  const breakInSeconds = cycleBreak
    ? cycleBreak.duration * 60
    : breakInMinutes * 60;

  const currentTime =
    hadBreak || cycleBreak
      ? breakInSeconds - elapsedTime
      : durationInSeconds - elapsedTime;

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const seconds = String(Math.floor(currentTime % 60)).padStart(2, '0');

  const progressPercentage = (elapsedTime * 100) / durationInSeconds || 0;

  const updateCountdown = useCallback(() => {
    setElapsedTime((prev) => prev + 1);
  }, []);

  const startCountdown = useCallback(
    (cycle: Cycle) => {
      window.Notification.requestPermission();

      startNewCycle(cycle);
      setIsCycleActive(true);

      interval.current = setInterval(() => {
        updateCountdown();
      }, 1000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateCountdown]
  );

  const stopCountdown = useCallback(() => {
    if (!hadBreak && activeCycle) {
      setHadBreak(true);
      markActiveCycleAsCompleted(activeCycle.id);
      startBreak({
        duration: breakInMinutes,
        startDate: new Date(),
      });
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
      interval.current = null;

      setIsCycleActive(false);
      setHadBreak(false);
      resetCycle();
    }
    setElapsedTime(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hadBreak, activeCycle, breakInMinutes]);

  const interruptCountdown = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = null;

    setIsCycleActive(false);
    setElapsedTime(0);
    resetField('task');

    if (activeCycle) {
      interruptActiveCycle(activeCycle.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCycle]);

  const playSound = useCallback(() => {
    const audio = new Audio(notificationSound);
    audio.play();
  }, []);

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  useEffect(() => {
    const stateJSON = JSON.stringify(state);
    window.localStorage.setItem('@focusme:0.0.1', stateJSON);
  }, [state]);

  useEffect(() => {
    if (currentTime < 0) stopCountdown();
    if (currentTime === 0 && isCycleActive) {
      stopCountdown();

      if (isPlaySound) {
        playSound();
      }

      if (hadBreak) {
        new window.Notification('Time to focus!', {
          icon: logo.src,
        });
      } else {
        new window.Notification('Time to take a break!', {
          icon: logo.src,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  useEffect(() => {
    if (isCycleActive) {
      if (hadBreak) {
        document.title = `${minutes}:${seconds} - Time for a break`;
      } else {
        document.title = `${minutes}:${seconds} - Time to focus`;
      }
    } else {
      document.title = 'FocusMe - Pomodoro Timer';
    }
  }, [minutes, seconds, isCycleActive, hadBreak]);

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        cycleBreak,
        minutes,
        seconds,
        isCycleActive,
        progressPercentage,
        hadBreak,
        startCountdown,
        interruptCountdown,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}

export function useCycleContext() {
  return useContext(CycleContext);
}
