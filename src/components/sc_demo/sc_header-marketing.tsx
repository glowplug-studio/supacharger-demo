'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';

import LocaleSwitcher from './sc_locale-switcher';
import SCSiteLogo from './sc_site-logo';

export function SCMarketingMenu() {
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<{ [key: string]: boolean }>({
    dropdown1: false,
  });

  const handleMobileMenuToggle = () => {
    setIsMobileMenuExpanded(!isMobileMenuExpanded);
  };

  const handleDropdownToggle = (dropdownName: string) => {
    if (dropdownName in dropdownStates) {
      setDropdownStates((prevStates) => ({
        ...prevStates,
        [dropdownName]: !prevStates[dropdownName],
      }));
    }
  };

  return (
    <>
      <header className="bg-white">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <SCSiteLogo showSiteTitle={true}></SCSiteLogo>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <div className="relative group">
                      <button className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                        Products
                        <ChevronDown size={16} />
                      </button>

                      <div
                        className="absolute left-0 mt-2 w-screen max-w-6xl bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform -translate-x-1/4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Software</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Web Development</a></li>
                              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Mobile Apps</a></li>
                              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Desktop Software</a></li>
                              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Enterprise Solutions</a></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hardware</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Laptops</a></li>
                              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Desktops</a></li>
                              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Tablets</a></li>
                              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Accessories</a></li>
                              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Networking</a></li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured</h3>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-900">New Release</h4>
                              <p className="text-sm text-gray-600 mb-2">Check out our latest product offering with advanced features.</p>
                              <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Learn more →</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link href='/about' className='text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium'>About</Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:flex sm:items-center">
                  <Link
                    className="btn w-full bg-white text-gray-800 shadow-xs hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="account/login"
                  >
                    Sign in
                  </Link>

                  <Link
                    className="btn w-full bg-teal-300 text-gray-800 shadow-xs hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="account/create"
                  >
                    Get Started
                  </Link>
                  <div className='btn w-full bg-gray-100 text-gray-800 shadow-xs hover:bg-gray-50 sm:ml-4 sm:w-auto'>
                    <LocaleSwitcher />
                  </div>
                </div>

                <div className="sm:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    aria-expanded={isMobileMenuExpanded}
                    onClick={handleMobileMenuToggle}
                    id="mobile-menu-button"
                  >
                    <span className="sr-only">Open main menu</span>
                    <Menu />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`sm:hidden ${isMobileMenuExpanded ? '' : 'hidden'}`}
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="bg-gray-100 text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Home</Link>

              <Link href="/about" className="text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">About</Link>

              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-y-2 flex-col">
                  <Link
                    href="/account/login"
                    className="btn w-full text-center text-gray-900 bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/account/create"
                    className="btn bg-primary w-full text-center bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
