import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GearSix } from '@/lib/phosphor';

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
      >
        <GearSix
          className="h-6 w-6 transition-colors hover:text-theme-red-400"
          weight="bold"
        />
      </Dialog.Trigger>

      <TimerOptionsDialog isTimerActive={isTimerActive} />
    </Dialog.Root>
  );
}
