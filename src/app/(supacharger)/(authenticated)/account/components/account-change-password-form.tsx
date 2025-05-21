'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "react-toastify";

export default function AccountChangePasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const form = e.currentTarget;
    const oldPassword = (form.elements.namedItem('oldPassword') as HTMLInputElement).value;
    const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

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

    // Handle error responses
    if (!res.ok) {
      setStatus(response.error || 'Something went wrong.');
      return;
    }

    // Handle password updated
    if (response.data && response.data.updated) {
      toast.success('Password updated');
      setStatus(null);
      form.reset();
      return;
    }

    // Handle incorrect old password (matched === false)
    if (response.data && response.data.matched === false) {
      setStatus('Old password is incorrect.');
      return;
    }

    // Handle any other unexpected response
    setStatus('Unexpected response from server.');
  };

  return (
    <form ref={formRef} className='max-w-md space-y-4' onSubmit={handleSubmit}>
      <h3 className='text-lg font-medium'>Password</h3>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <Label htmlFor='oldPassword' className='mb-2'>Old Password</Label>
            <Input id='oldPassword' name='oldPassword' type='text' className='w-full' />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <Label htmlFor='newPassword' className='mb-2'>New Password</Label>
            <Input id='newPassword' name='newPassword' type='text' className='w-full' />
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex flex-col'>
            <Label htmlFor='confirmPassword' className='mb-2'>Repeat New Password</Label>
            <Input id='confirmPassword' name='confirmPassword' type='text' className='w-full' />
          </div>
        </div>
      </div>
      <Button type='submit' variant='secondary'>
        Save Changes
      </Button>
      {status && (
        <div className="mt-2 text-sm text-red-600">{status}</div>
      )}
    </form>
  );
}
