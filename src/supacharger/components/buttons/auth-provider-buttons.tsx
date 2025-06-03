import { useTranslations } from 'next-intl';
import type React from 'react';

import FacebookLogo from '@/assets/images/socialAuthIcons/FacebookLogo.svg';
import GoogleLogo from '@/assets/images/socialAuthIcons/GoogleLogo.svg';
import { SC_CONFIG } from '@/supacharger/supacharger-config';

import { UIDivider } from '../ui/divider';

export default function AuthProviderButtons() {
  const anyProviderEnabled = Object.values(SC_CONFIG.AUTH_PROVDERS_ENABLED).some(Boolean);

  const anchorClasses =
    'shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50 focus-visible:ring-transparent';

  // Array of provider configs
  const providers = [
    {
      key: 'google',
      enabled: SC_CONFIG.AUTH_PROVDERS_ENABLED.google,
      label: 'Google',
      Logo: GoogleLogo,
    },
    {
      key: 'facebook',
      enabled: SC_CONFIG.AUTH_PROVDERS_ENABLED.facebook,
      label: 'Facebook',
      Logo: FacebookLogo,
    },
    // Add more providers here as needed
  ];

  if (!anyProviderEnabled) {
    return null;
  }

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {providers
            .filter((provider) => provider.enabled)
            .map(({ key, label, Logo }) => (
              <a href="#" className={anchorClasses} key={key}>
                <Logo className="h-4 w-4" />
                <span className="font-semibold">{label}</span>
              </a>
            ))}
        </div>
      </div>
      <UIDivider className="my-6" />
    </>
  );
}
