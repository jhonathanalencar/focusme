import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { TimerFormInputs } from '@/app/components/TimerFormContext';

import logo from '@/assets/logo.png';
import notificationSound from '@/assets/tiny-bell.mp3';

export default function useCountdown() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [hadBreak, setHadBreak] = useState(false);

  const interval = useRef<NodeJS.Timer | null>(null);

  const {
    watch,
    getFieldState,
    formState: { defaultValues },
    resetField,
  } = useFormContext<TimerFormInputs>();

  const isPlaySound = watch().playSound;

  const isDurationInvalid = getFieldState('duration').invalid;
  const defaultDuration = defaultValues?.duration ?? 0;

  const isBreakTimeInvalid = getFieldState('breakTime').invalid;
  const defaultBreakTime = defaultValues?.duration ?? 0;

  const durationInMinutes = isDurationInvalid
    ? defaultDuration
    : watch().duration;
  const breakTimeInMinutes = isBreakTimeInvalid
    ? defaultBreakTime
    : watch().breakTime;

  const timeInSeconds = durationInMinutes * 60;
  const breakTimeInSeconds = breakTimeInMinutes * 60;

  const currentTime = hadBreak
    ? breakTimeInSeconds - elapsedTime
    : timeInSeconds - elapsedTime;

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const seconds = String(currentTime % 60).padStart(2, '0');

  function startCountdown() {
    window.Notification.requestPermission();

    interval.current = setInterval(() => {
      updateCountdown();
    }, 1000);

    setIsTimerActive(true);
    setElapsedTime(0);
  }

  function stopCountdown() {
    if (!hadBreak) {
      setHadBreak(true);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
      interval.current = null;
      setIsTimerActive(false);
      setHadBreak(false);
    }

    setElapsedTime(0);
  }

  function interruptCountdown() {
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = null;

    setIsTimerActive(false);
    setElapsedTime(0);
    resetField('task');
  }

  function updateCountdown() {
    setElapsedTime((prev) => prev + 1);
  }

  function playSound() {
    const audio = new Audio(notificationSound);
    audio.play();
  }

  useEffect(() => {
    if (currentTime === 0 && isTimerActive) {
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
    if (isTimerActive) {
      if (hadBreak) {
        document.title = `${minutes}:${seconds} - Time for a break`;
      } else {
        document.title = `${minutes}:${seconds} - Time to focus`;
      }
    } else {
      document.title = 'FocusMe - Pomodoro Timer';
    }
  }, [minutes, seconds, isTimerActive, hadBreak]);

  return {
    minutes,
    seconds,
    isTimerActive,
    hadBreak,
    startCountdown,
    interruptCountdown,
  };
}
