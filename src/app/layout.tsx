import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Merriweather_Sans } from 'next/font/google';

import './globals.css';

const merriweather_Sans = Merriweather_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FocusMe - Pomodoro Timer',
  description: 'Pomodoro timer to boost your productivity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${merriweather_Sans.className} bg-[#141414] text-[#f2f2f2]`}
      >
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
