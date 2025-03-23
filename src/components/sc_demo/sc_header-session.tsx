import { cookies } from 'next/headers';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Menu } from 'lucide-react';

import  SCAccountMenu from '@/components/sc_demo/sc_account-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
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

<nav className="bg-white shadow-lg">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <SCSiteLogo></SCSiteLogo>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <Link href='/' className='text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium'>Dashboard</Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="hidden sm:flex sm:items-center">
            
          
             
             <div className='btn w-full bg-gray-100 text-gray-800 shadow-xs hover:bg-gray-50 sm:ml-4 sm:w-auto'>
             <LocaleSwitcher currentLocale={currentLocale} />
             </div>
          <SCAccountMenu></SCAccountMenu>
          </div>

       
          <div className="sm:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false" id="mobile-menu-button">
                            <span className="sr-only">Open main menu</span>
                            <Menu />
                        </button>
          </div>
        </div>
      </div>
    </div>

 
    <div className="sm:hidden hidden" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <a href="#" className="bg-gray-100 text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</a>

    
        <div className="relative">
          <button className="w-full text-left text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between mobile-dropdown-trigger">
                        Products
                        
                    </button>
          <div className="hidden px-4 py-2 mobile-dropdown-content">
            <div className="border-l-2 border-indigo-500 pl-2 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Software</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 block">Web Development</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 block">Mobile Apps</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 block">Desktop Software</a></li>
              </ul>
            </div>
            
          </div>
        </div>

       
        <a href="#" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">About</a>
        <a href="#" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Contact</a>

        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-3 space-y-2 flex-col">
            <a href="#"
              className="block w-full text-center text-gray-900 bg-gray-100 px-3 py-2 rounded-md text-base font-medium">
              Login
            </a>
            <a href="#"
              className="block w-full text-center bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium">
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
