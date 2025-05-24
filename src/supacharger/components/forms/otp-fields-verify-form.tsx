'use client';

import { useState } from 'react';

import OTPField from '@/components/ui/otp-field';
import { verifyOtp } from '@/lib/supabase/supacharger/supabase-auth';
import { isValidEmail } from '@/supacharger/utils/helpers';

export function OtpFieldsForm({ email }: { email: string }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (email: string, otpValue: string) => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email before verifying OTP.');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOtp(email, otpValue);
      if (!result) {
        alert('Verification failed');
        return;
      }
      if (result.error) {
        alert(result.error.message || String(result.error));
      } else {
        alert('OTP verified!');
      }
    } catch (err: any) {
      alert(err?.message || 'Unknown error');
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
    <div>
      <OTPField length={6} onValueChange={handleOtpChange} disabled={loading} />
      {loading && (
        <div className="mt-2 text-sm text-gray-500">Verifying...</div>
      )}
    </div>
  );
}
