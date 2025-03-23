import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';

import SCFooter from '@/components/sc_demo/sc_footer';
import  SCSiteLogo  from '@/components/sc_demo/sc_site-logo';
import { Toaster } from '@/components/ui/toaster';
import { SC_CONFIG } from "@/supacharger/supacharger-config";
import { cn } from '@/utils/cn';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/globals.css';

export const dynamic = 'force-dynamic';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const site_title = SC_CONFIG.SITE_TITLE;

export const metadata: Metadata = {
  title: site_title,
  description: 'Start your next project without reinventing the wheel. REPLACE_ME',
};

export default async function RootLayout({ children }: PropsWithChildren) {
   // Get the current locale from cookies
   const cookieStore = await cookies();
   const currentLocale = cookieStore.get('supacharger_locale')?.value || 'en'; // Default to 'en' if not set
   // Load translations for the current locale
   const messages = await import(`../../../../messages/${currentLocale}.json`).then((module) => module.default);

   return (
     
               <div className="m-auto flex h-full flex-col">
                  <div className='container'>
                    <AppBar />
                  </div>
                  <main className="relative flex-1">
                     <div className="relative h-full"><h1>TESTNG src/app/(supacharger)/(unauthenticated)/layout.tsx</h1>{children}</div>
                  </main>
                  <SCFooter />
               </div>
     
    
   );
}

async function AppBar() {
   return (
      <header className="flex items-center justify-between py-8">
        
      </header>
   );
}
