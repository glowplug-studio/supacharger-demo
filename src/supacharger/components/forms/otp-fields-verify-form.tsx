'use client';

import { useEffect,useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import InlineLoaderDark from '@/assets/images/ui/InlineLoaderDark.svg';
import OTPField from '@/components/ui/otp-field';
import { verifyOtp } from '@/lib/supabase/supacharger/supabase-auth';
import { SC_CONFIG } from '@/supacharger/supacharger-config';
import { isValidEmail, supabaseErrorCodeLocalisation } from '@/supacharger/utils/helpers';
import * as LabelPrimitive from '@radix-ui/react-label';

export function OtpFieldsForm({ email }: { email: string }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const tOTPFormComponent = useTranslations('OTPFormComponent');
  const tAuthTerms = useTranslations('AuthTerms');
  const tSupabaseErrorCodes = useTranslations('SupabaseErrorCodes');
  const router = useRouter();

  // Ref for OTP input
  const otpRef = useRef<HTMLInputElement | null>(null);

  // Autofocus OTP field when form is shown
  useEffect(() => {
    // If OTPField supports ref forwarding to the first input
    if (otpRef.current) {
      otpRef.current.focus();
    }
  }, []);

  const handleVerifyOtp = async (email: string, otpValue: string) => {
    if (!isValidEmail(email)) {
      toast.error(tOTPFormComponent('invalidEmail'), SC_CONFIG.TOAST_CONFIG);
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOtp(email, otpValue);
      if (!result) {
        toast.error(tAuthTerms('loginSuccess'), SC_CONFIG.TOAST_CONFIG);
        return;
      }
      if (result.error) {
        toast.error(tSupabaseErrorCodes(supabaseErrorCodeLocalisation('AuthApiError')), SC_CONFIG.TOAST_CONFIG);
      } else {
        toast.success(tAuthTerms('accountEmailVerified'), SC_CONFIG.TOAST_CONFIG);
        // Redirect to session home path
        router.push(SC_CONFIG.SESSION_HOME_PATH);
      }
    } catch (err: any) {
      toast.error(tSupabaseErrorCodes(supabaseErrorCodeLocalisation('genericError')), SC_CONFIG.TOAST_CONFIG);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (value.length === 6 && !loading) {
      handleVerifyOtp(email, value);
    }
  };

  return (
    <div id='sc_otp-fields-verification-form' className='space-y-3'>
      <h2 className='mb-2 text-xl font-bold tracking-tight'>{tOTPFormComponent('title')}</h2>
      <p className='text-xs'>{tOTPFormComponent('description')}</p>

      <LabelPrimitive.Root htmlFor='otp-group' className='mb-2 block font-medium'>
        {tOTPFormComponent('fieldLabel')}
      </LabelPrimitive.Root>

      <div className='flex flex-col items-center justify-center rounded-md border bg-gray-100 p-5 h-28'>
        {loading ? (
          <div className='flex flex-col items-center'>
            <InlineLoaderDark />
            <span className="mt-2 text-sm text-gray-500"></span>
          </div>
        ) : (
          // If OTPField supports ref, pass ref. Otherwise, try autoFocus prop.
          <OTPField
            length={6}
            onValueChange={handleOtpChange}
            ref={otpRef}
            autoFocus
          />
        )}
      </div>
    </div>
  );
}
