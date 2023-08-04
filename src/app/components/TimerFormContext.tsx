import { ReactNode, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const timerFormSchema = z.object({
  duration: z.number().int().positive(),
  breakTime: z.number().int().positive(),
  playSound: z.boolean(),
  task: z.string().trim().optional(),
});

export type TimerFormInputs = z.infer<typeof timerFormSchema>;

interface TimerFormContextProps {
  children: ReactNode;
}

function getStorageSettigns(): TimerSettins {
  const storageSettignsKey = '@focusme:settings:0.0.1';

  if (typeof window !== 'undefined') {
    const storageJSON = window.localStorage.getItem(storageSettignsKey);

    if (storageJSON) {
      return JSON.parse(storageJSON);
    }
  }

  return {
    duration: 90,
    breakTime: 20,
    playSound: true,
  };
}

export default function TimerFormContext({ children }: TimerFormContextProps) {
  const [timerSettings] = useState<TimerSettins>(() => getStorageSettigns());

  const methods = useForm<TimerFormInputs>({
    resolver: zodResolver(timerFormSchema),
    defaultValues: {
      duration: timerSettings.duration,
      breakTime: timerSettings.breakTime,
      playSound: timerSettings.playSound,
    },
    mode: 'all',
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
