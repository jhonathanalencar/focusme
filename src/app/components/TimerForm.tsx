import { useFormContext } from 'react-hook-form';
import { nanoid } from 'nanoid';

import type { TimerFormInputs } from './TimerFormContext';
import type { Cycle } from '@/stores/cycles';

interface TimerFormProps {
  isCycleActive: boolean;
  hadBreak: boolean;
  startCountdown: (cycle: Cycle) => void;
  interruptCountdown: () => void;
}

export default function TimerForm({
  startCountdown,
  isCycleActive,
  interruptCountdown,
  hadBreak,
}: TimerFormProps) {
  const { handleSubmit } = useFormContext<TimerFormInputs>();

  async function onSubmit(data: TimerFormInputs) {
    startCountdown({
      id: nanoid(),
      duration: data.duration,
      startDate: new Date(),
      task: data.task,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isCycleActive ? (
        <button
          type="button"
          onClick={interruptCountdown}
          disabled={hadBreak}
          className="mt-4 h-12 w-full rounded bg-theme-pink-600 text-xl font-bold uppercase text-theme-gray-100 transition-colors hover:bg-theme-pink-800 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-theme-pink-600"
        >
          Stop
        </button>
      ) : (
        <input
          type="submit"
          value="Start"
          className="mt-4 h-12 w-full cursor-pointer rounded bg-theme-pink-600 text-xl font-bold uppercase text-theme-gray-100 transition-colors hover:bg-theme-pink-700"
        />
      )}
      {hadBreak ? (
        <p className="mt-3 text-center text-base font-semibold text-theme-gray-100 md:text-lg">
          Take a break
        </p>
      ) : null}
    </form>
  );
}
