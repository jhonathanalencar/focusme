import { useState } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

interface SwitchProps {
  id?: string;
}

export default function Switch({ id }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SwitchPrimitive.Root
      id={id}
      checked={isChecked}
      onCheckedChange={setIsChecked}
      className="h-8 w-14 rounded-full bg-theme-gray-900/70 px-1  data-[state='checked']:bg-theme-gray-900"
    >
      <SwitchPrimitive.Thumb className="block h-6 w-6 rounded-full bg-theme-gray-300 shadow-md transition-transform will-change-transform data-[state='checked']:translate-x-6 data-[state='checked']:bg-theme-red-400" />
    </SwitchPrimitive.Root>
  );
}
