import * as Dialog from '@radix-ui/react-dialog';
import { useFormContext } from 'react-hook-form';

import { X } from '@/lib/phosphor';

import Input from './Input';
import { TimerFormInputs } from '@/app/components/TimerFormContext';

export default function TimerOptionsDialog() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TimerFormInputs>();

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 flex justify-center bg-theme-black/60 p-4">
        <Dialog.Content className="h-fit w-full max-w-[400px] rounded bg-theme-gray-800 p-4 drop-shadow-md">
          <div className="flex items-center justify-between border-b border-b-theme-gray-600 pb-2">
            <Dialog.Title className="text-lg font-semibold text-theme-gray-100">
              Timer Options
            </Dialog.Title>

            <Dialog.Close
              aria-label="Close Dialog"
              className="group rounded focus-visible:bg-theme-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-800"
            >
              <X
                className="h-6 w-6 text-theme-gray-100 transition-colors hover:text-theme-red-400 group-focus-visible:text-theme-red-400"
                weight="bold"
              />
            </Dialog.Close>
          </div>

          <h2 className="mt-2 text-base font-bold text-theme-gray-200">
            Time (minutes)
          </h2>

          <Input
            type="number"
            autoComplete="off"
            min={1}
            label="Duration"
            error={!!errors.duration}
            errorMessage={errors.duration?.message}
            {...register('duration', { valueAsNumber: true })}
          />

          <Input
            type="number"
            autoComplete="off"
            min={1}
            label="Break"
            error={!!errors.breakTime}
            errorMessage={errors.breakTime?.message}
            {...register('breakTime', { valueAsNumber: true })}
          />
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
