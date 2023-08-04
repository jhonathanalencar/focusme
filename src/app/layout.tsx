import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Merriweather_Sans } from 'next/font/google';

import Header from '@/components/Header';
import Providers from '@/providers';

const merriweather_Sans = Merriweather_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
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
          <Providers>
            <Header />
            <main className="grow">{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
