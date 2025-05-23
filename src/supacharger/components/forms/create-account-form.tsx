'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CircleArrowRight, Eye, EyeOff, Mail } from 'lucide-react';
import type React from 'react';
import { toast } from 'react-toastify';

import { Input } from '@/components/ui/input';
import PasswordValidationIndicator from '@/supacharger/components/forms/password-validation-indicator';
import { createUserByEmailPassword } from '@/supacharger/libs/supabase/supabase-auth';
import { SCP_REGISTRY } from '@/supacharger/plugins/registry';
import { SC_CONFIG } from '@/supacharger/supacharger-config';

import { UIDivider } from '../ui/divider';

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
  const [error, setError] = useState(null);
  // If no social auth buttons, show the email form by default
  const [showForm, setShowForm] = useState(!renderAuthProviderButtons);
  const [isInitialRender, setIsInitialRender] = useState(true);

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
        toast.error('Failed to create account' + result.error);
      } else {
        toast.success('Account created successfully');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create account');
    }
  };

  const formVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'circInOut',
      },
    },
  };

  const passwordContainerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    // Mark that initial render is complete
    setIsInitialRender(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!showForm && renderAuthProviderButtons && (
          <motion.div
            variants={formVariants}
            initial={isInitialRender ? false : 'hidden'}
            animate='visible'
            exit='hidden'
            style={{ overflow: 'hidden' }}
            className='social-auth-container'
          >
            {AuthProviderButtons && (
              <div style={{ opacity: 1 }}>
                <AuthProviderButtons />
              </div>
            )}

            <UIDivider text={tCreateAccountFormComponent('orCreateAccountWithEmail')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Only show the toggle button if we have social auth buttons */}
      {renderAuthProviderButtons && (
        <button
          type='button'
          onClick={toggleForm}
          className={`btn w-full ${showForm ? 'bg-gray-100 text-gray-700' : 'bg-primary text-white'}`}
        >
          {showForm
            ? tCreateAccountFormComponent('hideEmailFormButtonText')
            : tCreateAccountFormComponent('showEmailFormButtonText')}
          {showForm ? <ArrowLeft size={18} /> : <Mail size={18} />}
        </button>
      )}
      <AnimatePresence>
        {showForm && (
          <motion.div
            variants={formVariants}
            initial={isInitialRender ? false : 'hidden'}
            animate='visible'
            exit='hidden'
            style={{ overflow: 'hidden' }}
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

              <AnimatePresence>
                {!showPassword && (
                  <motion.div
                    variants={passwordContainerVariants}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    style={{ overflow: 'hidden' }}
                    className='my-2'
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>

              {error && <p className='error'>{error}</p>}
              {/**
               * BREVOCODE
               */}
              {SCP_REGISTRY.BREVO.ENABLED && <BrevoNewsletterRegistrationCheckbox />}
              <div className='mt-4'>
                <button type='submit' className='btn w-full bg-primary text-white hover:bg-teal-800'>
                  {tAuthTerms('signUp')} <CircleArrowRight size={18} className='' />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

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
