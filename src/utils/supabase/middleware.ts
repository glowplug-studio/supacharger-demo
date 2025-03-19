import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import {
  noSessionUserAllowedPaths,
  sessionUserDisallowedPaths,
  unauthedRedirectDestinaton,
  authedRedirectDestinaton,
} from '@/supacharger/config/protected-routes';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if the current path is in the allowed paths
  const pathname = request.nextUrl.pathname;
  const isAllowedPath = noSessionUserAllowedPaths.some((path) => {
    // Check for exact matches first
    if (path === pathname) return true;
    // Ignore root for startsWith check
    if (path === '/') return false; 
    return pathname.startsWith(path);
  });

  // Redirect logged-in users from restricted paths
  if (user && sessionUserDisallowedPaths.some((path) => {
    // Check for exact matches first
    if (path === pathname) return true;
    return pathname.startsWith(path);
  })) {
    const url = request.nextUrl.clone();
    url.pathname = authedRedirectDestinaton;
    return NextResponse.redirect(url);
  }

  if (!user && !isAllowedPath) {
    // No user and not an allowed path
    const url = request.nextUrl.clone();
    url.pathname = unauthedRedirectDestinaton;
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
