import { stripeObject } from '@/libs/stripe/stripe-object';
import { supabaseDatabaseClient } from '@/libs/supabase/supabase-database-client';

export async function getOrCreateCustomer({ userId, email }: { userId: string; email: string }) {
  const { data, error } = await supabaseDatabaseClient
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  if (error || !data?.stripe_customer_id) {
    // No customer record found, let's create one.
    const customerData = {
      email,
      metadata: {
        userId,
      },
    } as const;

    const customer = await stripeObject.customers.create(customerData);

    // Insert the customer ID into our Supabase mapping table.
    const { error: supabaseError } = await supabaseDatabaseClient
      .from('customers')
      .insert([{ id: userId, stripe_customer_id: customer.id }]);

    if (supabaseError) {
      throw supabaseError;
    }

    return customer.id;
  }

  return data.stripe_customer_id;
}
