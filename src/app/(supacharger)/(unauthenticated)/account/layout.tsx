import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

import SCAccountLoginLeft from '@/components/sc_demo/sc_account-login-left';
import { SCMarketingMenu } from '@/components/sc_demo/sc_header-marketing';
import { SC_CONFIG } from '@/supacharger/supacharger-config';

export const metadata: Metadata = {
  title: SC_CONFIG.SITE_TITLE,
  description: 'Start your next project without reinventing the wheel. REPLACE_ME',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <div id='account-unauthed-layout'>
      <div className='flex min-h-screen w-full flex-col lg:flex-row'>
        
        {/* Left Side: Component is in the demo to be modified */}
        <SCAccountLoginLeft></SCAccountLoginLeft>

        <div className='flex w-full flex-1 flex-col items-center justify-center px-4 lg:px-0'>
          <div className='flex w-full max-w-md flex-col gap-8 py-8 lg:py-20'>
            {children}


            
            {/* Login Form */}
            
          
            {/* Social Buttons */}
            
            {/* Mobile Footer */}
            <div className='flex w-full justify-between pt-6 text-xs text-gray-400 lg:hidden'>
              <a href='#' className='hover:text-blue-400'>
                Privacy Policy
              </a>
              <a href='#' className='hover:text-blue-400'>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
