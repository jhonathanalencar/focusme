import { useEffect, useRef, useState } from 'react';

export default function useCountdown(durationInMinutes: number) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const interval = useRef<NodeJS.Timer | null>(null);

  const timeInSeconds = durationInMinutes * 60;
  const currentTime = timeInSeconds - elapsedTime;

  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const seconds = String(currentTime % 60).padStart(2, '0');

  function startCountdown() {
    interval.current = setInterval(() => {
      updateCountdown();
    }, 1000);
  }

  function stopCountdown() {
    if (interval.current) {
      clearInterval(interval.current);
    }
    interval.current = null;
  }

  function updateCountdown() {
    setElapsedTime((prev) => prev + 1);
  }

  useEffect(() => {
    if (currentTime === 0) {
      stopCountdown();
    }
  }, [currentTime]);

  return {
    minutes,
    seconds,
    startCountdown,
  };
}
