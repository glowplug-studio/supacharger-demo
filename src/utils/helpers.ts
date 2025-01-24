import { createClient } from '@/utils/supabase/server';
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 *  Get the base URL as a clean 
 * @returns the base URL string
 * */ 
export function getURL(path = '') {
    // Get the base URL, defaulting to localhost if not set.
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'http://localhost:3000';
    // Ensure HTTPS for non-localhost URLs and format the path.
    const formattedURL = baseURL.startsWith('http') ? baseURL : `https://${baseURL}`;
    const cleanPath = path.replace(/^\/+/, '');
  
    // Return the full URL.
    return cleanPath ? `${formattedURL}/${cleanPath}` : formattedURL;
  }

  /**
 * Gets the user session
 * @returns {Object} The user data object or an error object.
 */
export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    return (error);
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
    return (false);
  }
  
  return (data.user.aud == 'authenticated') ? true : false; // (data == 'authenticated')? true : false;
}
