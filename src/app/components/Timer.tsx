'use client';

import Countdown from './Countdown';
import TimerForm from './TimerForm';
import TimerOptionsButton from '@/components/TimerOptionsButton';
import TimerTask from './TimerTask';
import ProgressBar from './ProgressBar';
import { useCycleContext } from '@/contexts/CycleContex';

export default function Timer() {
  const {
    minutes,
    seconds,
    startCountdown,
    progressPercentage,
    isCycleActive,
    hadBreak,
    interruptCountdown,
  } = useCycleContext();

  return (
    <div className="flex animate-fade flex-col items-center gap-4">
      <ProgressBar progressPercentage={progressPercentage} />

      <div className="w-full bg-theme-neutral-900 p-6 drop-shadow-md">
        <div className="flex justify-end pb-3">
          <TimerOptionsButton isCycleActive={isCycleActive} />
        </div>

        <Countdown minutes={minutes} seconds={seconds} />

        <TimerForm
          startCountdown={startCountdown}
          interruptCountdown={interruptCountdown}
          isCycleActive={isCycleActive}
          hadBreak={hadBreak}
        />

        <TimerTask isCycleActive={isCycleActive} />
      </div>
    </div>
  );
}
