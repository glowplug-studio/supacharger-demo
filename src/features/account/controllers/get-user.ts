import { createClient } from '@/supacharger/lib/server'

export async function getUser() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('users').select('*').single();

  if (error) {
    console.error(error);
  }

  return data;
}
