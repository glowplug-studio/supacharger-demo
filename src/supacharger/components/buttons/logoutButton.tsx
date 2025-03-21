"use client";

import { useTranslations } from 'next-intl';
import type React from "react";
import type { ButtonHTMLAttributes } from "react";
import { toast } from "react-toastify";

interface LogoutButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  className?: string | null;
  children?: React.ReactNode;
}

export default function LogoutButton({
  className,
  children = "Logout",
  ...props
}: LogoutButtonProps) {

  const t = useTranslations('Toasts');

  const handleLogout = async () => {
    try {
      const response = await fetch("/account/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (response.ok) {
        toast.success(t('logoutSucceeded'));
        // Small delay to allow toast to be seen before redirect
        setTimeout(() => {
          window.location.href = response.url;
        }, 800);
      } else {
        // Handle HTTP errors
        toast.error(t('logoutFailed'));
      }
    } catch (error) {
      // Handle network errors
      toast.error(t('logoutFailed'));
    }
  };

  return (
    <button onClick={handleLogout} className={className || ""} {...props}>
      {children}
    </button>
  );
}