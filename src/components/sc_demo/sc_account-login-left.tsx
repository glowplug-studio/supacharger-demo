import Link from 'next/link';

export default function SCAccountLoginLeft() {
  return (
    //@TODO handle session state - of theres a sesson then switch this href value based on the src/supacharger/supacharger-config.ts SC_CONFIG.NO_SESSION_HOME_PATH and SC_CONFIG.SESSION_HOME_PATH
    <div
      className='relative hidden flex-1 flex-col bg-cover bg-center bg-no-repeat lg:flex'
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1531274071216-aea6e7a086c7?q=80&w=1935)',
      }}
    >
      <div className='absolute top-0 flex w-full justify-between gap-4 border-b border-white/10 bg-black/20 py-6 pl-8 pr-6 backdrop-blur-md xl:pl-24'>
        <div className='flex items-center gap-4'>
          <a href='/en'>
            <div className='w-9'>
              {/* Replace with your logo SVG */}
              <svg viewBox='0 0 36 36' fill='#3b82f6'>
                <circle cx='18' cy='18' r='18' />
              </svg>
            </div>
          </a>
          <span className='text-xl font-bold text-white'>Tengr.ai</span>
        </div>
        <div className='flex gap-4'>
          <a href='#' className='text-base text-white hover:underline'>
            Privacy Policy
          </a>
          <a href='#' className='text-base text-white hover:underline'>
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
}
