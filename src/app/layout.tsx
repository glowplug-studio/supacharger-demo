import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import { Logo } from '@/components/logo';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/cn';
import { Analytics } from '@vercel/analytics/react';
import { Navigation } from './navigation';
import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const site_title = process.env.SITE_TITLE;

export const metadata: Metadata = {
  title: site_title,
  description: 'Start your next project without reinventing the wheel. REPLACE_ME',
};

export default async function RootLayout({ children }: PropsWithChildren) {
   // Get the current locale from cookies
   const cookieStore = await cookies();
   const currentLocale = cookieStore.get('supacharger_locale')?.value || 'en'; // Default to 'en' if not set
   // Load translations for the current locale
   const messages = await import(`../../messages/${currentLocale}.json`).then((module) => module.default);

   return (
      <html lang={currentLocale}>
         <body className={cn('font-sans antialiased', inter.variable)}>
            <NextIntlClientProvider messages={messages}>
            {children}
               <Toaster />
               <Analytics />
            </NextIntlClientProvider>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
         </body>
      </html>
   );
}