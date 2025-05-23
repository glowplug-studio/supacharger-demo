'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import SCSiteLogo from '@/components/sc_demo/sc_site-logo';
import { LoginUserForm } from '@/supacharger/components/forms/login-user-form';
import { UIDivider } from '@/supacharger/components/ui/divider';

export default function LoginPage() {
  const tLoginPage = useTranslations('LoginPage');
  const tGlobal = useTranslations('Global');
  const tAuthTerms = useTranslations('AuthTerms');

  return (
    <>
      {/* Mobile only logo */}
      <div className='flex items-center gap-2 lg:hidden'>
          <div className='w-6'>
            <Link href='/'>
              <SCSiteLogo showSiteTitle={true} darkMode={false} />
            </Link>
          </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='mb-2 text-2xl/9 font-bold tracking-tight'>{tLoginPage('title')}</h1>
      </div>

      <LoginUserForm></LoginUserForm>

       <UIDivider></UIDivider>
      

      {/* Social Buttons */}

      <div className='flex flex-col gap-2'>
              <button className='flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 transition-colors hover:border-gray-500'>
                <span className='font-medium text-gray-100'>Continue with Google</span>
                <img
                  src='https://d36se1z1wvp1u2.cloudfront.net/img/assets/social-media/google.svg'
                  alt='Google'
                  className='h-6 w-6'
                />
              </button>
              <button className='flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 transition-colors hover:border-gray-500'>
                <span className='font-medium text-gray-100'>Continue with Facebook</span>
                <img
                  src='https://d36se1z1wvp1u2.cloudfront.net/img/assets/social-media/facebook.svg'
                  alt='Facebook'
                  className='h-6 w-6'
                />
              </button>
              <button className='flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 transition-colors hover:border-gray-500'>
                <span className='font-medium text-gray-100'>Continue with Discord</span>
                <img
                  src='https://d36se1z1wvp1u2.cloudfront.net/img/assets/social-media/discord.svg'
                  alt='Discord'
                  className='h-6 w-6'
                />
              </button>
              <button className='flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-700 px-4 py-3 transition-colors hover:border-gray-500'>
                <span className='font-medium text-gray-100'>Continue with Github</span>
                <img
                  src='https://d36se1z1wvp1u2.cloudfront.net/img/assets/social-media/github.svg'
                  alt='Github'
                  className='h-6 w-6'
                />
              </button>
            </div>

     
       

    </>
  );
}
