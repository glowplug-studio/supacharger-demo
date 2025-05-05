import { useTranslations } from 'next-intl';
import type React from "react";

import FacebookLogo from '@/assets/images/socialAuthIcons/FacebookLogo.svg';
import GoogleLogo from '@/assets/images/socialAuthIcons/GoogleLogo.svg';
import { SC_CONFIG } from "@/supacharger/supacharger-config"; // Corrected import

export default function AuthProviderButtons() {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {SC_CONFIG.AUTH_PROVDERS_ENABLED.google ? (
        <a
          href='#'
          className='shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
        >
          <GoogleLogo className="w-4 flex inline h-4" />
          <span className=' font-semibold'>Google</span>
        </a>
      ) : null}

      {SC_CONFIG.AUTH_PROVDERS_ENABLED.facebook ? (
        <a
          href='#'
          className='shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
        >
          <FacebookLogo className="w-4 flex inline h-4" />
          <span className=' font-semibold'>Facebook</span>
        </a>
      ) : null}
    </div>
  );
}
