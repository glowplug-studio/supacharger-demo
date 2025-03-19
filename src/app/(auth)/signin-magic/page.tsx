'use client';

import { SignupRight } from '@/components/signupRight';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SigninMagicUI } from '../signin-magic-ui';
import { signInWithEmail, signInWithOAuth } from '../auth-actions';

export default function AuthMagicLink() {
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-sc-gradient'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <section className='py-xl m-auto flex h-full max-w-lg items-center'>
            <SigninMagicUI mode='signup' signInWithOAuth={signInWithOAuth} signInWithEmail={signInWithEmail} />
          </section>
        </div>
      </div>
    </>
  );
}
