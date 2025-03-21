'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { ActionResponse } from '@/types/action-response';
import { getURL } from '@/supacharger/utils/helpers';

export async function signInWithOAuth(provider: 'github' | 'google'): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getURL('/auth/callback'),
    },
  });

  if (error) {
    console.error(error);
    return { data: null, error: error };
  }

  return redirect(data.url);
}



// export async function signup(formData: FormData) {
//   const supabase = await createClient()

//   // Type-casting here for convenience
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     return { error }; // Return the error instead of redirecting
//   }

//   revalidatePath('/', 'layout');
//   return { success: true }; // Indicate success
// }

export async function signInWithEmail(email: string): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: getURL('/auth/callback'),
    },
  });

  if (error) {
    console.error(error);
    return { data: null, error: error };
  }

  return { data: null, error: null };
}

export async function logoutUser(): Promise<{ success: boolean }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  return error ? { success: false } : { success: true };
}