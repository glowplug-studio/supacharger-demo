'use server';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { authedRedirectDestinaton } from '@/supacharger/supacharger-config';
import { getURL } from '@/supacharger/utils/helpers';

export async function GET() {
    // Create Supabase client
    const supabase = await createClient();
    // Sign out the user
    var { error } = await supabase.auth.signOut();
    if (error) {
        return NextResponse.json({ success: false, message: 'Failed to log out' }, { status: 500 });
    }
    // Redirect
    const redirectURL = getURL(authedRedirectDestinaton);
    return NextResponse.redirect(redirectURL);
}

export async function POST() {
    return await GET(); // Reuse the GET logic
}