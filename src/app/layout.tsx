import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Merriweather_Sans } from 'next/font/google';

import Header from '@/components/Header';
import TimerFormContext from './components/TimerFormContext';
import { CycleContextProvider } from '@/contexts/CycleContex';

const merriweather_Sans = Merriweather_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  // title: 'FocusMe - Pomodoro Timer',
  description: 'Pomodoro timer to boost your productivity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${merriweather_Sans.className} flex flex-col bg-theme-gray-900 text-theme-gray-200`}
        >
          <TimerFormContext>
            <CycleContextProvider>
              <Header />
              <main className="grow">{children}</main>
            </CycleContextProvider>
          </TimerFormContext>
        </body>
      </html>
    </ClerkProvider>
  );
}
