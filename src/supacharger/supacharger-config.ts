/**
 * ==========
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
 * Supacharger Configuration
 * ==========
 */
export const SC_CONFIG = {
  /**
   * ==========
   * STRINGS
   * ==========
   */
  SITE_TITLE: 'Supacharger',
  SITE_DESCRIPTION: 'Start your next project without reinventing the wheel. REPLACE_ME',

  /**
   * ==========
   * PATHS
   * ==========
   *
   * Always include the leading slash!
   */
  AUTH_ONLY_APP: true,
  NO_SESSION_USER_ALLOWED_PATHS: [
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
  ],
  SESSION_USER_DISALLOWED_PATHS: [
    '/account/login',
    '/account/create',
    '/account/login-magic',
  ],
  NO_SESSION_USER_REDIRECT_DESTINATION: '/account/login',
  LOGIN_REDIRECT_DESTINATON: '/',
  NO_SESSION_HOME_PATH: '/',
  SESSION_HOME_PATH: '/',

  /**
   * ==========
   * AUTHENTICATION Providers
   * ==========
   *
   * Only the providers listed here are supported at this point in time.
   */
  AUTH_PROVDERS_ENABLED: {
    google: true,
    facebook: false,
  },
};
