'use client';

import { type ChangeEvent, type ClipboardEvent, type KeyboardEvent,useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import InlineLoader from '@/assets/images/ui/InlineLoader.svg';
import { verifyOtp } from '@/lib/supabase/supacharger/supabase-auth';

interface OtpInputProps {
  email: string;
}

export default function OtpInput({ email }: OtpInputProps) {
  const tOTPFormComponent = useTranslations('OTPFormComponent');
  const length = 6;
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, []);

  const handleComplete = async (otpValue: string) => {
    alert(otpValue); // Show alert for testing
    if (email && otpValue.length === length) {
      try {
        const result = await verifyOtp(email, otpValue);
        if (!result) {
          alert('Verification failed');
          return;
        }
        if (result.error) {
          // Optionally, show error to user
          alert(result.error.message || String(result.error));
        } else {
          // Optionally, show success to user
          alert('OTP verified!');
        }
      } catch (err: any) {
        alert(err?.message || 'Unknown error');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const otpValue = newOtp.join('');
    if (otpValue.length === length && !newOtp.includes('')) {
      handleComplete(otpValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (!/^\d+$/.test(pastedData)) return;
    const digits = pastedData.slice(0, length).split('');
    const newOtp = [...otp];
    digits.forEach((digit, idx) => {
      if (idx < length) {
        newOtp[idx] = digit;
      }
    });
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((val) => val === '');
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
      handleComplete(newOtp.join(''));
    }
  };

  const handleContainerClick = () => {
    const emptyIndex = otp.findIndex((val) => val === '');
    if (emptyIndex !== -1) {
      inputRefs.current[emptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <div>
      <h2>{tOTPFormComponent('title')}</h2>
      <p>{tOTPFormComponent('description')}</p>
      <div className='my-4 flex justify-center space-x-3' onClick={handleContainerClick}>
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            type='text'
            ref={(el) => { inputRefs.current[index] = el }}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            maxLength={1}
            className='input h-14 w-12 rounded-md text-center text-xl font-semibold transition-colors'
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
