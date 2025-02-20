import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Providers from '@/providers/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jeonghamsu',
  description: 'Jeonghamsu | Department of Cyber Security Chatbot',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {/* Tech background pattern */}
            <div className="fixed inset-0 z-0">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#c3c6ce_1px,transparent_1px),linear-gradient(to_bottom,#c3c6ce_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 via-blue-200/10 to-purple-200/10"></div>
            </div>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
