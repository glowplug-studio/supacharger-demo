'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, CircleArrowRight, Eye, EyeOff, Mail } from 'lucide-react';
import { toast } from 'react-toastify';

import { Input } from '@/components/ui/input';
import { createUserByEmailPassword } from '@/lib/supabase/supacharger/supabase-auth';
import PasswordValidationIndicator from '@/supacharger/components/forms/password-validation-indicator';
import { SCP_REGISTRY } from '@/supacharger/plugins/registry';
import { SC_CONFIG } from '@/supacharger/supacharger-config';

import { UIDivider } from '../ui/divider';

import { OtpFieldsForm } from './otp-fields-verify-form';

const renderAuthProviderButtons = Object.values(SC_CONFIG.AUTH_PROVDERS_ENABLED).some((enabled) => enabled);

const AuthProviderButtons = renderAuthProviderButtons
  ? dynamic(() => import('@/supacharger/components/buttons/auth-provider-buttons'), {
      ssr: true,
    })
  : null;

/**
 * BREVOCODE
 */
const BrevoNewsletterRegistrationCheckbox = dynamic(
  () => import('@/supacharger/plugins/scp_brevo/brevoNewsletterRegistrationCheckbox'),
  {
    ssr: true,
  }
);

export function CreateAccountForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);
  // If no social auth buttons, show the email form by default
  const [showForm, setShowForm] = useState(!renderAuthProviderButtons);

  const tAuthTerms = useTranslations('AuthTerms');
  const tCreateAccountFormComponent = useTranslations('CreateAccountFormComponent');

  const handleToggle = () => {
    setShowPassword(!showPassword);
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
        setAccountCreated(true); // Show OTP form
        setError(null);
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error('Failed to create account');
      setError(error?.message || 'Unknown error');
    }
  };

  // Only height transition, no fade
  const sectionBase =
    'transition-all duration-700 ease-in overflow-hidden absolute top-0 left-0 w-full';
  const sectionVisible = 'max-h-[1000px] pointer-events-auto';
  const sectionHidden = 'max-h-0 pointer-events-none';

  // For stacking the forms
  const containerBase = 'relative min-h-[420px]'; // Adjust min-h as needed

  return (
    <>
      {/* Social Auth Buttons + Divider, always mounted */}
      {renderAuthProviderButtons && (
        <div
          className={`transition-all duration-700 ease-in overflow-hidden ${
            !showForm ? 'max-h-[1000px] pointer-events-auto' : 'max-h-0 pointer-events-none'
          } social-auth-container`}
        >
          {AuthProviderButtons && (
            <div>
              <AuthProviderButtons />
            </div>
          )}
          <UIDivider text={tCreateAccountFormComponent('orCreateAccountWithEmail')} className="my-6" />
        </div>
      )}

      {/* Only show the toggle button if we have social auth buttons */}
      {renderAuthProviderButtons && (
        <button
          type='button'
          onClick={() => setShowForm(!showForm)}
          className={`btn w-full ${showForm ? 'bg-gray-100 text-gray-700' : 'bg-primary text-white'}`}
        >
          {showForm
            ? tCreateAccountFormComponent('hideEmailFormButtonText')
            : tCreateAccountFormComponent('showEmailFormButtonText')}
          {showForm ? <ArrowLeft size={18} /> : <Mail size={18} />}
        </button>
      )}

      {/* Both forms are always in the DOM, transitions fire simultaneously */}
      <div className={containerBase} style={{ minHeight: 420, position: 'relative' }}>
        {/* Signup Form */}
        <div
          className={`${sectionBase} ${!accountCreated && showForm ? sectionVisible : sectionHidden}`}
          style={{ zIndex: !accountCreated && showForm ? 2 : 1 }}
        >
          <form onSubmit={handleSubmit} className={renderAuthProviderButtons ? 'mt-6' : ''}>
            <div className='my-2'>
              <label htmlFor='email' className='block text-gray-700'>
                {tAuthTerms('emailAddress')}
              </label>
              <div className='mt-2'>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  required
                  autoComplete='email'
                  className='focus:shadow-outline focus focus:outline-hidden w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='my-2'>
              <div className='flex items-center justify-between'>
                <button
                  type='button'
                  className='text-gray-500 hover:text-gray-700'
                  aria-label='Show password'
                  onClick={handleToggle}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className='mt-2'>
                <PasswordValidationIndicator
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name='password'
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                />
              </div>
            </div>
            {/* Retype password field (hide when showPassword is true) */}
            <div
              className={`transition-all duration-700 ease-in overflow-hidden ${
                !showPassword ? 'max-h-[1000px] pointer-events-auto' : 'max-h-0 pointer-events-none'
              } my-2`}
            >
              {!showPassword && (
                <>
                  <label htmlFor='password-again' className='block text-gray-700'>
                    {tAuthTerms('retypePassword')}
                  </label>
                  <div>
                    <Input
                      id='password-again'
                      name='password-again'
                      type='password'
                      required
                      className='focus:shadow-outline focus focus:outline-hidden mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700'
                      value={retypePassword}
                      onChange={(e) => setRetypePassword(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
            {error && <p className='error'>{error}</p>}
            {/* BREVOCODE */}
            {SCP_REGISTRY.BREVO.ENABLED && <BrevoNewsletterRegistrationCheckbox />}
            <div className='mt-4'>
              <button type='submit' className='btn w-full bg-primary text-white hover:bg-teal-800'>
                {tAuthTerms('signUp')} <CircleArrowRight size={18} className='' />
              </button>
            </div>
          </form>
        </div>
        {/* OTP Form */}
        <div
          id='sc_otp-fields'
          className={`${sectionBase} ${accountCreated ? sectionVisible : sectionHidden}`}
          style={{ zIndex: accountCreated ? 2 : 1 }}
        >
          <OtpFieldsForm email={email} />
        </div>
      </div>

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
