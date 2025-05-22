import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

/**
 * Gets the current Authenticated User
 * @param {string|null} jwt - Optional JWT access token.
 * @param {boolean} [withClient=false] - If true, also return the Supabase client object.
 * @returns {Object} The user data object or an error object (and optionally the Supabase client).
 */
export async function getUser(jwt: string | null = null, withClient: boolean = false) {
  const supabase = await createClient();
  // Pass the JWT if provided, otherwise call without arguments
  const { data, error } = jwt
    ? await supabase.auth.getUser(jwt)
    : await supabase.auth.getUser();

  if (error) {
    console.log(error);
    return withClient ? { error, supabase } : error;
  }

  return withClient ? { data, supabase } : data;
}


/**
 * Gets the Current user session - note DO NOT TRUST the user data in this it's taken directly from the clients localstorage and can be tampered with.
 * https://supabase.com/docs/reference/javascript/auth-getsession
 * @returns {Object} The user data object or an error object.
 */
export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.log(error);
    return error;
  }

  return data;
}

/**
 * Check if there is a user session
 * @returns {boolean} `true` if the user session is valid, `false`
 */
export async function isLoggedIn() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    return false;
  }

  return data.user.aud == 'authenticated' ? true : false; // (data == 'authenticated')? true : false;
}
