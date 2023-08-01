import { useFormContext } from 'react-hook-form';

import { TimerFormInputs } from './TimerFormContext';

interface TimerFormProps {
  startCountdown: () => void;
}

export default function TimerForm({ startCountdown }: TimerFormProps) {
  const { handleSubmit } = useFormContext<TimerFormInputs>();

  async function onSubmit(data: TimerFormInputs) {
    console.log(data);
    startCountdown();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button
        type="submit"
        className="mt-4 h-12 w-full rounded bg-theme-pink-600 text-xl font-bold uppercase text-theme-gray-100 transition-colors hover:bg-theme-pink-700"
      >
        Start
      </button>
    </form>
  );
}
