import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { NextResponse } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('supacharger_locale')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
      return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
      const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
      if (locales.includes(preferredLocale)) {
          return preferredLocale;
      }
  }

  return defaultLocale;
}

export async function middleware(request: NextRequest) {
    const response = await updateSession(request);
    const locale = getLocale(request);

    if (!request.cookies.get('supacharger_locale')) {
        response.cookies.set('supacharger_locale', locale, { path: '/' });
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
