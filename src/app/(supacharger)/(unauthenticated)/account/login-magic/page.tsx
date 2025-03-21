'use client';
import { LoginMagicLinkUI } from '@/supacharger/components/forms/LoginMagicLinkUI';
import { signInWithEmail, signInWithOAuth } from '../../../auth-actions';
import  SiteLogo from '@/components/siteLogo';

export default function AuthMagicLink() {
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-sc-gradient'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <section className='py-xl m-auto flex h-full max-w-lg items-center'>

          <div className='flex flex-col gap-4'>
      <SiteLogo showSiteTitle={true} darkMode={true}></SiteLogo>
      </div>

            <LoginMagicLinkUI />
          </section>
        </div>
      </div>
    </>
  );
}
