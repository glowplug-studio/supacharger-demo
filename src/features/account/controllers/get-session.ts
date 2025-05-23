import { createClient } from '@/supacharger/lib/server';

export async function getSession() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  return data;
}
