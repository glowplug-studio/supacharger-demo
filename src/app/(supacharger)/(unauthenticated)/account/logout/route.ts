"use server";

/** ==========
 *
 * Supacharger - Logout Route.
 *
 * ========== */

import { NextResponse } from "next/server";
import { SC_LOGIN_REDIRECT_DESTINATON } from "@/supacharger/supacharger-config";
import { getURL } from "@/supacharger/utils/helpers";
import { logoutUser } from "../../../auth-actions";

export async function GET(): Promise<NextResponse> {
  const logoutResult = await logoutUser();
  if (!logoutResult.success) {
    return NextResponse.json(logoutResult, { status: 500 });
  }
  const redirectURL = getURL(SC_LOGIN_REDIRECT_DESTINATON);
  return NextResponse.redirect(redirectURL);
}

export async function POST() {
  return await GET(); // Reuse the GET logic
}
