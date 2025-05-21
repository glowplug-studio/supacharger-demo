'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import InlineLoader from '@/assets/images/ui/InlineLoader.svg';
import { Check } from 'lucide-react';
import SaveButton from '@/supacharger/components/buttons/form-save-button';

export default function AccountChangePasswordForm() {
  const tAuthTerms = useTranslations('AuthTerms');
  const tGlobalUI = useTranslations('GlobalUI');
  const tPassReset = useTranslations('PasswordResetFormComponent');
  const tevaluatePasswordStrengthErrorCodes = useTranslations('evaluatePasswordStrengthErrorCodes');

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const oldPassword = (form.elements.namedItem('oldPassword') as HTMLInputElement).value;
    const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/account/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: oldPassword,
          newPassword: newPassword,
          newPasswordRetype: confirmPassword,
        }),
      });

      const response = await res.json();

      if (!res.ok) {
        setStatus(tevaluatePasswordStrengthErrorCodes(response.error) || 'Something went wrong.');
        return;
      }

      if (response.data && response.data.updated) {
        toast.success(tAuthTerms('passwordUpdated'));
        setStatus(null);
        form.reset();
        setIsSuccess(true);
        // After 0.5s, reset the button state
        setTimeout(() => setIsSuccess(false), 500);
        return;
      }

      if (response.data && response.data.matched === false) {
        setStatus('Old password is incorrect.');
        return;
      }

      setStatus('Unexpected response from server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} className='max-w-md space-y-4' onSubmit={handleSubmit}>
      <h3 className='text-lg font-medium'>{tPassReset('title')}</h3>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <Label htmlFor='oldPassword' className='mb-2'>
              {tAuthTerms('oldPassword')}
            </Label>
            <Input id='oldPassword' name='oldPassword' type='password' className='w-full' />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <Label htmlFor='newPassword' className='mb-2'>
              {tAuthTerms('newPassword')}
            </Label>
            <Input id='newPassword' name='newPassword' type='password' className='w-full' />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <Label htmlFor='confirmPassword' className='mb-2'>
              {tAuthTerms('retypeNewPassword')}
            </Label>
            <Input id='confirmPassword' name='confirmPassword' type='password' className='w-full' />
          </div>
        </div>
      </div>

      {status && <div className='sc-error-message'>{status}</div>}

      <SaveButton
      isLoading={isLoading}
      isSuccess={isSuccess}
      initialLabel={tGlobalUI("buttonSaveChanges")}
      savingLabel={tGlobalUI("buttonSaving")}
      completeLabel={tGlobalUI("buttonSaved")}
      />

    </form>
  );
}
