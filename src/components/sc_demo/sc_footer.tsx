'use client';
import FacebookLogo from '@/assets/images/socialAuthIcons/FacebookLogo.svg';
import GoogleLogo from '@/assets/images/socialAuthIcons/GoogleLogo.svg';
import LinkedinLogo from '@/assets/images/socialAuthIcons/LinkedinLogo.svg';
import MicrosoftLogo from '@/assets/images/socialAuthIcons/MicrosoftLogo.svg';
import XLogo from '@/assets/images/socialAuthIcons/XLogo.svg';
import { SC_CONFIG } from '@/supacharger/supacharger-config';

import SCSiteLogo from './sc_site-logo';

export default function SCFooter() {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='space-y-8'>
            <div className='flex items-center'>
              <SCSiteLogo />
              <div className='ml-3 font-bold'>{SC_CONFIG.SITE_TITLE}</div>
            </div>

            <div className='flex gap-x-6'>
              <a href='#' className='text-gray-600 hover:text-gray-800'>
                <span className='sr-only'>Facebook</span>
                <FacebookLogo height='22' width='22' />
              </a>
              <a href='#' className='text-gray-600 hover:text-gray-800'>
                <span className='sr-only'>Microsoft</span>
                <MicrosoftLogo height='22' width='22' />
              </a>
              <a href='#' className='text-gray-600 hover:text-gray-800'>
                <span className='sr-only'>X</span>
                <XLogo height='22' width='22' />
              </a>
              <a href='#' className='text-gray-600 hover:text-gray-800'>
                <span className='sr-only'>Google</span>
                <GoogleLogo height='22' width='22' />
              </a>
              <a href='#' className='text-gray-600 hover:text-gray-800'>
                <span className='sr-only'>LinkedIn</span>
                <LinkedinLogo height='22' width='22' />
              </a>
            </div>
          </div>
          <div className='mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm/6 font-semibold text-gray-900'>Solutions</h3>
                <ul role='list' className='mt-6 space-y-4'>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Marketing
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Analytics
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Automation
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Commerce
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Insights
                    </a>
                  </li>
                </ul>
              </div>
              <div className='mt-10 md:mt-0'>
                <h3 className='text-sm/6 font-semibold text-gray-900'>Support</h3>
                <ul role='list' className='mt-6 space-y-4'>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Submit ticket
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Guides
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-sm/6 font-semibold text-gray-900'>Company</h3>
                <ul role='list' className='mt-6 space-y-4'>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      About
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div className='mt-10 md:mt-0'>
                <h3 className='text-sm/6 font-semibold text-gray-900'>Legal</h3>
                <ul role='list' className='mt-6 space-y-4'>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Terms of service
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      Privacy policy
                    </a>
                  </li>
                  <li>
                    <a href='#' className='text-sm/6 text-gray-600 hover:text-gray-900'>
                      License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24'>
          <p className='text-sm/6 text-gray-600'>
            &copy; {SC_CONFIG.SITE_TITLE} {new Date().getFullYear()}, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
