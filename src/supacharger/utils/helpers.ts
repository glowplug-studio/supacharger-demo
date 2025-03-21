import { useTranslations } from 'next-intl';

/** ========== 
 *   
 * Supacharger Helpers
 * 
 * ========== */

/**
 *  Returns the full URL by appending the provided path to the base URL.
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
 * Returns a next-intl Message string based on the current locale.
 */
export function supabaseErrorCodeLocalisation(response: string) {
    const t = useTranslations('SupabaseErrorCodes');
    let messageId = 'genericError';

    if (response === 'invalid_credentials')     messageId = 'invalidCredentials';
    if (response === 'email_not_confirmed')     messageId = 'emailNotConfirmed';
    if (response === 'email_address_invalid')   messageId = 'invalidEmail';
    if (response === 'user_not_found')          messageId = 'userNotFound';
    if (response === 'over_request_rate_limit') messageId = 'overLimit';
    if (response === 'user_banned')             messageId = 'userBanned';
    if (response === 'otp_expired')             messageId = 'otpExpired';
    if (response === 'unexpected_failure' || response === 'request_timeout') messageId = 'genericError';

    //@TODO theres a lot more to handle! and this doesnt currently work 

    return t(messageId); // Pass the variable directly
}

