import { createClient } from '@/supacharger/libs/supabase/supabase-server-client';

export async function getSession() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  return data;
}
