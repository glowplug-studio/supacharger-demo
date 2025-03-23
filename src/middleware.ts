import { type NextRequest } from 'next/server';
import { updateSession } from '@/libs/supabase/supabase-middleware-client';
import {
    SC_NO_SESSION_USER_ALLOWED_PATHS,
    SC_SESSION_USER_DISALLOWED_PATHS,
    SC_NO_SESSION_REDIRECT_DESTINATION,
    SC_LOGIN_REDIRECT_DESTINATON,
  } from '@/supacharger/supacharger-config';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}



export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};