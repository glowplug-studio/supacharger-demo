import { PropsWithChildren, ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { Price, ProductWithPrices } from '@/features/pricing/types';


export default async function AccountPage() {
  const [session, subscription, products] = await Promise.all([getSession(), getSubscription(), getProducts()]);

  if (!session) {
    redirect('/signin');
  }

  let userProduct: ProductWithPrices | undefined;
  let userPrice: Price | undefined;

  if (subscription) {
    for (const product of products) {
      for (const price of product.prices) {
        if (price.id === subscription.price_id) {
          userProduct = product;
          userPrice = price;
        }
      }
    }
  }

  const navigation = [
    { name: 'Account Settings', href: '/account', current: true },
    { name: 'Edit Profile', href: '/account/profile', current: false },
    { name: 'Billing', href: '/account/billing', current: false },
  ]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

  return (
    <main className="flex-1 bg-gray-800 py-10">
      <div className='container'>
        <h1 className='mb-8 text-center lg:text-left text-4xl font-bold'>Account</h1>
      </div>
      <div className="container flex min-h-screen flex-col gap-8 py-8 lg:flex-row">
        {/* Sidebar */}
        <nav aria-label="Sidebar" className="w-full lg:w-64 flex-shrink-0">
          <ul role="list" className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-50 ' : 'text-gray-700 hover:bg-gray-50 ',
                    'group flex gap-x-3 rounded-md p-2 pl-3  font-semibold',
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex flex-col gap-4 flex-1'>
          <h2 className='text-xl'>You authenticated with</h2>
          <p>Google</p>
          <p>Email</p>

          <hr></hr>
          <h3 className='text-lg'>Change Password</h3>

          <hr></hr>
          <h3 className='text-lg'>Change Email address</h3>

          <hr></hr>
          <h2 className='text-xl'>Privacy</h2>

          

          <hr></hr>
          <h2 className='text-xl'>Cancel Account</h2>

          <hr></hr>
          <h2 className='text-xl'>Deactivate Account</h2>

      
        </div>
      </div>
    </main>
  );
}

function Card({
  title,
  footer,
  children,
}: PropsWithChildren<{
  title: string;
  footer?: ReactNode;
}>) {
  return (
    <div className='m-auto w-full max-w-3xl rounded-md bg-zinc-900'>
      <div className='p-4'>
        <h2 className='mb-1 text-xl font-bold'>{title}</h2>
        <div className='py-4'>{children}</div>
      </div>
      <div className='flex justify-end rounded-b-md border-t border-zinc-800 p-4'>{footer}</div>
    </div>
  );
}
