// app/(auth)/logout/route.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function GET() {
    // Create Supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Sign out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error signing out:', error);
        return NextResponse.json({ success: false, message: 'Failed to log out' }, { status: 500 });
    }

    // Redirect to the login page after logging out
    return NextResponse.redirect('/login');
}
