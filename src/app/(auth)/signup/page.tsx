import { redirect } from 'next/navigation';

import { getSubscription } from '@/features/account/controllers/get-subscription';

import { AuthUI } from '../auth-ui';

export default async function SignUp() {
  const session = await getSession();
  const subscription = await getSubscription();

  if (session && subscription) {
    redirect('/account');
  }

  if (session && !subscription) {
    redirect('/pricing');
  }

  return (
    <section className='py-xl m-auto flex h-full max-w-lg items-center'>
      
    </section>
  );
}
