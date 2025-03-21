'use client';
import { useState } from 'react';
import { CircleArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GoogleLogo from '@/assets/socialAuthIcons/GoogleLogo.svg';
import FacebookLogo from '@/assets/socialAuthIcons/FacebookLogo.svg';

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

      <Link
        href='/login'
        className='flex w-full justify-between rounded bg-gray-100  px-5 py-3 text-sm leading-tight text-gray-700 hover:bg-gray-200 hover:no-underline'
      >
        <span className='font-normal'>I already have an account</span>
        <span className=''>Sign In</span>
      </Link>

      <div className='mt-6 grid grid-cols-2 gap-4'>
        <a
          href='#'
          className='shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
        >
          
          <GoogleLogo className="w-4 flex inline h-4" />

          <span className=' font-semibold'>Google</span>
        </a>

        <a
          href='#'
          className='shadow-2xs flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
        >
           <FacebookLogo className="w-4 flex inline h-4" />
          <span className=' font-semibold'>Facebook</span>
        </a>
      </div>

      <div className='my-4 py-2 font-medium text-gray-700'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex-1'>
            <hr className='border-gray-300'></hr>
          </div>
          <div className='px-4 text-gray-400 text-sm'>Or create an account with Email</div>
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
              className='focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden  mt-2'
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
              className='focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden mt-2'
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>
        </motion.div>

        <div>
          <button type='submit' className='btn w-full bg-primary text-white'>
            Sign Up <CircleArrowRight size={18} className='' />
          </button>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`shadow-2xs flex w-full justify-between bg-primary font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          />
        </div>
      </form>
    </>
  );
}
