import { useFormContext, Controller } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';

import { Clock, SpeakerHigh, X } from '@/lib/phosphor';

import Input from './Input';
import { TimerFormInputs } from '@/app/components/TimerFormContext';
import Switch from './Switch';
import { OptionGroup } from './OptionGroup';

interface TimerOptionsDialogProps {
  isTimerActive: boolean;
}

export default function TimerOptionsDialog({
  isTimerActive,
}: TimerOptionsDialogProps) {
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = useFormContext<TimerFormInputs>();

  function handleSaveSettings() {
    const storageSettingsKey = '@focusme:settings:0.0.1';
    const settingsData = watch();

    delete settingsData.task;

    window.localStorage.setItem(
      storageSettingsKey,
      JSON.stringify(settingsData)
    );
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 flex justify-center bg-theme-black/60 p-4">
        <Dialog.Content className="h-fit w-full max-w-[400px] rounded bg-theme-gray-800 p-4 drop-shadow-md">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-theme-gray-100">
              Timer Options
            </Dialog.Title>

            <Dialog.Close
              aria-label="Close Dialog"
              className="group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-800"
            >
              <X
                className="h-6 w-6 text-theme-gray-100 transition-colors hover:text-theme-red-400 group-focus-visible:text-theme-red-400"
                weight="bold"
              />
            </Dialog.Close>
          </div>

          <Divisor />

          <OptionGroup.Root>
            <OptionGroup.Icon icon={<Clock />} />
            <OptionGroup.Title>Time (minutes)</OptionGroup.Title>
          </OptionGroup.Root>

          <Input
            type="number"
            autoComplete="off"
            min={1}
            max={99}
            label="Duration"
            error={!!errors.duration}
            errorMessage={errors.duration?.message}
            disabled={isTimerActive}
            {...register('duration', { valueAsNumber: true })}
          />

          <Input
            type="number"
            autoComplete="off"
            min={1}
            max={99}
            label="Break"
            error={!!errors.breakTime}
            errorMessage={errors.breakTime?.message}
            disabled={isTimerActive}
            {...register('breakTime', { valueAsNumber: true })}
          />

          <Divisor />

          <OptionGroup.Root>
            <OptionGroup.Icon icon={<SpeakerHigh />} />
            <OptionGroup.Title>Sound</OptionGroup.Title>
          </OptionGroup.Root>

          <div className="mt-1 flex items-center justify-between">
            <label
              htmlFor="play-sound"
              className="text-base font-medium tracking-wide text-theme-gray-300"
            >
              Play Sound
            </label>
            <Controller
              control={control}
              name="playSound"
              render={({ field: { onChange, onBlur, value } }) => (
                <Switch
                  id="play-sound"
                  onCheckedChange={onChange}
                  checked={value}
                  onBlur={onBlur}
                  disabled={isTimerActive}
                />
              )}
            />
          </div>

          <Divisor />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSaveSettings}
              disabled={isTimerActive}
              className="rounded bg-theme-gray-600 px-4 py-2 font-bold text-gray-300 transition-colors hover:bg-theme-gray-500 focus-visible:bg-theme-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-800 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-theme-gray-600"
            >
              Save Settings
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}

function Divisor() {
  return <div className="my-3 h-[1px] w-full bg-theme-gray-600" />;
}
