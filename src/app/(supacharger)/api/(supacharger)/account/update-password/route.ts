'use server';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { evaluatePasswordStrength } from '@/supacharger/utils/helpers';
import { getUser, getUserSession } from '@/utils/supabase/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  // Parse the request body
  const { password, newPassword, newPasswordRetype } = await request.json();

  // evaluate passwords
  if (!password) {
    return NextResponse.json({ error: 'password_required' }, { status: 400 });
  }
  if (newPassword !== newPasswordRetype) {
    return NextResponse.json({ error: 'provided_password_mismatch' }, { status: 400 });
  }
  const passStrengthValidity = evaluatePasswordStrength(newPassword);
  if (!passStrengthValidity.valid) {
    return NextResponse.json({ error: passStrengthValidity.message }, { status: 400 });
  }

  // get the userSession and accessToken
  const supaSession = await getUserSession();
  const accessToken = supaSession.session.access_token;

  // get the user by JWT
  //This method is useful for checking if the user is authorized because it validates the user's access token JWT on the server.
  const supaUser = await getUser(accessToken, true);

  const supaUserId = supaUser.data.user.id;
  const supaSessionId = supaSession.session.user.id;
  // Server side verification that supplied token data is valid for the current user session.
  // @todo It's probaly uncessary to check the User as well as only the JWT is passed to the rpc call. Anyway be extra safe when it comes to password update.
  if (
    !supaUser?.data?.user ||
    !supaUserId ||
    !supaSessionId ||
    supaUserId !== supaSessionId
  ) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }

  //Use the access token to make the client
  const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    accessToken
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        }
      : undefined
  );

  //rpc call to function
  const { data, error } = await supabase.rpc('verify_user_password', {
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data.matched == true) {
    const { data, error } = await supaUser.supabase.auth.updateUser({
      password: newPassword,
    });

    return NextResponse.json({ data: { updated: true } });
  }

  // data will be true or false depending on password validity
  return NextResponse.json({ data });
}
