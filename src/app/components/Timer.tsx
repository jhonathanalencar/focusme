'use client';

import useCountdown from '@/hooks/useCountdown';

import Countdown from './Countdown';
import TimerForm from './TimerForm';
import TimerOptionsButton from '@/components/TimerOptionsButton';
import TimerTask from './TimerTask';
import ProgressBar from './ProgressBar';

export default function Timer() {
  const {
    minutes,
    seconds,
    isTimerActive,
    hadBreak,
    progressPercentage,
    startCountdown,
    interruptCountdown,
  } = useCountdown();

  return (
    <>
      <ProgressBar progressPercentage={progressPercentage} />

      <div className="w-full bg-theme-neutral-900 p-6 drop-shadow-md">
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
      </div>
    </>
  );
}
