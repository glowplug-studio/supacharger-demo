'use server';

/** ==========
 *
 * Supacharger - Auth Actions.
 *
 * ========== */

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/supacharger/libs/supabase/supabase-server-client';
import { SC_CONFIG } from  '@/supacharger/supacharger-config';
import { getURL } from '@/supacharger/utils/helpers';
import { ActionResponse } from '@/types/action-response';

/**
 * Logout user
 */
export async function logoutUser(): Promise<{ success: boolean }> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  return error ? { success: false } : { success: true };
}

/**
 * Login user with email and password
 */
export async function loginUser(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.code }
  }

  revalidatePath('/', 'layout')
  redirect( SC_CONFIG.LOGIN_REDIRECT_DESTINATON )
}

/**
 * Sign / Sign Up wth Magic Link to email
 */
export async function signInWithEmail(email: string): Promise<ActionResponse> {
  const supabase = await createClient();

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
  const supabase = await createClient();
  
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

/**
 *  Resends the activation email to unconfirmed users
 */
export async function resendAccountConfirmEmail(email: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: SC_CONFIG.ACCOUNT_CONFIRMED_PATH
    }
  });

  return { data, error };
}


//// @TODO the rest is questionable

export async function signInWithOAuth(provider: 'github' | 'google'): Promise<ActionResponse> {
  const supabase = await createClient();

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







