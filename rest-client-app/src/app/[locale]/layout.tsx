import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'REST Client App',
  description: 'light-weight version of Postman',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col`}
      >
        <NextIntlClientProvider>
          <AuthProvider>
            <Header />
            <main className="flex flex-1 overflow-y-auto px-4 py-6 font-[family-name:var(--font-geist-sans)]">
              {children}
            </main>
            <Toaster
              position="top-center"
              richColors
              toastOptions={{
                classNames: {
                  toast: 'rounded-xl shadow-md',
                  description: 'text-sm',
                  title: 'text-base font-semibold',
                },
                style: {
                  padding: '12px 16px',
                },
                duration: 4000,
              }}
            />
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
