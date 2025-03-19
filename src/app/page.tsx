import Image from 'next/image';
import Link from 'next/link';
import ExampleDash from '@/supacharger/components/exampleDash';
import ExampleHero from '@/supacharger/components/exampleHero';
import { AccountMenu } from '@/components/account-menu';
import { signOut } from './(auth)/auth-actions';

import { useTranslations } from 'next-intl';

import { isLoggedIn } from '@/utils/supabase/server';



export default async function RootPage() { 

  const session = await isLoggedIn();

  return (

    <section className='relative overflow-hidden lg:overflow-visible bg-gray-800'>
      
      {session ? (<>
        <ExampleDash></ExampleDash>
        <AccountMenu signOut={signOut} />
        </>
      ) : (
        <>
          <ExampleHero></ExampleHero>
        </>
      )}


  </section>
  );

}

