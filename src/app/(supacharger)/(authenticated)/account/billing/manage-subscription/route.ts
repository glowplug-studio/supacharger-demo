import { redirect } from 'next/navigation';

import { getCustomerId } from '@/features/account/controllers/get-customer-id';
import { stripeAdmin } from '@/supacharger/libs/stripe/stripe-admin';
import { getURL } from '@/supacharger/utils/helpers';
import { getUser } from '@/supacharger/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 1. Get the user from session
  const supaUser = await getUser();

  if ('user' in supaUser) {
    if (!supaUser.user.id) {
      throw new Error('Could not get userId');
    }
  } else {
    throw new Error('Failed to retrieve user session');
  }

  // 2. Retrieve or create the customer in Stripe
  const customer = await getCustomerId({
    userId: supaUser.user.id,
  });

  if (!customer) {
    throw Error('Could not get customer');
  }

  // 3. Create portal link and redirect user
  const { url } = await stripeAdmin.billingPortal.sessions.create({
    customer,
    return_url: `${getURL()}/account`,
  });

  redirect(url);
}
