import { login, signup } from './actions';
import {getTranslations} from 'next-intl/server';

export default async function LoginPage() {
  const t = await getTranslations('Login');

  return (
    <div className='flex h-screen'>
      {/* Left Side - Form Section */}
      <div className='flex w-[40%] flex-col items-center justify-center bg-gray-100'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-2xl font-bold tracking-tight text-gray-900'>{t('title')}</h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[400px]'>
          <div className='bg-white px-6 py-12 sm:rounded-2xl sm:px-12'>
            <form className='space-y-6'>
              {/* Email Input */}
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-900'>
                {t('emailAddress')}
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    required
                    autoComplete='email'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600'
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-900'>
                {t('password')}
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    required
                    autoComplete='current-password'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600'
                  />
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className='flex items-center justify-between'>
                <div className='flex gap-3'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  />
                  <label htmlFor='remember-me' className='block text-sm text-gray-900'>
                  {t('rememberMe')}
                  </label>
                </div>
                <a href='#' className='text-sm font-semibold text-indigo-600 hover:text-indigo-500'>
                {t('forgotPassword')}
                </a>
              </div>

              {/* Sign In Button */}
              <div>
                <button
                  formAction={login}
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-indigo-600'
                >
                  {t('signIn')}
                </button>
              </div>
            </form>

            {/* Alternative Login Options */}
            <p className='mt-10 text-center text-sm text-gray-500'>
              Not a member?{' '}
              <a href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div
        className='h-screen w-[60%] bg-cover bg-center'
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1727602483165-f9327b007a91)' }}
      ></div>
    </div>
  );
}
