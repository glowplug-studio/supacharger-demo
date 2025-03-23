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
export const SC_SITE_TITLE = 'Supacharger';
export const SC_SITE_DESCRIPTION = 'Start your next project without reinventing the wheel. REPLACE_ME';

/**
 * ==========
 * PATHS
 * ==========
 *
 * ALways include the leadng slash!
 */

// Enable/Disable app-wide protection
export const SC_AUTH_ONLY_APP = true;

// Define an array of allowed paths that do not require a session
export const SC_NO_SESSION_USER_ALLOWED_PATHS = [
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

// Define paths that should redirect logged-in users - THESE ARE IGNORED IF SC_AUTH_ONLY_APP IS TRUE
export const SC_SESSION_USER_DISALLOWED_PATHS = [
  '/account/login',
  '/account/create',
  '/account/login-magic',
];

// Define where non-authenticated users are redirected to to authenticated
export const SC_NO_SESSION_REDIRECT_DESTINATION = '/account/login';

// Define where authenticated users are redirected to when hitting a unauthed user only page.
export const SC_LOGIN_REDIRECT_DESTINATON = '/';

// set where the user redirects to when going 'home' with and without a session
export const SC_NO_SESSION_HOME_PATH = '/';
export const SC_SESSION_HOME_PATH = '/';

/**
 * ==========
 * AUTHENTICATION Providers
 * ==========
 *
 * Only the providers listed here are supported at this point in time.
 */
export const SC_AUTH_PROVDERS_ENABLED = {
  google: false,
  apple: false,
  facebook: false,
};
