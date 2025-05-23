import Link from 'next/link';

import SCSiteLogo from './sc_site-logo';

export default function SCAccountLoginLeft() {
  return (
    //@TODO handle session state - of theres a sesson then switch this href value based on the src/supacharger/supacharger-config.ts SC_CONFIG.NO_SESSION_HOME_PATH and SC_CONFIG.SESSION_HOME_PATH
    <div
      className='relative hidden flex-1 flex-col bg-cover bg-center bg-no-repeat lg:flex'
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1744035783523-203d2bfc75d0?q=80&w=1974)',
      }}
    >
      <div className='absolute top-0 flex w-full justify-between gap-4 py-6 pl-8 pr-6 xl:pl-24 '>
        <div className='m-4 flex items-center gap-4 rounded-md bg-white p-6'>
          <SCSiteLogo showSiteTitle={true} />
        </div>
      </div>
    </div>
  );
}
