'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import InlineLoader from '@/assets/images/ui/InlineLoader.svg';

export default function AccountChangePasswordForm() {
  const tAuthTerms = useTranslations('AuthTerms');
  const tGlobalUI = useTranslations('GlobalUI');
  const tPassReset = useTranslations('PasswordResetFormComponent');

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        setStatus(response.error || 'Something went wrong.');
        return;
      }

      if (response.data && response.data.updated) {
        toast.success('Password updated');
        setStatus(null);
        form.reset();
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
            <Label htmlFor='oldPassword' className='mb-2'>{tAuthTerms("oldPassword")}</Label>
            <Input id='oldPassword' name='oldPassword' type='password' className='w-full' />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <Label htmlFor='newPassword' className='mb-2'>{tAuthTerms("newPassword")}</Label>
            <Input id='newPassword' name='newPassword' type='password' className='w-full' />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <Label htmlFor='confirmPassword' className='mb-2'>{tAuthTerms("repeatNewPassword")}</Label>
            <Input id='confirmPassword' name='confirmPassword' type='password' className='w-full' />
          </div>
        </div>
      </div>
      <Button type='submit' variant='secondary' disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center">
            <InlineLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            {tGlobalUI("buttonSaveChanges")}
          </span>
        ) : (
          tGlobalUI("buttonSaveChanges")
        )}
      </Button>
      {status && (
        <div className="mt-2 text-sm text-red-600">{status}</div>
      )}
    </form>
  );
}
