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
  SITE_TITLE: 'DealTree',
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
    '/account/reset-password',
    // API
    '/api/webhooks',
    '/api/account/request-password-reset',
    '/api/account/resend-activation-link',
    '/api/account/update-password',
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
   * Registration Settings
   * ==========
   *
   */

    // set to false if you turn off email verification in Supabase.
    /// @todo this does nothing yet!
  EMAIL_VERIFY_ENABLED: true,

  // where to redirect the user when their account is confirmed via OTP or link - keep the parameter ?account_confirmed=1 
  // an example handler is in src/components/sc_demo/sc_user-dash.tsx
  ACCOUNT_CONFIRMED_PATH: '/?account_confirmed=1',
      /**
   * ==========
   * Secuirty
   * ==========
   */

  /**
   *
   * Password Strength Settings
   *
    Used for front end, server side password validation on signup and password change

    Options:
    no_reuqired: no required chars
    letters_digits: letters and digits
    lower_upper_letters_digits
    lower_upper_letters_digits_symbols
  */
  PASSWORD_REQUIREMENTS: 'lower_upper_letters_digits',
  // minimum length
  PASSWORD_MINIMUM_LENGTH: 8,
  // if set the above two will be ignored. A generic failed message will be returned without reason if criteria not met.
  // eg string '^999' checks that the password must start with 999 and no further evaluation
  PASSWORD_CUSTOM_REGEX: null,
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
