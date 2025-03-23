/**
 * ==========
 *    ___
 *   /  _|__ _ _ __ __ _ __| |_ __ _ _ _ __ _ ___ _ ___
 *  \__ \ || | '_ \/ _` / _| ' \/ _` | '_/ _` / -_ ) '_/
 *  |___/\_,_| .__/\__,_\__|_||_\__,_|_| \__, \___|_|
 *           |_|                         |___/
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

  //@toto this should be translatable! this has been done using en.json Global and in  src/app/(supacharger)/(unauthenticated)/account/login/page.tsx
  SITE_TITLE: 'Supacharger',
  SITE_DESCRIPTION: 'Start your next project without reinventing the wheel.',

  /**
   * ==========
   * PATHS
   * ==========
   *
   * Always include the leading slash!
   */
  // protect all routes except the exceptions in NO_SESSION_USER_ALLOWED_PATHS
  AUTH_ONLY_APP: true,
   // paths users without auth sessions can acess
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
   // Paths authenticated users can not access
  SESSION_USER_DISALLOWED_PATHS: [
    '/account/login',
    '/account/create',
    '/account/login-magic',
  ],
   // Which path users are redirected to when requesting an auth protected page
  NO_SESSION_USER_REDIRECT_DESTINATION: '/account/login',
   // Where to go after successful authentication flow
  LOGIN_REDIRECT_DESTINATON: '/',
   // Which path is considered "home" for unauthenticated users
  NO_SESSION_HOME_PATH: '/',
  // Which path is considered "home" for authenticated users
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
