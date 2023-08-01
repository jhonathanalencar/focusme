'use client';

import useCountdown from '@/hooks/useCountdown';

import Countdown from './Countdown';
import TimerForm from './TimerForm';

export default function Timer() {
  const { minutes, seconds, startCountdown } = useCountdown(0.1);

  return (
    <>
      <Countdown minutes={minutes} seconds={seconds} />
      <TimerForm startCountdown={startCountdown} />
    </>
  );
}
