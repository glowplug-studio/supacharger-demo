"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import SCSiteLogo from "@/components/sc_demo/sc_site-logo";
import ResetPasswordForm from "@/supacharger/components/forms/reset-password-request-link-form";

export default function LoginPage() {
  const tPasswordResetPage= useTranslations("PasswordResetPage");
  const tGlobal = useTranslations('Global');
  const tAuthTerms = useTranslations('AuthTerms');

  return (
    <div className="flex h-screen flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-sc-gradient">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <div className="mb-6 block">
            <SCSiteLogo showSiteTitle={false} darkMode={false} />
          </div>
          <h1 className="mb-8 text-2xl/9 font-bold tracking-tight text-gray-700">
            {tPasswordResetPage("title")}{" "}
          </h1>

          <ResetPasswordForm></ResetPasswordForm>

        </div>
      </div>
    </div>
  );
}