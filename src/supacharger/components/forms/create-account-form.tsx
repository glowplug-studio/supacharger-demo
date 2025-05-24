'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CircleArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

import { Input } from '@/components/ui/input';
import { createUserByEmailPassword } from '@/lib/supabase/supacharger/supabase-auth';
import PasswordValidationIndicator from '@/supacharger/components/forms/password-validation-indicator';
import { SCP_REGISTRY } from '@/supacharger/plugins/registry';
import { SC_CONFIG } from '@/supacharger/supacharger-config';

import { UIDivider } from '../ui/divider';

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

  // Translations
  const tAuthTerms = useTranslations('AuthTerms');
  const tCreateAccountFormComponent = useTranslations('CreateAccountFormComponent');

  // Handlers
  const handleTogglePassword = () => setShowPassword((v) => !v);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!passwordSectionOpen && e.target.value.length > 0) {
      setPasswordSectionOpen(true);
    }
    // If user deletes all, keep open (do nothing)
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const result = await createUserByEmailPassword(formData);
      if (result?.error) {
        toast.error('Failed to create account: ' + result.error);
        setError(result.error.message || String(result.error));
      } else {
        toast.success('Account created successfully');
        setAccountCreated(true);
        setError(null);
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error('Failed to create account');
      setError(error?.message || 'Unknown error');
    }
  };

  return (
    <>
      {/* Social Auth Buttons + Divider */}
      {AuthProviderButtons && (
        <div className="social-auth-container">
          <AuthProviderButtons />
          <UIDivider text={tCreateAccountFormComponent('orCreateAccountWithEmail')} className="my-6" />
        </div>
      )}

      {/* Email Signup Form */}
      {!accountCreated && (
        <form onSubmit={handleSubmit} className={AuthProviderButtons ? 'mt-6' : ''}>
          <div className='my-2'>
            <label htmlFor='email' className='text-md block px-1'>
              {tAuthTerms('emailAddress')}
            </label>
            <div className='mt-2'>
              <Input
                id='email'
                name='email'
                type='email'
                required
                autoComplete='email'
                className='input'
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div
            id="sc_passwords-submit"
            className={`
              transition-all duration-500
              ${passwordSectionOpen ? 'max-h-[1000px]' : 'max-h-0 overflow-hidden'}
            `}
          >
            <div className='mt-2 mb-4'>
              {/* FLEX ROW: PasswordValidationIndicator left, Eye icon right */}
              <div className="mt-2 flex items-center">
                <div className="flex-1">
                  <PasswordValidationIndicator
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name='password'
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                  />
                </div>
                <button
                  type='button'
                  className='ml-2 text-gray-500 hover:text-gray-700'
                  aria-label='Show password'
                  onClick={handleTogglePassword}
                  tabIndex={0}
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
                <div className="mt-2">
                  <Input
                    id='password-again'
                    name='password-again'
                    type='password'
                    required
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                </div>
              </div>
            )}
            {error && <p className='error'>{error}</p>}
            {BrevoNewsletterRegistrationCheckbox && <BrevoNewsletterRegistrationCheckbox />}
            <div className='mt-4'>
              <button id='sc_signup-button' type='submit' className='btn w-full bg-primary text-white hover:bg-teal-800'>
                {tAuthTerms('signUp')} <CircleArrowRight size={18} />
              </button>
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

      {/* Login Link */}
      <div className='flex flex-col gap-2 px-1 md:flex-row md:items-center md:justify-between md:gap-0'>
        <div>
          <span className='text-sm font-normal'>{tCreateAccountFormComponent('iAlreadyHaveAnAccount')} </span>
          <Link href='/account/login' className='text-sm font-normal'>
            <span className='font-semibold'>{tAuthTerms('logIn')}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
