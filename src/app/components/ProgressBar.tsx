'use client';

import * as Progress from '@radix-ui/react-progress';

interface ProgressBarprops {
  progressPercentage: number;
}

export default function ProgressBar({ progressPercentage }: ProgressBarprops) {
  return (
    <Progress.Root
      value={progressPercentage}
      className="h-1 w-full rounded-full bg-theme-gray-500"
    >
      <Progress.Indicator
        className="h-full w-full bg-red-500 transition-[width]"
        style={{
          width: `${progressPercentage}%`,
        }}
      />
    </Progress.Root>
  );
}
