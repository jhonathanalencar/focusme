'use client';

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

import { TimerFormInputs } from '@/app/components/TimerFormContext';

import logo from '@/assets/logo.png';
import notificationSound from '@/assets/tiny-bell.mp3';

type CycleContextData = {
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
  const [activeCycle, setActiveCycle] = useState<Cycle | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCycleActive, setIsCycleActive] = useState(false);
  const [hadBreak, setHadBreak] = useState(false);

  const interval = useRef<NodeJS.Timer | null>(null);

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

  const durationInMinutes = activeCycle
    ? activeCycle.duration
    : isDurationInvalid
    ? defaultDuration
    : watch().duration;
  const breakInMinutes = activeCycle
    ? activeCycle.break
    : isBreakInvalid
    ? defaultBreak
    : watch().breakTime;

  const durationInSeconds = durationInMinutes * 60;
  const breakInSeconds = breakInMinutes * 60;

  const currentTime = hadBreak
    ? breakInSeconds - elapsedTime
    : durationInSeconds - elapsedTime;

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const seconds = String(Math.floor(currentTime % 60)).padStart(2, '0');

  const progressPercentage = (elapsedTime * 100) / durationInSeconds;

  const updateCountdown = useCallback(() => {
    setElapsedTime((prev) => prev + 1);
  }, []);

  const startCountdown = useCallback(
    (cycle: Cycle) => {
      window.Notification.requestPermission();

      // setActiveCycle(cycle);
      setIsCycleActive(true);

      interval.current = setInterval(() => {
        updateCountdown();
      }, 1000);
    },
    [updateCountdown]
  );

  const stopCountdown = useCallback(() => {
    if (!hadBreak) {
      setHadBreak(true);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
      interval.current = null;

      setIsCycleActive(false);
      setHadBreak(false);
    }
    setElapsedTime(0);
  }, [hadBreak]);

  const interruptCountdown = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = null;

    setIsCycleActive(false);
    setElapsedTime(0);
    resetField('task');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playSound = useCallback(() => {
    const audio = new Audio(notificationSound);
    audio.play();
  }, []);

  useEffect(() => {
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
