'use client';

import useHasMounted from '@/hooks/useHasMounted';
import { ReactNode } from 'react';

export function ClientOnly({ children }: { children: ReactNode }) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return children;
}
