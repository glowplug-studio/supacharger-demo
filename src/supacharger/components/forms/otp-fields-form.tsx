'use client'

import { SetStateAction, useState } from 'react';

import OTPField from '@/components/ui/otp-field';

export function OtpFieldsForm() {
  const [otp, setOtp] = useState('');
  const handleValueChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      alert(`OTP is: ${value}`);
    }
  };

  return (
    <>
      <OTPField length={6} onValueChange={handleValueChange} />
    </>
  );
}
