import { useEffect, useRef, useState } from 'react';

export default function useCountdown(durationInMinutes: number) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const interval = useRef<NodeJS.Timer | null>(null);

  const timeInSeconds = durationInMinutes * 60;
  const currentTime = timeInSeconds - elapsedTime;

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const seconds = String(currentTime % 60).padStart(2, '0');

  function startCountdown() {
    window.Notification.requestPermission();

    interval.current = setInterval(() => {
      updateCountdown();
    }, 1000);

    setIsActive(true);
    setElapsedTime(0);
  }

  function stopCountdown() {
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = null;
    setIsActive(false);
  }

  function updateCountdown() {
    setElapsedTime((prev) => prev + 1);
  }

  useEffect(() => {
    if (currentTime === 0 && isActive) {
      stopCountdown();
      new window.Notification('Break', {
        body: 'testing',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  useEffect(() => {
    if (isActive) {
      document.title = `${minutes}:${seconds} - Time To Focus`;
    } else {
      document.title = 'FocusMe - Pomodoro Timer';
    }
  }, [minutes, seconds, isActive]);

  return {
    minutes,
    seconds,
    startCountdown,
    isActive,
  };
}
