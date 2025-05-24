import { useTranslations } from 'next-intl';
import type React from 'react';

import FacebookLogo from '@/assets/images/socialAuthIcons/FacebookLogo.svg';
import GoogleLogo from '@/assets/images/socialAuthIcons/GoogleLogo.svg';
import { SC_CONFIG } from '@/supacharger/supacharger-config';

import { UIDivider } from '../ui/divider';

export default function AuthProviderButtons() {
  const anyProviderEnabled = Object.values(SC_CONFIG.AUTH_PROVDERS_ENABLED).some(Boolean);

  if (!anyProviderEnabled) {
    return null;
  }

  return (
    <>
      <div className='w-full'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
          {SC_CONFIG.AUTH_PROVDERS_ENABLED.google && (
            <a
              href='#'
              className='shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50 focus-visible:ring-transparent'
            >
              <GoogleLogo className='h-4 w-4' />
              <span className='font-semibold'>Google</span>
            </a>
          )}

          {SC_CONFIG.AUTH_PROVDERS_ENABLED.facebook && (
            <a
              href='#'
              className='shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50 focus-visible:ring-transparent'
            >
              <FacebookLogo className='h-4 w-4' />
              <span className='font-semibold'>Facebook</span>
            </a>
          )}
        </div>
      </div>
      <UIDivider className='my-6' />
    </>
  );
}
