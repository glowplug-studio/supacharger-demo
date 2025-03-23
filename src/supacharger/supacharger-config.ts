/** ==========
 *    ___ _
 *   / __|_ _ _ __ __ _ __| |_ __ _ _ _ __ _ ___ _ _
 *  \__ \ || | '_ \/ _` / _| ' \/ _` | '_/ _` / -_) '_|
 *  |___/\_,_| .__/\__,_\__|_||_\__,_|_| \__, \___|_|
 *           |_|          |___/
 *
 * Super, Supacharger Project Configuration
 * ========== */

/**
 * ==========
 * STRINGS
 * ==========
 */
export const siteTitle = 'Supacharger';
export const siteDescription = 'Start your next project without reinventing the wheel. REPLACE_ME';

/**
 * ==========
 * PATHS
 * ==========
 *
 * ALways include the leadng slash!
 */

// Enable/Disable app-wide protection
export const protectApp = true;

// Define an array of allowed paths that do not require a session
export const noSessionUserAllowedPaths = [
  '/account/login',
  '/account/create',
  '/account/login-magic',
  // API
  '/api/webhooks',
  // Marketing
  '/pricing',
  '/about',
  // Directory and Profiles
  '/user/:username',
  // Root - remove if all routes are protected.
  '/',
  // Add any other paths you want to allow
  // Don't touch below - auth endpoints
  '/auth/confirm',
  '/auth/callback',
];

// Define paths that should redirect logged-in users - THESE ARE IGNORED IF protectApp IS TRUE
export const sessionUserDisallowedPaths = [
  '/account/login',
  '/account/create',
  '/account/login-magic',
];

// Define where non-authenticated users are redirected to to authenticated
export const unauthedRedirectDestinaton = '/account/login';

// Define where authenticated users are redirected to when hitting a unauthed user only page.
export const authedRedirectDestinaton = '/';

// set where the user redirects to when going 'home' with and without a session
export const unauthedHomePath = '/';
export const authedHomePath = '/';

/**
 * ==========
 * AUTHENTICATION Providers
 * ==========
 *
 * Only the providers listed here are supported at this point in time.
 */
export const authFlowEnabled = {
  google: false,
  apple: false,
  facebook: false,
};
