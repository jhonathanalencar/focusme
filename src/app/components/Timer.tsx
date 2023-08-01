'use client';

import useCountdown from '@/hooks/useCountdown';

import Countdown from './Countdown';
import TimerForm from './TimerForm';
import TimerOptionsButton from '@/components/TimerOptionsButton';

export default function Timer() {
  const { minutes, seconds, startCountdown, isTimerActive } = useCountdown();

  return (
    <>
      <div className="flex justify-end pb-3">
        <TimerOptionsButton isTimerActive={isTimerActive} />
      </div>

      <Countdown minutes={minutes} seconds={seconds} />
      <TimerForm startCountdown={startCountdown} />
    </>
  );
}