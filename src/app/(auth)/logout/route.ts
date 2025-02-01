import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    // Create Supabase client
    const supabase = await createClient();

    // Sign out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error signing out:', error);
        return NextResponse.json({ success: false, message: 'Failed to log out' }, { status: 500 });
    }

    // Redirect to the login page after logging out
    return NextResponse.redirect('/signin');
}
