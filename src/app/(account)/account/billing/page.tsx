import { PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CreditCard } from 'lucide-react';

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
    { name: 'Edit Profile', href: '/account/profile', current: false },
    { name: 'Billing', href: '/account/billing', current: true },
  ]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

  return (
      <main className="flex-1 bg-grey-600 py-10">
        <div className='container'>
        <h1 className='mb-8 text-center lg:text-left text-4xl'>Account</h1>
        <hr></hr>
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
                  item.current ? 'bg-gray-50 ' : 'text-white hover:bg-gray-50 ',
                  'group flex gap-x-3 rounded-md p-2 pl-3  font-semibold',
                )}
              >
                 <CreditCard  size="14" className='mr-2' />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

        <div className='flex flex-col gap-4'>
          <h2 className='font-bold text-2xl mb-4'>Billing &amp; Subscriptions</h2>
          <Card
            title='Your Plan'
            footer={
              subscription ? (
                <Button size='sm' variant='secondary' asChild>
                  <Link href='/manage-subscription'>Manage your subscription</Link>
                </Button>
              ) : (
                <Button size='sm' variant='secondary' asChild>
                  <Link href='/account//billing/subscribe'>Start a subscription</Link>
                </Button>
              )
            }
          >
            {userProduct && userPrice ? (
              <PricingCard product={userProduct} price={userPrice} />
            ) : (
              <p>You don&apos;t have an active subscription</p>
            )}
          </Card>
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
    <div className='w-full max-w-3xl rounded-md bg-zinc-900'>
      <div className='p-4'>
        <h2 className='mb-1 text-xl font-semibold'>{title}</h2>
        <div className='py-4'>{children}</div>
      </div>
      <div className='flex justify-end rounded-b-md border-t border-zinc-800 p-4'>{footer}</div>
    </div>
  );
}
