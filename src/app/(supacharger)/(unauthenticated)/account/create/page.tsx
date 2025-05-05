'use client';

import { useTranslations } from 'next-intl';

import { SignupRight } from '@/components/sc_demo/sc_signup-right'
import SCSiteLogo from '@/components/sc_demo/sc_site-logo';
import { CreateAccountForm } from '@/supacharger/components/forms/create-account-form';

export default function SignUp() {
  const tCreateAccountPage = useTranslations('CreateAccountPage');

                return (
          <>
      <div className='flex h-screen flex-wrap items-center justify-center bg-white'>
        <div className='w-full p-6 md:w-2/5'>
          <div className='sm:mx-auto sm:w-full sm:max-w-[380px]'>
           




              <div className='mb-16 block'>
                <SCSiteLogo showSiteTitle={true} darkMode={false} />
              </div>

              <div>
              <h1 className='mb-8 text-2xl/9 font-bold tracking-tight text-gray-700'>{tCreateAccountPage('title')}</h1>
                  <CreateAccountForm></CreateAccountForm>
              </div>
          </div>
        </div>
        <div className='h-full w-full p-4 md:w-3/5'>
           <SignupRight></SignupRight>
        </div>
      </div>
    </>
  );
}
