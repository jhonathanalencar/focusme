'use client';

import { useFormContext } from 'react-hook-form';
import { TimerFormInputs } from './TimerFormContext';
import { NoteBlank } from '@phosphor-icons/react';

interface TimerTaskProps {
  isTimerActive: boolean;
}

export default function TimerTask({ isTimerActive }: TimerTaskProps) {
  const { register, watch } = useFormContext<TimerFormInputs>();

  const task = watch().task;

  return (
    <div className="mt-6">
      <h2 className="text-base font-bold text-theme-gray-50 md:text-xl">
        Task
      </h2>
      {isTimerActive ? (
        task ? (
          <div className="relative mt-2 rounded bg-theme-neutral-600 px-3 py-2 leading-snug shadow-sm">
            <div className="absolute left-0 top-0 h-full w-2 rounded-bl rounded-tl bg-theme-beige-300 " />
            <span className="wrap-text">{task}</span>
          </div>
        ) : (
          <div className="mt-2 flex items-center gap-2">
            <NoteBlank className="h-6 w-6 text-theme-beige-300" weight="fill" />
            <p className="text-base font-semibold text-theme-gray-100 md:text-lg">
              No tasks
            </p>
          </div>
        )
      ) : (
        <input
          type="text"
          placeholder="What are you working on?"
          className="mt-2 w-full border-b-2 border-theme-beige-300 bg-transparent text-base text-theme-gray-200 outline-none placeholder:text-theme-gray-300"
          {...register('task')}
        />
      )}
    </div>
  );
}
