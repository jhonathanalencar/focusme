'use client';

import { useClerk, SignedIn, SignedOut } from '@clerk/nextjs';

import { SignIn } from '@/lib/phosphor';

import UserMenuDropdown from './UserMenuDropdown';

interface UsermenuButtonProps {
  user: {
    imageUrl: string | undefined;
  };
}

export default function UsermenuButton({ user }: UsermenuButtonProps) {
  const { openSignIn } = useClerk();

  return (
    <>
      <SignedIn>
        <UserMenuDropdown user={user} />
      </SignedIn>

      <SignedOut>
        <button onClick={() => openSignIn({ redirectUrl: '/' })}>
          <SignIn className="h-6 w-6" weight="bold" />
        </button>
      </SignedOut>
    </>
  );
}
