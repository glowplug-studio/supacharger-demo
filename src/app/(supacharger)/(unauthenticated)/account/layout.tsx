import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

import { SC_CONFIG } from "@/supacharger/supacharger-config";

export const metadata: Metadata = {
  title: SC_CONFIG.SITE_TITLE,
  description:
    "Start your next project without reinventing the wheel. REPLACE_ME",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative flex-1">
      <div className="relative h-full">{children}</div>
    </main>
  );
}
