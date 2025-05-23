'use client';

/** =========================================================================
 *
 *  Supacharger - Password Reset Link Request Form Component
 *
 *  Description: User can request a password reset link
 *
 *  Author: J Sharp <j@glowplug.studio>
 *
 *  License: CC BY-NC-SA 4.0
 *
 * ========================================================================= */

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { SC_CONFIG } from '@/supacharger/supacharger-config';

import SaveButton from '../buttons/form-save-button';

// Local POST helper
async function post<T = any>(url: string, data: any): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export default function ResetPasswordForm() {
  const tAuthTerms = useTranslations('AuthTerms');
  const tPasswordResetPage = useTranslations('PasswordResetPage');
  const tSupabaseErrorCodes = useTranslations('SupabaseErrorCodes');

  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hideEmailField, setHideEmailField] = useState(false);

  // Get email from query param if present
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';
  const [email, setEmail] = useState(emailFromQuery);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await post('/api/account/request-password-reset', { email });
      toast.success(tPasswordResetPage('emailSent'), SC_CONFIG.TOAST_CONFIG);
      setHideEmailField(true); // Slide up immediately!
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 24 * 60 * 60 * 1000);
    } catch (error: any) {
      const errorMsg =
        error?.error_description || error?.error || error?.message || tSupabaseErrorCodes('genericError');
      toast.error(errorMsg, SC_CONFIG.TOAST_CONFIG);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} className='max-w-md' onSubmit={handleSubmit}>
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${hideEmailField ? 'max-h-0 opacity-0' : 'max-h-32 space-y-2 px-1 pb-6 opacity-100'}
        `}
      >
        <label htmlFor='email' className='text-md block'>
          {tPasswordResetPage('description')}
        </label>
        <div className='space-mt-2'>
          <input
            type='email'
            name='email'
            placeholder={tPasswordResetPage('enterEmailPlaceholder')}
            aria-label={tPasswordResetPage('enterEmailPlaceholder')}
            autoFocus
            required
            className='input w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSuccess}
          />
        </div>
      </div>
      <div className='flex items-center justify-between px-1'>
        <SaveButton
          isLoading={isLoading}
          isSuccess={isSuccess}
          initialLabel={tPasswordResetPage('getResetLink')}
          savingLabel={tAuthTerms('sendNewAuthEmailSendingButtonLabel')}
          completeLabel={tAuthTerms('sendNewAuthEmailSentButtonLabel')}
          disabled={isSuccess}
        />
        <Link className='text-sm font-semibold' href='/account/login'>
          {tAuthTerms('backToSignIn')}
        </Link>
      </div>
    </form>
  );
}
