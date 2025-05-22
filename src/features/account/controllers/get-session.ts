import { createClient } from '@/supacharger/utils/supabase/server';

export async function getSession() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  return data;
}
