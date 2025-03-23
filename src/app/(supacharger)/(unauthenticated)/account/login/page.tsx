"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import SiteLogo from "@/components/siteLogo";
import { LoginUserForm } from "@/supacharger/components/forms/loginUserForm";
import { SC_CONFIG } from "@/supacharger/supacharger-config";

export default function LoginPage() {
  const tLoginPage= useTranslations("LoginPage");
  const tGlobal = useTranslations('Global');
  const tAuthTerms = useTranslations('AuthTerms');

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-sc-gradient">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <div className="mb-28 block">
            <SiteLogo showSiteTitle={false} darkMode={false} />
          </div>
          <h1 className="mb-8 text-2xl/9 font-bold tracking-tight text-gray-700">
            {tLoginPage("title")}{" "}
          </h1>

          <LoginUserForm></LoginUserForm>

          <div className="mt-6">
            <Link
              href="/account/create"
              className="flex w-full appearance-none justify-between rounde px-6 py-3 text-sm leading-tight text-gray-700 hover:bg-gray-100 hover:no-underline border border-gray-200 rounded-4xl"
            >
              <span className="text-normal">New to{" "}{tGlobal("siteTitle")}?</span>
              <span className="font-bold">{tAuthTerms("createAnAccount")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}