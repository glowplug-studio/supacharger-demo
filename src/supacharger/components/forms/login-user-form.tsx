'use client';

/** ==========
 *
 * Supacharger - Create Account Form
 *
 * ========== */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

import { loginUser } from '@/app/(supacharger)/auth-actions';
import InlineLoader from '@/assets/images/ui/InlineLoader.svg';
import SaveButton from '@/supacharger/components/buttons/form-save-button';
import { isValidEmail, supabaseErrorCodeLocalisation } from '@/supacharger/utils/helpers';

export function LoginUserForm() {
  const tAuthTerms = useTranslations('AuthTerms');
  const tSupabaseErrorCodes = useTranslations('SupabaseErrorCodes');
  const tGlobalUI = useTranslations('GlobalUI');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailNotConfirmed, setShowEmailNotConfirmed] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setShowEmailNotConfirmed(false);

    const result = await loginUser(formData);
    if (result?.error) {
      setIsLoading(false);
      // If the error is "email_not_confirmed", show the special message
      const localisedCode = supabaseErrorCodeLocalisation(result.error);
      if (result.error === 'email_not_confirmed') {
        setShowEmailNotConfirmed(true);
      } else {
        setShowEmailNotConfirmed(false);
      }

      toast.error(tSupabaseErrorCodes(localisedCode)); // Display error toast
      return false; // Prevent form reset
    }
    setIsLoading(false);
    toast.success(tAuthTerms('loginSuccess')); // Display success toast
  }

  async function handleResendActivation(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsSaveLoading(true);
    setIsSaveSuccess(false);

    if(!isValidEmail(email)){
      toast.error(tAuthTerms('resendConfirmationEmailFail'));
      return;
    }

    try {
      const response = await fetch('/api/account/resend-activation-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      setIsSaveLoading(false);

      // Check for error in the response body
      if (result?.error) {
        toast.error(tAuthTerms('resendConfirmationEmailFail'));
        return;
      }

      // Check for HTTP 200 and no error
      if (response.ok) {
        setIsSaveSuccess(true);
        toast.success(tAuthTerms('resendConfirmationEmailSent'));
        setTimeout(() => setIsSaveSuccess(false), 1500);
        return;
      }

      // Fallback for any other case
      toast.error(tAuthTerms('resendConfirmationEmailFail'));
    } catch (error) {
      setIsSaveLoading(false);
      toast.error(tAuthTerms('resendConfirmationEmailFail'));
    }
  }

  // async function handleOAuthClick(provider: 'google' | 'github') {
  //   setPending(true);
  //   const response = await signInWithOAuth(provider);
  //   if (response?.error) {
  //     toast({
  //       variant: 'destructive',
  //       description: 'An error occurred while authenticating. Please try again.',
  //     });
  //     setPending(false);
  //   }
  // }

  return (
    <>
      {/* ...OAuth and Collapsible code omitted for brevity... */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(new FormData(e.currentTarget));
        }}
        className='space-y-6'
      >
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            {tAuthTerms('emailAddress')}
          </label>
          <div className='mt-2'>
            <input
              id='email'
              type='email'
              name='email'
              required
              autoComplete='email'
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className='flex items-center justify-between'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              {tAuthTerms('password')}
            </label>
          </div>
          <div className='mt-2'>
            <input
              id='password'
              name='password'
              type='password'
              required
              autoComplete='current-password'
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Show the resend activation message when needed */}
        <div className={showEmailNotConfirmed ? 'block' : 'hidden'}>
          <div className='sc-message sc-message-attention mt-4'>
            {tAuthTerms('sendNewAuthEmailLabel')}
            <div className='mt-3'>
              <SaveButton
                type="button"
                onClick={handleResendActivation}
                isLoading={isSaveLoading}
                isSuccess={isSaveSuccess}
                initialLabel={tAuthTerms('sendNewAuthEmailButtonLabel')}
                savingLabel={tAuthTerms('sendNewAuthEmailSendingButtonLabel')}
                completeLabel={tAuthTerms('sendNewAuthEmailSentButtonLabel')}
              />
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex gap-3'>
            <input
              id='remember-me'
              name='remember-me'
              type='checkbox'
              className='h-4 w-4 rounded border-gray-300  focus:ring-indigo-500'
            />
            <label htmlFor='remember-me' className='block text-sm text-gray-700'>
              {tAuthTerms('rememberMe')}
            </label>
          </div>
          <a href='/account/reset-password' className='text-sm font-semibold  hover:text-indigo-500'>
            {tAuthTerms('forgotPassword')}
          </a>
        </div>

        <div>
          <button
            type='submit'
            disabled={isLoading}
            className='btn flex w-full justify-center rounded-md bg-primary text-white'
          >
            {isLoading ? (
              <>
                <InlineLoader className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'></InlineLoader>
              </>
            ) : (
              tAuthTerms('logIn')
            )}
          </button>
        </div>
      </form>
    </>
  );
}
