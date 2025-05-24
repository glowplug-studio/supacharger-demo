'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

import { Input } from '@/components/ui/input';
import { createUserByEmailPassword } from '@/lib/supabase/supacharger/supabase-auth';
import SaveButton from '@/supacharger/components/buttons/form-save-button';
import PasswordValidationIndicator from '@/supacharger/components/forms/password-validation-indicator';
import { SCP_REGISTRY } from '@/supacharger/plugins/registry';
import { SC_CONFIG } from '@/supacharger/supacharger-config';
import { isValidEmail, supabaseErrorCodeLocalisation } from '@/supacharger/utils/helpers';

import { OtpFieldsForm } from './otp-fields-verify-form';

// Dynamically import social and Brevo components if enabled
const AuthProviderButtons = Object.values(SC_CONFIG.AUTH_PROVDERS_ENABLED).some(Boolean)
  ? dynamic(() => import('@/supacharger/components/buttons/auth-provider-buttons'), { ssr: true })
  : null;

const BrevoNewsletterRegistrationCheckbox = SCP_REGISTRY.BREVO.ENABLED
  ? dynamic(() => import('@/supacharger/plugins/scp_brevo/brevoNewsletterRegistrationCheckbox'), { ssr: true })
  : null;

export function CreateAccountForm() {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);
  const [passwordSectionOpen, setPasswordSectionOpen] = useState(false);

  // Track password validation state
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  // SaveButton state renamed
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  // Translations
  const tAuthTerms = useTranslations('AuthTerms');
  const tGlobalUI = useTranslations('GlobalUI');
  const tCreateAccountFormComponent = useTranslations('CreateAccountFormComponent');
  const tSupabaseErrorCodes = useTranslations('SupabaseErrorCodes');
  const tEvaluatePasswordStrengthComponent = useTranslations('evaluatePasswordStrengthComponent');

  // Handlers
  const handleTogglePassword = () => setShowPassword((v) => !v);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!passwordSectionOpen && e.target.value.length > 0) {
      setPasswordSectionOpen(true);
    }
  };

  const handleCreateAccountRequest = async () => {
    // Always require email
    if (!email) {
      toast.error(tCreateAccountFormComponent('missingEmail'), SC_CONFIG.TOAST_CONFIG);
      return;
    }
    // Validate email format
    if (!isValidEmail(email)) {
      toast.error(tCreateAccountFormComponent('invalidEmail'), SC_CONFIG.TOAST_CONFIG);
      return;
    }

    // Always require password strength
    if (!passwordIsValid) {
      toast.error(tEvaluatePasswordStrengthComponent('passwordNotStrongEnough'), SC_CONFIG.TOAST_CONFIG);
      return;
    }

    // Only validate retype/match if the eye is NOT toggled on
    if (!showPassword) {
      if (!password) {
        toast.error(tCreateAccountFormComponent('missingPassword'), SC_CONFIG.TOAST_CONFIG);
        return;
      }
      if (!retypePassword) {
        toast.error(tCreateAccountFormComponent('missingRetypePassword'), SC_CONFIG.TOAST_CONFIG);
        return;
      }
      if (password !== retypePassword) {
        toast.error(tCreateAccountFormComponent('passwordMismatch'), SC_CONFIG.TOAST_CONFIG);
        return;
      }
    }

    setIsSubmitting(true);
    setIsSubmitSuccess(false);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const result = await createUserByEmailPassword(formData);
      setIsSubmitting(false);

      if (result?.error) {
        toast.error(
          tSupabaseErrorCodes(supabaseErrorCodeLocalisation('signup_auth_api_error')),
          SC_CONFIG.TOAST_CONFIG
        );
        setIsSubmitSuccess(false);
        console.log(result);
      } else {
        if (
          result?.data?.user?.id &&
          Array.isArray(result.data.user.identities) &&
          result.data.user.identities.length === 0
        ) {
          toast.warning(tAuthTerms('accountAlreadyExists'), SC_CONFIG.TOAST_CONFIG);
        } else {
          toast.success(tAuthTerms('createAccountSuccess'), SC_CONFIG.TOAST_CONFIG);
          setAccountCreated(true);
          setIsSubmitSuccess(true);
        }
        console.log(result);
      }
    } catch (error: any) {
      setIsSubmitting(false);
      setIsSubmitSuccess(false);
      toast.error(tSupabaseErrorCodes('genericError'), SC_CONFIG.TOAST_CONFIG);
    }
  };

  return (
    <>
      {/* Social Auth Buttons + Divider */}
      {!accountCreated && AuthProviderButtons && (
        <div className='social-auth-container'>
          <AuthProviderButtons />
        </div>
      )}

      {/* Email Signup Form */}
      {!accountCreated && (
        <form onSubmit={(e) => e.preventDefault()} className={AuthProviderButtons ? 'mt-6' : ''}>
          <div className='my-2'>
            <label htmlFor='email' className='text-md block px-1'>
              {tAuthTerms('emailAddress')}
            </label>
            <div className='mt-2 px-1'>
              <Input
                id='email'
                name='email'
                type='email'
                maxLength={30}
                required
                autoComplete='email'
                className='input'
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div
            id='sc_passwords-submit'
            className={`
              transition-all duration-500
              ${passwordSectionOpen ? 'max-h-[1000px]' : 'max-h-0 overflow-hidden'}
            `}
          >
            <div className='mb-4 mt-2'>
              {/* FLEX ROW: PasswordValidationIndicator left, Eye icon right */}
              <div className='mt-2 flex items-center'>
                <div className='flex-1'>
                  <PasswordValidationIndicator
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name='password'
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    onValidationChange={(isValid) => setPasswordIsValid(isValid)}
                  />
                </div>
                <button
                  type='button'
                  className='ml-2 mt-4 text-gray-400 hover:text-gray-800'
                  aria-label='Show password'
                  onClick={handleTogglePassword}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {/* Retype password field (hide when showPassword is true) */}
            {!showPassword && (
              <div className='my-2'>
                <label htmlFor='password-again' className='text-md block px-1'>
                  {tAuthTerms('retypePassword')}
                </label>
                <div className='mt-2 px-1'>
                  <Input
                    id='password-again'
                    name='password-again'
                    type='password'
                    maxLength={30}
                    required
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                </div>
              </div>
            )}
            {BrevoNewsletterRegistrationCheckbox && <BrevoNewsletterRegistrationCheckbox />}
            <div className='mt-4'>
              <SaveButton
                type='button'
                className='w-full h-12'
                onClick={handleCreateAccountRequest}
                isLoading={isSubmitting}
                isSuccess={isSubmitSuccess}
                initialLabel={tAuthTerms('signUp')}
                savingLabel={tGlobalUI('buttonThinking')}
                completeLabel={tGlobalUI('buttonSaved')}
              />
            </div>
          </div>
        </form>
      )}

      {/* OTP Form */}
      {accountCreated && (
        <div id='sc_otp-fields'>
          <OtpFieldsForm email={email} />
        </div>
      )}

      {/* Login instead Link */}
      {!accountCreated && (
        <div className='mt-4 flex flex-col gap-2 px-1 md:flex-row md:items-center md:justify-between md:gap-0'>
          <div>
            <span className='text-sm font-normal'>{tCreateAccountFormComponent('iAlreadyHaveAnAccount')} </span>
            <Link href='/account/login' className='text-sm font-normal'>
              <span className='font-semibold'>{tAuthTerms('logIn')}</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
