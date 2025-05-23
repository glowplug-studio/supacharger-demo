"use client";

/** =========================================================================
 *
 *  Supacharger - Password Reset Link Request Form Component
 *
 *  Description: User can request a password reset link
 *
 *  Author: J Sharp <j@glowplug.studio>
 *
 *  License: CC BY-NC-SA 4.0
 *
 * ========================================================================= */

import { useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import { toast } from "react-toastify";

import { supabaseErrorCodeLocalisation } from "@/supacharger/utils/helpers";

import SaveButton from "../buttons/form-save-button";

// Local POST helper
async function post<T = any>(url: string, data: any): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export default function ResetPasswordForm() {
  const tAuthTerms = useTranslations('AuthTerms');
  const tPasswordResetPage = useTranslations('PasswordResetPage');
  const tSupabaseErrorCodes = useTranslations('SupabaseErrorCodes');

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get email from query param if present
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';
  const [email, setEmail] = useState(emailFromQuery);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    try {
      await post("/api/account/request-password-reset", { email });
      toast.success(tPasswordResetPage('emailSent'));
      setStatus(null);
      formRef.current?.reset();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 24 * 60 * 60 * 1000);
    } catch (error: any) {
      const errorMsg =
        error?.error_description ||
        error?.error ||
        error?.message ||
        tSupabaseErrorCodes('genericError');
      setStatus(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} className="max-w-md space-y-4" onSubmit={handleSubmit}>
      <label htmlFor="email" className="block text-sm font-medium">
        {tPasswordResetPage('description')}
      </label>
      <div className="space-y-2">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          aria-label="Enter your email"
          autoFocus
          required
          className="input w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      {status && <div className="sc-message-error">{status}</div>}
      <div className="mt-4 flex items-center justify-between">
        <SaveButton
          isLoading={isLoading}
          isSuccess={isSuccess}
          initialLabel={tPasswordResetPage('getResetLink')}
          savingLabel={tAuthTerms('sendNewAuthEmailSendingButtonLabel')}
          completeLabel={tAuthTerms('sendNewAuthEmailSentButtonLabel')}
        />
        <Link
          className="text-sm font-semibold"
          href="/account/login"
        >
          {tAuthTerms("backToSignIn")}
        </Link>
      </div>
    </form>
  );
}
