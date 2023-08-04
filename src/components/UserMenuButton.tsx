'use client';

import { useClerk, SignedIn, SignedOut } from '@clerk/nextjs';

import { SignIn } from '@/libs/phosphor';

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
        <button
          onClick={() => openSignIn()}
          className="rounded hover:text-theme-red-400 focus-visible:text-theme-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-900"
        >
          <SignIn className="h-6 w-6" weight="bold" />
        </button>
      </SignedOut>
    </>
  );
}
