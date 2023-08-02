import { useFormContext } from 'react-hook-form';

import { TimerFormInputs } from './TimerFormContext';

interface TimerFormProps {
  isTimerActive: boolean;
  hadBreak: boolean;
  startCountdown: () => void;
  interruptCountdown: () => void;
}

export default function TimerForm({
  startCountdown,
  isTimerActive,
  interruptCountdown,
  hadBreak,
}: TimerFormProps) {
  const { handleSubmit } = useFormContext<TimerFormInputs>();

  async function onSubmit(data: TimerFormInputs) {
    console.log(data);
    startCountdown();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isTimerActive ? (
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
