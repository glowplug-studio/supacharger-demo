import { isLoggedIn } from '@/utils/helpers';
import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';
import { AccountMenu } from '@/components/account-menu';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { signOut } from './(auth)/auth-actions';
import LocaleSwitcher from '../components/LocaleSwitcher';
import { cookies } from 'next/headers';

export async function Navigation() {
  const session = await isLoggedIn();

   // Get the current locale from cookies
   const cookieStore = await cookies();
   const currentLocale = cookieStore.get('supacharger_locale')?.value || 'en'; // Default to 'en' if not set

   // Load translations for the current locale
   const messages = await import(`../../messages/${currentLocale}.json`).then((module) => module.default);

  return (
    <div className='relative flex items-center gap-6'>


    <LocaleSwitcher currentLocale={currentLocale} />

      {session ? (
        <AccountMenu signOut={signOut} />
      ) : (
        <>
          <Button variant='sexy' className='hidden flex-shrink-0 lg:flex' asChild>
            <Link href='/signup'>Get started for free</Link>
          </Button>
          <Sheet>
            <SheetTrigger className='block lg:hidden'>
              <IoMenu size={28} />
            </SheetTrigger>
            <SheetContent className='w-full bg-black'>
              <SheetHeader>
                <Logo />
                <SheetDescription className='py-8'>
                  <Button variant='sexy' className='flex-shrink-0' asChild>
                    <Link href='/signup'>Get started for free</Link>
                  </Button>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
}
