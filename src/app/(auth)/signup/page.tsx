'use client';

import { Logo } from '@/components/logo';
import { SingupForm } from '@/supacharger/components/signupForm';
import { SignupRight } from '@/components/signupRight';

export default function SignUp() {

  return (
    <>
      <div className='flex h-screen flex-wrap items-center justify-center bg-white'>
        <div className='w-full p-6 md:w-2/5'>
          <div className='sm:mx-auto sm:w-full sm:max-w-[380px]'>
            <div className=''>
              <div className='mb-28 block'>
                <Logo showSiteTitle={true} darkMode={false} />
              </div>

              <div>

                <SingupForm></SingupForm>

              </div>
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
