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
  const username = 'johsimpsons';

  return (
    <>
      <header className='flex items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm'>
        <div className='flex h-14 items-center'>
          <div className='mobile-menu mr-4 md:hidden'>
            <input type='checkbox' id='menu-toggle' className='hidden' />
            <label htmlFor='menu-toggle' className='block cursor-pointer'>
              <div className='flex h-5 w-6 flex-col justify-between'>
                <span className='h-0.5 w-full rounded-sm bg-gray-800'></span>
                <span className='h-0.5 w-full rounded-sm bg-gray-800'></span>
                <span className='h-0.5 w-full rounded-sm bg-gray-800'></span>
              </div>
            </label>

            <div className='mobile-menu-dropdown absolute left-0 top-14 z-50 w-full border-b border-gray-200 bg-white shadow-md'>
              <Link href='/dashboard' className='block border-l-4 border-gray-800 bg-gray-50 px-4 py-3 font-medium'>
                Dashboard
              </Link>
              <Link href='/deals' className='block border-l-4 border-transparent px-4 py-3 hover:bg-gray-50'>
                Deals
              </Link>
              <Link href='/connections' className='block border-l-4 border-transparent px-4 py-3 hover:bg-gray-50'>
                Connections
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className='mr-8'>
            <SCSiteLogo></SCSiteLogo>
          </div>

          {/* Desktop Tabbed Menu (hidden on small screens) */}
          <nav className='hidden h-full md:flex'>
            <Link
              href='/#'
              className='flex h-full items-center border-b-2 border-gray-500 px-4 font-medium text-neutral-900'
            >
              Feed
            </Link>
            <Link
              href='/#'
              className='flex h-full items-center border-b-2 border-transparent px-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:no-underline'
            >
              Negotiations
            </Link>
            <Link
              href='/#'
              className='flex h-full items-center border-b-2 border-transparent px-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:no-underline'
            >
              Connections
            </Link>
          </nav>
        </div>
        <div className='flex items-center'>
          {/* Lang Switcher */}
          <div className='mr-4 '>
            <LocaleSwitcher currentLocale={currentLocale}></LocaleSwitcher>
          </div>
          <SCAccountMenu></SCAccountMenu>
        </div>
      </header>
    </>
  );
}
