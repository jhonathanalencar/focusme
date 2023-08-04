import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GearSix } from '@/libs/phosphor';

import TimerOptionsDialog from './TimerOptionsDialog';

interface TimerOptionsButtonProps {
  isTimerActive: boolean;
}

export default function TimerOptionsButton({
  isTimerActive,
}: TimerOptionsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger
        aria-label="Timer Options"
        aria-controls="timer-options"
        title="Timer Options"
        className="group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-neutral-900"
      >
        <GearSix
          className="h-6 w-6 transition-colors hover:text-theme-red-400 group-focus-visible:text-theme-red-400"
          weight="bold"
        />
      </Dialog.Trigger>

      <TimerOptionsDialog isTimerActive={isTimerActive} />
    </Dialog.Root>
  );
}
