'use server';
import { NextResponse } from 'next/server';
import { authedRedirectDestinaton } from '@/supacharger/supacharger-config';
import { getURL } from '@/supacharger/utils/helpers';
import { logoutUser } from '../../(auth)/auth-actions';

/**
 * Handles GET requests for the logout route.
 * Initiates user logout and redirects to the configured destination upon success.
 * 
 * @returns {NextResponse} A response that either redirects the user or returns an error.
 */
export async function GET(): Promise<NextResponse> {
    const logoutResult = await logoutUser();
    if (!logoutResult.success) {
        return NextResponse.json(logoutResult, { status: 500 });
    }
    const redirectURL = getURL(authedRedirectDestinaton);
    return NextResponse.redirect(redirectURL);
}

export async function POST() {
    return await GET(); // Reuse the GET logic
}