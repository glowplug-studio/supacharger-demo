'use client';

import { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function SingupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // **Replace with your actual API endpoint and logic**
    try {
      const response = await fetch('/api/signup', {
        // Your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Handle successful signup (e.g., redirect, display success message)
        console.log('Signup successful!');
      } else {
        // Handle signup error (e.g., display error message)
        console.error('Signup failed.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const passwordContainerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      <h2 className='mb-8 text-2xl/9 font-bold tracking-tight text-gray-700'>Create an Account</h2>

      <div className='mt-6 grid grid-cols-2 gap-4'>
        <a
          href='#'
          className='shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
        >
          <svg viewBox='0 0 24 24' aria-hidden='true' className='h-5 w-5'>
            <path
              d='M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z'
              fill='#EA4335'
            />
            <path
              d='M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z'
              fill='#4285F4'
            />
            <path
              d='M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z'
              fill='#FBBC05'
            />
            <path
              d='M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z'
              fill='#34A853'
            />
          </svg>
          <span className=' font-semibold'>Google</span>
        </a>

        <a
          href='#'
          className='shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
        >
          <svg fill='currentColor' viewBox='0 0 20 20' aria-hidden='true' className='size-5 fill-[#24292F]'>
            <path
              d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
              clipRule='evenodd'
              fillRule='evenodd'
            />
          </svg>
          <span className=' font-semibold'>GitHub</span>
        </a>
      </div>

      <div className='my-4 py-2 font-medium text-gray-700'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex-1'>
            <hr className='border-gray-300'></hr>
          </div>
          <div className='px-4'>Or create an account with Email</div>
          <div className='flex-1'>
            <hr className='border-gray-300'></hr>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label htmlFor='name' className='block  font-bold text-gray-700'>
            Name
          </label>
          <div className='mt-2'>
            <input
              id='name'
              name='name'
              type='text'
              required
              className='focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor='email' className='block  font-bold text-gray-700'>
            Email address
          </label>
          <div className='mt-2'>
            <input
              id='email'
              name='email'
              type='email'
              required
              autoComplete='email'
              className='focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor='password' className='block  font-bold text-gray-700'>
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              required
              className='focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5'>
              <button type='button' className='text-gray-600 hover:text-gray-900' onClick={handleToggle}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <motion.div
          variants={passwordContainerVariants}
          initial='visible'
          animate={showPassword ? 'hidden' : 'visible'}
          style={{ overflow: 'hidden' }}
        >
          <label htmlFor='password-again' className='block  font-bold text-gray-700'>
            Retype Password
          </label>
          <div>
            <input
              id='password-again'
              name='password-again'
              type='password'
              required
              className='focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden'
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>
        </motion.div>

        <div>
          <button
            type='submit'
            className='shadow-2xs flex w-full justify-center rounded-md bg-primary px-3  py-1.5 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Sign Up
          </button>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`shadow-2xs flex w-full justify-center rounded-md bg-primary px-3  py-1.5 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          />
        </div>
      </form>

      <div className='mt-6'>
        <Link
          href='/signin'
          className='flex w-full appearance-none justify-between rounded bg-gray-100  px-6 py-3 text-sm leading-tight text-gray-700 hover:bg-gray-200 hover:no-underline'
        >
          <span className='text-normal'>I already have an account</span>
          <span className='font-bold'>
            Sign In <LogIn size={14} className='inline' />
          </span>
        </Link>
      </div>
    </>
  );
}
