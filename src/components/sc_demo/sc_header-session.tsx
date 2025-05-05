import { cookies } from 'next/headers';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import SCAccountMenu from '@/components/sc_demo/sc_account-menu';
import { isLoggedIn } from '@/utils/supabase/server';

import LocaleSwitcher from './sc_locale-switcher';
import SCSiteLogo from './sc_site-logo';

export async function SCHeaderSession() {
  const session = await isLoggedIn();
  // Get the current locale from cookies
  const cookieStore = await cookies();
  const currentLocale = cookieStore.get('supacharger_locale')?.value || 'en'; // Default to 'en' if not set

  return (
    <>
      <header className='bg-white'>
        <nav className='bg-white shadow-lg'>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <SCSiteLogo></SCSiteLogo>
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    <Link href='/' className='rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100'>
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <div className='hidden sm:flex sm:items-center'>
                  <div className='btn shadow-xs w-full bg-gray-100 text-gray-800 hover:bg-gray-50 sm:ml-4 sm:w-auto'>
                    <LocaleSwitcher currentLocale={currentLocale} />
                  </div>
                  <SCAccountMenu></SCAccountMenu>
                </div>

                <div className='sm:hidden'>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                    aria-expanded='false'
                    id='mobile-menu-button'
                  >
                    <span className='sr-only'>Open main menu</span>
                    <Menu />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='hidden sm:hidden' id='mobile-menu'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              <a href='#' className='block rounded-md bg-gray-100 px-3 py-2 text-base font-medium text-gray-900'>
                Home
              </a>

              <div className='relative'>
                <button className='mobile-dropdown-trigger flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-gray-900 hover:bg-gray-100'>
                  Products
                </button>
                <div className='mobile-dropdown-content hidden px-4 py-2'>
                  <div className='mb-4 border-l-2 border-indigo-500 pl-2'>
                    <h4 className='mb-2 font-medium text-gray-900'>Software</h4>
                    <ul className='space-y-2'>
                      <li>
                        <a href='#' className='block text-gray-600 hover:text-indigo-600'>
                          Web Development
                        </a>
                      </li>
                      <li>
                        <a href='#' className='block text-gray-600 hover:text-indigo-600'>
                          Mobile Apps
                        </a>
                      </li>
                      <li>
                        <a href='#' className='block text-gray-600 hover:text-indigo-600'>
                          Desktop Software
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <a href='#' className='block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100'>
                About
              </a>
              <a href='#' className='block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100'>
                Contact
              </a>

              <div className='border-t border-gray-200 pb-3 pt-4'>
                <div className='flex flex-col items-center space-y-2 px-3'>
                  <a
                    href='#'
                    className='block w-full rounded-md bg-gray-100 px-3 py-2 text-center text-base font-medium text-gray-900'
                  >
                    Login
                  </a>
                  <a
                    href='#'
                    className='block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-base font-medium text-white'
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
