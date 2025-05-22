import { supabaseDatabaseClient } from '@/supacharger/utils/supabase/client';

export async function getCustomerId({ userId }: { userId: string }) {
  const { data, error } = await supabaseDatabaseClient
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error('Error fetching stripe_customer_id');
  }

  return data.stripe_customer_id;
}
