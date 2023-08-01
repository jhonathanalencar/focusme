'use client';
import { ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const timerFormSchema = z.object({
  duration: z.number().int().positive(),
  breakTime: z.number().int().positive(),
  task: z.string().trim().optional(),
});

export type TimerFormInputs = z.infer<typeof timerFormSchema>;

interface TimerFormContextProps {
  children: ReactNode;
}

export default function TimerFormContext({ children }: TimerFormContextProps) {
  const methods = useForm<TimerFormInputs>({
    resolver: zodResolver(timerFormSchema),
    defaultValues: {
      duration: 90,
      breakTime: 20,
    },
    mode: 'all',
  });

  async function onSubmit(data: TimerFormInputs) {
    console.log(data);
  }
  return <FormProvider {...methods}>{children}</FormProvider>;
}
