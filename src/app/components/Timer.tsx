'use client';

import useCountdown from '@/hooks/useCountdown';
import Countdown from './Countdown';

export default function Timer() {
  const { minutes, seconds, startCountdown } = useCountdown(0.1);

  return (
    <>
      <Countdown minutes={minutes} seconds={seconds} />

      <button
        type="button"
        onClick={startCountdown}
        className="mt-4 h-12 w-full rounded bg-theme-pink-600 text-xl font-bold uppercase text-theme-gray-100 transition-colors hover:bg-theme-pink-700"
      >
        Start
      </button>
    </>
  );
}
