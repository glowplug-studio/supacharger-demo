"use client";
import { useTranslations } from 'next-intl';
import type React from "react";
import type { ButtonHTMLAttributes } from "react";
import { toast } from "react-toastify";

interface LogoutButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  className?: string | null;
  children?: React.ReactNode;
}

/**
 * A button component that triggers a logout request when clicked.
 * On successful logout, the user is redirected to the destination configured in supacharger-config.ts.
 * 
 * @param {LogoutButtonProps} props - Props for the button.
 * @param {string | null} props.className - Optional CSS class for styling.
 * @param {React.ReactNode} props.children - Button content (defaults to "Logout").
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} props - Additional button attributes.
 * 
 * @returns {JSX.Element} A button element that initiates logout on click.
 */
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

      if (response.redirected) {
        toast.success(t('logoutSucceeded'));
        // Small delay to allow toast to be seen before redirect
        setTimeout(() => {
          window.location.href = response.url;
        }, 800);
      } else if (!response.ok) {
        toast.error(t('logoutFailed'));
      } else {
        // Handle unexpected successful response without redirect
        toast.error(t('logoutFailed'));
      }
    } catch (error) {
      toast.error(t('logoutFailed'));
    }
  };

  return (
    <button onClick={handleLogout} className={className || ""} {...props}>
      {children}
    </button>
  );
}
