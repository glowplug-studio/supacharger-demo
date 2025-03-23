import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import ExampleDash from '@/supacharger/components/exampleDash';
import ExampleHero from '@/supacharger/components/exampleHero';
import { AccountMenu } from '@/components/menus/sc_account-menu';
import { isLoggedIn } from '@/utils/supabase/server';



export default async function RootPage() {

  const session = await isLoggedIn();

  return (

    <section className='relative overflow-hidden lg:overflow-visible bg-gray-800'>

      {session ? (<>
        <ExampleDash></ExampleDash>
        <AccountMenu />
        </>
      ) : (
        <>
          <ExampleHero></ExampleHero>
        </>
      )}

  </section>
  );

}

