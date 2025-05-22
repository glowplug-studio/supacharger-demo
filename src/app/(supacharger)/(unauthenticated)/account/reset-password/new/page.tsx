'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import InlineLoader from '@/assets/images/ui/InlineLoader.svg';
import SCSiteLogo from '@/components/sc_demo/sc_site-logo';
import { createClient } from '@/supacharger/libs/supabase/supabase-client';
import { supabaseErrorCodeLocalisation } from '@/supacharger/utils/helpers';

export default function LoginPage() {
  const tPasswordResetPage = useTranslations('PasswordResetPage');
  const tGlobal = useTranslations('Global');
  const tGlobalUI = useTranslations('GlobalUI');
  const tAuthTerms = useTranslations('AuthTerms');
  const tSupabaseErrorCodes = useTranslations('SupabaseErrorCodes');

  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(true);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(5);
  const [newPassword, setNewPassword] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(true);

  const code = searchParams.get('code');

  // Only exchange code if user is NOT authenticated
  useEffect(() => {
    if (!code) {
      setPending(false); // stop loader if no code
      return;
    }
    (async () => {
      setPending(true);
      setStatus(null);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setStatus(tPasswordResetPage('expiredCode'));
          setIsCodeValid(false);
        } else {
          setIsCodeValid(true);
        }
      } else {
        setIsCodeValid(true);
      }
      setPending(false);
    })();
  }, [code, tPasswordResetPage]);

  async function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setStatus(null);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      const localised = supabaseErrorCodeLocalisation(error.code || 'genericError');
      const translated = tSupabaseErrorCodes(localised);
      toast.error(translated);
      setStatus(error.message); // Optionally keep this for inline display
    } else {
      setSuccess(true);
      setStatus('Password updated! Redirecting...');
      setTimeout(() => {
        console.log('redirected'); //router.push('/');
      }, 5000);
    }
    setPending(false);
  }

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

          {/* Loader is always shown when pending */}
          {pending && (
            <div className="flex items-center gap-3 rounded bg-gray-100 px-4 py-3">
              <InlineLoader className="h-5 w-5 animate-spin text-gray-500" />
              <span className="text-gray-600">{tPasswordResetPage('verifyingCode') || 'Verifying code...'}</span>
            </div>
          )}

          {/* If there is no code and not pending, show message and link */}
          {!pending && !code && (
            <div className="sc-message sc-message-error flex flex-col gap-2">
              <span>
                {tPasswordResetPage('noCode') || 'No reset code found. Please request a new password reset link.'}
              </span>
              <Link
                className="text-sm font-semibold hover:text-indigo-500"
                href="/account/reset-password">
                {tAuthTerms("backToRequestLink")}
              </Link>
            </div>
          )}

          {/* Only show the rest if not pending and code exists */}
          {!pending && code && (
            <div className='space-y-4'>
              {!isCodeValid && status && (
                <div className="sc-message sc-message-error flex flex-col gap-2">
                  <span>{status}</span>
                  <Link
                    className="text-sm font-semibold hover:text-indigo-500"
                    href="/account/login"
                  >
                    {tAuthTerms("backToSignIn")}
                  </Link>
                </div>
              )}
              {isCodeValid && !success && (
                <form onSubmit={handlePasswordReset} className='space-y-4'>
                  <label className='mb-2 block font-medium'>{tAuthTerms('newPassword')}</label>
                  <input
                    type='password'
                    required
                    minLength={8}
                    className='input w-full'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={pending}
                  />
                  <button type='submit' className='btn w-full bg-primary' disabled={pending}>
                    {pending ? tGlobalUI('buttonSaving') : tAuthTerms('setNewPassword')}
                  </button>
                </form>
              )}
              {success && (
                <div className='mt-4 bg-green-100 text-center text-gray-700'>
                  <div>{tPasswordResetPage('redirectingIn', { seconds: timer })}</div>
                  <InlineLoader className='-ml-1 mr-3 h-5 w-5 animate-spin text-white' />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
