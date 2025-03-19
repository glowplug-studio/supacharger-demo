import { PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';
import { PricingCard } from '@/features/pricing/components/price-card';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { Price, ProductWithPrices } from '@/features/pricing/types';

export default async function BillingPage() {
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
    { name: 'Account Settings', href: '/account', current: false },
    { name: 'Edit Profile', href: '/account/profile', current: true },
    { name: 'Billing', href: '/account/billing', current: false },
  ];

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <main className='flex-1 bg-stone-800 py-10'>
      <div className='container'>
        <h1 className='mb-8 text-center text-4xl lg:text-left'>Account</h1>
      </div>
      <div className='container flex min-h-screen flex-col gap-8 py-8 lg:flex-row'>
        {/* Sidebar */}
        <nav aria-label='Sidebar' className='w-full flex-shrink-0 lg:w-64'>
          <ul role='list' className='space-y-1'>
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-50 '
                      : 'text-gray-700 hover:bg-gray-50 ',
                    'group flex gap-x-3 rounded-md p-2 pl-3  font-semibold'
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-bold'>Edit Profile</h2>
        </div>
      </div>
    </main>
  );
}
