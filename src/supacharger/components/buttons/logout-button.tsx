"use client";

import Link from "next/link";
import { useTranslations } from 'next-intl';
import type React from "react";
import { toast } from "react-toastify";

import { SC_CONFIG } from "@/supacharger/supacharger-config";

interface LogoutLinkProps {
  className?: string | null;
  children?: React.ReactNode;
}

export default function LogoutLink({
  className,
  children = "Logout",
}: LogoutLinkProps) {
  const t = useTranslations('Toasts');

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default link navigation

    try {
      const response = await fetch("/account/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success(t('logoutSucceeded'), SC_CONFIG.TOAST_CONFIG);
        setTimeout(() => {
          window.location.href = response.url;
        }, 800);
      } else {
        toast.error(t('logoutFailed'));
      }
    } catch (error) {
      toast.error(t('logoutFailed'));
    }
  };

  return (
    <Link
      href="/account/logout"
      onClick={handleLogout}
      className={className || ""}
      prefetch={false}
      passHref
    >
      {children}
    </Link>
  );
}
