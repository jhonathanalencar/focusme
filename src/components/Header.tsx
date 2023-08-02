import Image from 'next/image';
import Link from 'next/link';

import { ClockCounterClockwise, Timer } from '@/lib/phosphor';

import logo from '@/assets/logo.png';

import UserMenuButton from './UserMenuButton';
import { currentUser } from '@clerk/nextjs';

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between p-4">
        <Link
          href="/"
          className="shrink-0 rounded-full focus-visible:text-theme-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-gray-900"
        >
          <Image
            src={logo}
            alt="focus me logo"
            width={36}
            height={36}
            className="rounded-full"
          />
        </Link>
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex items-center gap-2">
              <li>
                <Link href="/" className="group focus-visible:outline-none">
                  <Timer
                    className="h-6 w-6 rounded transition-colors hover:text-theme-red-400 group-focus-visible:text-theme-red-400 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-theme-red-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-theme-gray-900"
                    weight="bold"
                  />
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="group focus-visible:outline-none"
                >
                  <ClockCounterClockwise
                    className="h-6 w-6 rounded transition-colors hover:text-theme-red-400 group-focus-visible:text-theme-red-400 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-theme-red-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-theme-gray-900"
                    weight="bold"
                  />
                </Link>
              </li>
            </ul>
          </nav>

          <UserMenuButton user={{ imageUrl: user?.imageUrl }} />
        </div>
      </div>
    </header>
  );
}
