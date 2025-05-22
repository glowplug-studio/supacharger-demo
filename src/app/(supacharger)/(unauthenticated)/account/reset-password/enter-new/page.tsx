'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import SCSiteLogo from '@/components/sc_demo/sc_site-logo';
import { createClient } from '@/supacharger/libs/supabase/supabase-client'; // adjust path if needed

export default function LoginPage() {
  const tPasswordResetPage = useTranslations('PasswordResetPage');
  const tGlobal = useTranslations('Global');
  const tGlobalUI = useTranslations('GlobalUI');
  const tAuthTerms = useTranslations('AuthTerms');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(5);
  const [newPassword, setNewPassword] = useState('');

  const code = searchParams.get('code');

  // If there is no code, redirect to /
  useEffect(() => {
    if (!code) {
      //router.replace('/');
    }
  }, [code, router]);

  // Only exchange code if user is NOT authenticated
  useEffect(() => {
    if (code) {
      (async () => {
        setPending(true);
        setStatus(null);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            setStatus('The reset code is invalid or expired. You may still try to reset your password below.');
          }
        }
        setPending(false);
      })();
    }
  }, [code]);

  // Handle password reset form submission
  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setStatus(null);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setStatus(error.message);
    } else {
      setSuccess(true);
      setStatus('Password updated! Redirecting...');
      setTimeout(() => {
        console.log('redirected')//router.push('/');
      }, 5000);
    }
    setPending(false);
  }

  // Timer for redirect after password reset
  useEffect(() => {
    if (success) {
      if (timer === 0) {
        router.push('/');
      }
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [success, timer, router]);

  return (
    <div className='flex h-screen flex-col justify-center bg-sc-gradient px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
        <div className='bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12'>
          <div className='mb-6 block'>
            <SCSiteLogo showSiteTitle={false} darkMode={false} />
          </div>
          <h1 className='mb-8 text-2xl/9 font-bold tracking-tight text-gray-700'>{tPasswordResetPage('title')} </h1>

          {code && (
            <div className='space-y-4'>
              {pending && <div className='text-gray-600'>{'Verifying code...'}</div>}
              {status && <div className={`mt-2 ${success ? 'text-green-600' : 'text-red-600'} text-sm`}>{status}</div>}
              {!success && (
                <form onSubmit={handlePasswordReset} className='space-y-4'>
                  <label className='block font-medium mb-2'>
                    {tAuthTerms('newPassword') || 'New Password'}
                  </label>
                  <input
                    type='password'
                    required
                    minLength={8}
                    className='input w-full'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    disabled={pending}
                  />
                  <button
                    type='submit'
                    className='btn bg-primary w-full'
                    disabled={pending}
                  >
                    {pending
                      ? tGlobalUI('buttonSaving') : tAuthTerms('setNewPassword')}
                  </button>
                </form>
              )}
              {success && (
                <div className='mt-4 text-center text-gray-700'>
                  <div>
                    {tPasswordResetPage('redirectingIn', { seconds: timer })}
                  </div>
                  <div className='mt-2'>
                    <svg
                      className='mx-auto h-8 w-8 animate-spin text-primary'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z'></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
