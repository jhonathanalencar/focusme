import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GearSix } from '@/lib/phosphor';

import TimerOptionsDialog from './TimerOptionsDialog';

export default function TimerOptionsButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger>
        <GearSix
          className="h-6 w-6 transition-colors hover:text-theme-red-400"
          weight="bold"
        />
      </Dialog.Trigger>

      <TimerOptionsDialog />
    </Dialog.Root>
  );
}
