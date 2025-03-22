'use server';

/** ========== 
 * 
 * Supacharger - Auth Actions.
 * 
 * ========== */

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { ActionResponse } from '@/types/action-response';
import { getURL } from '@/supacharger/utils/helpers';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { authedRedirectDestinaton } from  '@/supacharger/supacharger-config'

/**
 * Logout user
 */
export async function logoutUser(): Promise<{ success: boolean }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  return error ? { success: false } : { success: true };
}

/**
 * Login user with email and password 
 */
export async function loginUser(formData: FormData) {
  const supabase = await createSupabaseServerClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.code }
  }

  revalidatePath('/', 'layout')
  redirect( authedRedirectDestinaton )
}

/**
 * Sign / Sign Up wth Magic Link to email
 */
export async function signInWithEmail(email: string): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: getURL('/auth/callback'),
    },
  });

  if (error) {
    return { data: null, error: error };
  }

  return { data: data, error: null };
}

/**
 * Create a new user with email password combo
 */
export async function createUserByEmailPassword(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return { data: null, error: error };
  }

  return { data: data, error: null };
}




//// @TODO the rest is questionable 

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







