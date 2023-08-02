import Image from 'next/image';
import { useClerk } from '@clerk/nextjs';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import profilePicturePlaceholder from '@/assets/profile-picture-placeholder.png';

interface UserMenuDropdownProps {
  user: {
    imageUrl: string | undefined;
  };
}

export default function UserMenuDropdown({ user }: UserMenuDropdownProps) {
  const { signOut } = useClerk();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger aria-label="User Options" id="user-menu">
        <Image
          src={user?.imageUrl ?? profilePicturePlaceholder}
          alt="user profile picture"
          width={36}
          height={36}
          className="rounded-full"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-2 rounded bg-theme-gray-800 shadow-md drop-shadow-md">
          <DropdownMenu.Group className="flex flex-col gap-1 p-1">
            <DropdownMenu.Item
              className="cursor-pointer rounded px-4 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-800 data-[highlighted]:bg-theme-gray-600"
              onClick={() => signOut()}
            >
              Sign Out
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Arrow fill="#2b2b2b" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
