'use client';

/** ==========
 *
 * Supacharger - Login User Form
 *
 * ========== */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

// import { resendAccountConfirmEmail } from '@/app/(supacharger)/auth-actions'; // No longer used
import InlineLoader from '@/assets/images/ui/InlineLoader.svg';

import { loginUser } from '../../../app/(supacharger)/auth-actions';
import { isValidEmail, supabaseErrorCodeLocalisation } from '../../utils/helpers';
import SaveButton from '../buttons/form-save-button';

export function LoginUserForm() {
  const tAuthTerms = useTranslations('AuthTerms');
  const tSupabaseErrorCodes = useTranslations('SupabaseErrorCodes');
  const tGlobalUI = useTranslations('GlobalUI');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<React.ReactNode | null>(null);

  // Helper to render the "email not confirmed" message
  function EmailNotConfirmedMessage() {
    return (
      <div className='sc-message sc-message-attention mt-4'>
        {/* Resend a new activation link */}
        {tAuthTerms('sendNewAuthEmailLabel')}
        <div className='mt-3'>
          <SaveButton
            onClick={handleResendActivation}
            isLoading={isSaveLoading}
            isSuccess={isSaveSuccess}
            initialLabel={tAuthTerms('sendNewAuthEmailButtonLabel')}
            savingLabel={tAuthTerms('sendNewAuthEmailSendingButtonLabel')}
            completeLabel={tAuthTerms('sendNewAuthEmailSentButtonLabel')}
          />
        </div>
      </div>
    );
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrorMsg(null);

    const result = await loginUser(formData);
    if (result?.error) {
      setIsLoading(false);
      // If the error is "email_not_confirmed", show the special message
      const localisedCode = supabaseErrorCodeLocalisation(result.error);
      if (result.error === 'email_not_confirmed') {
        setErrorMsg(<EmailNotConfirmedMessage />);
      } else {
        setErrorMsg(null); // Only show error for email_not_confirmed
      }

      toast.error(tSupabaseErrorCodes(localisedCode)); // Display error toast
      return false; // Prevent form reset
    }
    setIsLoading(false);
    toast.success(tAuthTerms('loginSuccess')); // Display success toast
  }

  // Updated to use fetch and POST to /api/account/resend-activation-link
  async function handleResendActivation() {
    setIsSaveLoading(true);
    setIsSaveSuccess(false);

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
      {/* <div className='flex flex-col gap-4'>
        <button
          className='flex items-center justify-center gap-2 rounded-md bg-cyan-500 py-4 font-medium text-black transition-all hover:bg-cyan-400 disabled:bg-neutral-700'
          onClick={() => handleOAuthClick('google')}
          disabled={pending}
        >
       
          Continue with Google
        </button>
        <button
          className='flex items-center justify-center gap-2 rounded-md bg-fuchsia-500 py-4 font-medium text-black transition-all hover:bg-fuchsia-400 disabled:bg-neutral-700'
          onClick={() => handleOAuthClick('github')}
          disabled={pending}
        >
    
          Continue with GitHub
        </button>

        <Collapsible open={emailFormOpen} onOpenChange={setEmailFormOpen}>
          <CollapsibleTrigger asChild>
            <button
              className='text-neutral6 flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 py-4 font-medium transition-all hover:bg-zinc-800 disabled:bg-neutral-700 disabled:text-black'
              disabled={pending}
            >
              Continue with Email
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='mt-[-2px] w-full rounded-b-md bg-zinc-900 p-8'>
              
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div> */}
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
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='text-gray-500 hover:text-gray-700'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
            </button>
          </div>
          <div className='mt-2'>
            <input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete='current-password'
              className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-700 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* The attention message is now only shown as an error, not here */}
        </div>
        
        {/* Show error message directly (not wrapped in another box) */}
        {errorMsg}

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
          <a href='#' className='text-sm font-semibold  hover:text-indigo-500'>
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
