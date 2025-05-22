"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { toast } from "react-toastify";

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

const SUPABASE_ERROR_MESSAGES: Record<string, string> = {
  "invalid_email": "The email address is invalid.",
  "user_not_found": "No account found with this email address.",
  "unexpected_error": "An unexpected error occurred. Please try again.",
  // Add more mappings as needed
};

export default function ResetPasswordForm() {
  const tAuthTerms = useTranslations('AuthTerms');
  const tPasswordResetPage = useTranslations('PasswordResetPage');

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      await post("/api/account/request-password-reset", { email });
      toast.success(tPasswordResetPage('emailSent'));
      setStatus(null);
      form.reset();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 24 * 60 * 60 * 1000); // 24 hours for debugging
    } catch (error: any) {
      const errorCode = error?.error || error?.code;
      const errorMsg =
        (errorCode && SUPABASE_ERROR_MESSAGES[errorCode]) ||
        error?.error_description ||
        "Failed to request password reset.";
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