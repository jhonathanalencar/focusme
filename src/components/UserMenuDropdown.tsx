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
      <DropdownMenu.Trigger>
        <Image
          src={user?.imageUrl ?? profilePicturePlaceholder}
          alt="user profile picture"
          width={36}
          height={36}
          className="rounded-full"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="roundend bg-theme-gray-800 px-4 py-2 drop-shadow-md">
          <DropdownMenu.Group>
            <DropdownMenu.Item onClick={() => signOut()}>
              Sign Out
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
