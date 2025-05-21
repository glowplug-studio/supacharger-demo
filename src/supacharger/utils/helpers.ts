import { SC_CONFIG } from '@/supacharger/supacharger-config';

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

interface PasswordValidationResult {
  valid: boolean;
  message: string;
}

// --- Individual Validators (return boolean only) ---

function validateNoRequired(_password: string): boolean {
  return true;
}

function validateLettersDigits(password: string): boolean {
  return /(?=.*[A-Za-z])(?=.*\d)/.test(password);
}

function validateLowerUpperLettersDigits(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password);
}

function validateLowerUpperLettersDigitsSymbols(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/.test(password);
}

export {
  validateLettersDigits,
  validateLowerUpperLettersDigits,
  validateLowerUpperLettersDigitsSymbols,
  validateNoRequired};

// --- Main Pass Eval Function ---

export function evaluatePasswordStrength(password: string): PasswordValidationResult {
  const requirements = SC_CONFIG.PASSWORD_REQUIREMENTS;
  const minLength = SC_CONFIG.PASSWORD_MINIMUM_LENGTH;
  const customRegex = SC_CONFIG.PASSWORD_CUSTOM_REGEX;

  // Custom regex takes precedence
  if (customRegex) {
    const regex = new RegExp(customRegex);
    if (regex.test(password)) {
      return { valid: true, message: 'valid' };
    }
    return { valid: false, message: 'password_failed_regex_evaluation' };
  }

  // Minimum length check
  if (password.length < minLength) {
    return { valid: false, message: 'password_too_short' };
  }

  // Dispatch to the right validator
  switch (requirements) {
    case 'no_required':
      return { valid: validateNoRequired(password), message: 'valid' };
    case 'letters_digits':
      return validateLettersDigits(password)
        ? { valid: true, message: 'valid' }
        : { valid: false, message: 'must_contain_letter_digit' };
    case 'lower_upper_letters_digits':
      return validateLowerUpperLettersDigits(password)
        ? { valid: true, message: 'valid' }
        : { valid: false, message: 'must_contain_lower_letter_upper_letter_digit' };
    case 'lower_upper_letters_digits_symbols':
      return validateLowerUpperLettersDigitsSymbols(password)
        ? { valid: true, message: 'valid' }
        : { valid: false, message: 'must_contain_lower_letter_upper_letter_digit_symbol' };
    default:
      return { valid: false, message: 'Invalid password requirements configuration.' };
  }
}

/**
 * Returns a next-intl Message string based on the current locale.
 */
export function supabaseErrorCodeLocalisation(response: string) {
  let messageId = 'genericError';

  if (response == 'invalid_credentials') messageId = 'invalidCredentials';
  if (response === 'email_not_confirmed') messageId = 'emailNotConfirmed';
  if (response === 'email_address_invalid') messageId = 'invalidEmail';
  if (response === 'user_not_found') messageId = 'userNotFound';
  if (response === 'over_request_rate_limit') messageId = 'overLimit';
  if (response === 'user_banned') messageId = 'userBanned';
  if (response === 'otp_expired') messageId = 'otpExpired';
  if (response === 'unexpected_failure' || response === 'request_timeout') messageId = 'genericError';

  //@TODO theres a lot more to handle! and this doesnt currently work

  return messageId; // Pass the variable directly
}
