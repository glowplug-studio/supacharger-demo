"use client";

import { useTranslations } from "next-intl";
import { LoginUserForm } from "@/supacharger/components/forms/loginUserForm";
import SiteLogo from "@/components/siteLogo";
import Link from "next/link";

export default function LoginPage() {
  const t = useTranslations("LoginPage");

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-sc-gradient">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <div className="mb-28 block">
            <SiteLogo showSiteTitle={false} darkMode={false} />
          </div>
          <h1 className="mb-8 text-2xl/9 font-bold tracking-tight text-gray-700">
            {t("title")}{" "}
          </h1>

          <LoginUserForm></LoginUserForm>

          <div className="mt-6">
            <Link
              href="/account/create"
              className="flex w-full appearance-none justify-between rounded bg-gray-100  px-6 py-3 text-sm leading-tight text-gray-700 hover:bg-gray-200 hover:no-underline"
            >
              <span className="text-normal">I don't have an account</span>
              <span className="font-bold">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}