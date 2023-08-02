'use client';

import useCountdown from '@/hooks/useCountdown';

import Countdown from './Countdown';
import TimerForm from './TimerForm';
import TimerOptionsButton from '@/components/TimerOptionsButton';
import TimerTask from './TimerTask';

export default function Timer() {
  const {
    minutes,
    seconds,
    isTimerActive,
    hadBreak,
    startCountdown,
    interruptCountdown,
  } = useCountdown();

  return (
    <>
      <div className="flex justify-end pb-3">
        <TimerOptionsButton isTimerActive={isTimerActive} />
      </div>

      <Countdown minutes={minutes} seconds={seconds} />
      <TimerForm
        startCountdown={startCountdown}
        interruptCountdown={interruptCountdown}
        isTimerActive={isTimerActive}
        hadBreak={hadBreak}
      />

      <TimerTask isTimerActive={isTimerActive} />
    </>
  );
}
