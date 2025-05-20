'use client';

import { useEffect,useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/seperator';
import { useUnsavedChanges } from '@/hooks/use-unsaved-changes';

interface SecuritySettings {
  email: string;
  passwords: {
    old: string;
    new: string;
    confirm: string;
  };
  language: string;
}

export default function AccountPage() {
  const { setHasChanges } = useUnsavedChanges();
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState<SecuritySettings>({
    email: '',
    passwords: {
      old: '',
      new: '',
      confirm: '',
    },
    language: 'en',
  });

  const [initialSettings, setInitialSettings] = useState<SecuritySettings>({
    email: '',
    passwords: {
      old: '',
      new: '',
      confirm: '',
    },
    language: 'en',
  });

  // Load initial data
  useEffect(() => {
    const loadSettings = async () => {
      // Simulate API call
      const mockData = {
        email: 'user@example.com',
        passwords: {
          old: '',
          new: '',
          confirm: '',
        },
        language: 'fr',
      };

      setSettings(mockData);
      setInitialSettings(mockData);
    };

    loadSettings();
  }, []);

  // Check for changes
  useEffect(() => {
    const hasEmailChanged = settings.email !== initialSettings.email;
    const hasPasswordsChanged =
      settings.passwords.old !== '' || settings.passwords.new !== '' || settings.passwords.confirm !== '';
    const hasLanguageChanged = settings.language !== initialSettings.language;

    setHasChanges(hasEmailChanged || hasPasswordsChanged || hasLanguageChanged);
  }, [settings, initialSettings, setHasChanges]);

  const validatePassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setInitialSettings((prev) => ({ ...prev, email: settings.email }));
    setIsLoading(false);

    toast.success('Email updated');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(settings.passwords.new)) {
      toast.error('Invalid Password');
      return;
    }

    if (settings.passwords.new !== settings.passwords.confirm) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSettings((prev) => ({
      ...prev,
      passwords: { old: '', new: '', confirm: '' },
    }));
    setIsLoading(false);

    toast.success('Password updated');
  };

  const handleLanguageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setInitialSettings((prev) => ({ ...prev, language: settings.language }));
    setIsLoading(false);

    toast.success('Language updated');
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Account & Security Settings</h2>
        <Separator className='my-4' />
      </div>

      {/* Authentication Provider */}
      <div className='max-w-md space-y-4'>
        <h3 className='text-lg font-medium'>You Authenticated with</h3>
        <div className='flex items-center justify-between'>
          <span>Google</span>
          <img src='https://www.google.com/favicon.ico' alt='Google' className='h-5 w-5' />
        </div>
      </div>

      <Separator />

      {/* Email Section */}
      <form onSubmit={handleEmailSubmit} className='max-w-md space-y-4'>
        <h3 className='text-lg font-medium'>Email</h3>
        <div className='space-y-2'>
          <Label htmlFor='email'>Account Email Address</Label>
          <Input
            id='email'
            type='email'
            value={settings.email}
            onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <Button type='submit' variant='secondary' disabled={isLoading || settings.email === initialSettings.email}>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Save Changes
        </Button>
      </form>

      <Separator />

      {/* Password Section */}
      <form onSubmit={handlePasswordSubmit} className='max-w-md space-y-4'>
        <h3 className='text-lg font-medium'>Password</h3>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='oldPassword'>Old Password</Label>
            <Input
              id='oldPassword'
              type='password'
              value={settings.passwords.old}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  passwords: { ...prev.passwords, old: e.target.value },
                }))
              }
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='newPassword'>New Password</Label>
            <Input
              id='newPassword'
              type='password'
              value={settings.passwords.new}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  passwords: { ...prev.passwords, new: e.target.value },
                }))
              }
            />
            <p className='text-xs text-muted-foreground'>
              Password must be at least 8 characters and contain uppercase, lowercase, and numbers
            </p>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Repeat New Password</Label>
            <Input
              id='confirmPassword'
              type='password'
              value={settings.passwords.confirm}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  passwords: { ...prev.passwords, confirm: e.target.value },
                }))
              }
            />
          </div>
        </div>
        <Button
          type='submit'
          variant='secondary'
          disabled={isLoading || !settings.passwords.old || !settings.passwords.new || !settings.passwords.confirm}
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Save Changes
        </Button>
      </form>

      <Separator />

      {/* 2FA Section */}
      <div className='max-w-md space-y-4'>
        <h3 className='text-lg font-medium'>Two Factor Authentication</h3>
        <p className='text-muted-foreground'>No 2FA found.</p>
        <Button variant='secondary'>Set up 2FA</Button>
      </div>

      <Separator />

      {/* Language Section */}
      <form onSubmit={handleLanguageSubmit} className='max-w-md space-y-4'>
        <h3 className='text-lg font-medium'>Language</h3>
        <div className='space-y-2'>
          <Label>Language Preference</Label>
          <Select
            value={settings.language}
            onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a language' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='en'>English</SelectItem>
              <SelectItem value='fr'>Français (French)</SelectItem>
              <SelectItem value='es'>Español (Spanish)</SelectItem>
              <SelectItem value='de'>Deutsch (German)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type='submit'
          variant='secondary'
          disabled={isLoading || settings.language === initialSettings.language}
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Save Changes
        </Button>
      </form>

      <Separator />

      {/* Cancel Account Section */}
      <div className='max-w-md space-y-4'>
        <h3 className='text-lg font-medium'>Cancel Account</h3>
        <p className='text-muted-foreground'>This is what happens when you cancel your account.</p>
        <Button variant='destructive'>Cancel Account</Button>
      </div>
    </div>
  );
}
