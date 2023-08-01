'use client';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';

import { ClockCounterClockwise, SignIn, Timer } from '@/lib/phosphor';

import logo from '@/assets/logo.png';

import TimerOptionsButton from './TimerOptionsButton';

export default function Header() {
  return (
    <header className="w-full ">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between p-4">
        <Link href="/" className="shrink-0">
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
                <Link href="/">
                  <Timer
                    className="h-6 w-6 transition-colors hover:text-theme-red-400"
                    weight="bold"
                  />
                </Link>
              </li>
              <li>
                <Link href="/history">
                  <ClockCounterClockwise
                    className="h-6 w-6 transition-colors hover:text-theme-red-400"
                    weight="bold"
                  />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button>
              <SignInButton>
                <SignIn
                  className="h-6 w-6 transition-colors hover:text-theme-red-400"
                  weight="bold"
                />
              </SignInButton>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
