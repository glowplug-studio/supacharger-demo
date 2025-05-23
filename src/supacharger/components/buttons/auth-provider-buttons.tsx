import { useTranslations } from 'next-intl';
import type React from "react";

import FacebookLogo from '@/assets/images/socialAuthIcons/FacebookLogo.svg';
import GoogleLogo from '@/assets/images/socialAuthIcons/GoogleLogo.svg';
import { SC_CONFIG } from "@/supacharger/supacharger-config";

export default function AuthProviderButtons() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {SC_CONFIG.AUTH_PROVDERS_ENABLED.google && (
          <a
            href="#"
            className="shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent transition-all"
          >
            <GoogleLogo className="w-4 h-4" />
            <span className="font-semibold">Google</span>
          </a>
        )}

        {SC_CONFIG.AUTH_PROVDERS_ENABLED.facebook && (
          <a
            href="#"
            className="shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent transition-all"
          >
            <FacebookLogo className="w-4 h-4" />
            <span className="font-semibold">Facebook</span>
          </a>
        )}

        {/* Example extra buttons for demonstration */}
        <a
          href="#"
          className="shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent transition-all"
        >
          <FacebookLogo className="w-4 h-4" />
          <span className="font-semibold">Facebook</span>
        </a>

        <a
          href="#"
          className="shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent transition-all"
        >
          <FacebookLogo className="w-4 h-4" />
          <span className="font-semibold">Facebook</span>
        </a>

        <a
          href="#"
          className="shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent transition-all"
        >
          <FacebookLogo className="w-4 h-4" />
          <span className="font-semibold">Facebook</span>
        </a>

       
      </div>
    </div>
  );
}
