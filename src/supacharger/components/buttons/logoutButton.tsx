"use client"
import {useTranslations} from 'next-intl';
import type React from "react"

import { useRouter } from "next/navigation"
import type { ButtonHTMLAttributes } from "react"
import { toast } from "react-toastify"

interface LogoutButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  className?: string | null
  children?: React.ReactNode
}

export default function LogoutButton({ className, children = "Logout", ...props }: LogoutButtonProps) {
  const router = useRouter()

  const t = useTranslations('Toasts');

  const handleLogout = async () => {
    try {
      const response = await fetch("/account/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }) //@ TODO reoplace 

      if (response.redirected) {
        // Show success toast before redirecting
        toast.success(t('logoutSucceeded'))
        // Small delay to allow toast to be seen before redirect
        setTimeout(() => {
          window.location.href = response.url
        }, 800)
      } else if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        toast.error(errorData.message || t('logoutFailed') )
      }
    } catch (error) {
      toast.error(t('logoutFailed'))
    }
  }

  return (
    <button onClick={handleLogout} className={className || ""} {...props}>
      {children}
    </button>
  )
}