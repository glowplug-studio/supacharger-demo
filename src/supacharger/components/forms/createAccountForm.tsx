"use client"

import { useEffect, useRef,useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, CircleArrowRight, Eye, EyeOff, Mail } from "lucide-react"
import type React from "react"
import { toast } from "react-toastify"

import { SC_CONFIG } from "@/supacharger/supacharger-config"

import { createUserByEmailPassword } from "../../../app/(supacharger)/auth-actions"
import { SCP_REGISTRY } from "../../plugins/registry"

const renderAuthProviderButtons = Object.values(SC_CONFIG.AUTH_PROVDERS_ENABLED).some((enabled) => enabled)

const AuthProviderButtons = renderAuthProviderButtons
  ? dynamic(() => import("../buttons/authProviderButtons"), {
      ssr: false,
    })
  : null

/**
 * BREVOCODE
 */
const BrevoNewsletterRegistrationCheckbox = dynamic(
  () => import("../../plugins/scp_brevo/brevoNewsletterRegistrationCheckbox"),
  {
    ssr: false, // Optional: Disable server-side rendering
  },
)

export function CreateAccountForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [isInitialRender, setIsInitialRender] = useState(true)
  const socialSectionRef = useRef(null)

  const tAuthTerms = useTranslations("AuthTerms")
  const tCreateAccountFormComponent = useTranslations("CreateAccountFormComponent")

  const handleToggle = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)

      const result = await createUserByEmailPassword(formData)
      if (result?.error) {
        toast.error("Failed to create account" + result.error) //supabaseErrorCodeLocalisation('result.error'));
      } else {
        toast.success("Account created successfully")
      }
    } catch (error) {
      console.error("Error creating user:", error)
      toast.error("Failed to create account")
    }
  }

  const formVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const passwordContainerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const toggleForm = () => {
    setShowForm(!showForm)

    // If we're showing the email form (hiding social), make sure social section animates properly next time
    if (!showForm && socialSectionRef.current) {
      socialSectionRef.current.style.height = "auto"
      socialSectionRef.current.style.opacity = "1"
    }
  }

  useEffect(() => {
    // Mark that initial render is complete
    setIsInitialRender(false)
  }, [])

  return (
    <>
      <AnimatePresence>
        {!showForm && (
          <motion.div
            ref={socialSectionRef}
            variants={formVariants}
            initial={isInitialRender ? false : "hidden"}
            animate="visible"
            exit="hidden"
            style={{ overflow: "hidden" }}
            className="social-auth-container"
          >
            {AuthProviderButtons && <AuthProviderButtons />}

            {renderAuthProviderButtons ? (
              <div className="my-4 py-2 font-medium text-gray-700">
                <div className="flex w-full items-center justify-between">
                  <div className="flex-1">
                    <hr className="border-gray-300"></hr>
                  </div>
                  <div className="px-4 text-gray-400 text-sm">
                    {tCreateAccountFormComponent("orCreateAccountWithEmail")}
                  </div>
                  <div className="flex-1">
                    <hr className="border-gray-300"></hr>
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-4 py-2"></div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleForm}
        className={`btn w-full ${showForm ? "bg-gray-100 text-gray-700" : "bg-primary text-white"}`}
      >
        {showForm
          ? tCreateAccountFormComponent("hideEmailFormButtonText")
          : tCreateAccountFormComponent("showEmailFormButtonText")}
        {showForm ? <ArrowLeft size={18} /> : <Mail size={18} />}
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ overflow: "hidden" }}
          >
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="my-2">
                <label htmlFor="name" className="block text-gray-700">
                  {tAuthTerms("name")}
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="my-2">
                <label htmlFor="email" className="block text-gray-700">
                  {tAuthTerms("emailAddress")}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="my-2">
                <label htmlFor="password" className="block  text-gray-700">
                  {tAuthTerms("password")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden  mt-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <button type="button" className="text-gray-600 hover:text-gray-900" onClick={handleToggle}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <motion.div
                variants={passwordContainerVariants}
                initial="visible"
                animate="visible"
                style={{ overflow: "hidden" }}
                className="my-2"
              >
                <label htmlFor="password-again" className="block   text-gray-700">
                  {tAuthTerms("retypePassword")}
                </label>
                <div>
                  <input
                    id="password-again"
                    name="password-again"
                    type="password"
                    required
                    className="focus:shadow-outline focus w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-hidden mt-2"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                </div>
              </motion.div>

              {error && <p className="error">{error}</p>}

              {/**
               * BREVOCODE
               */}
              {SCP_REGISTRY.BREVO.ENABLED && <BrevoNewsletterRegistrationCheckbox />}

              <div className="mt-4">
                <button type="submit" className="btn w-full bg-primary text-white hover:bg-teal-800">
                  {tAuthTerms("signUp")} <CircleArrowRight size={18} className="" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="my-6">
        <Link
          href="/account/login"
          className="flex w-full appearance-none justify-between rounde px-6 py-3 text-sm leading-tight text-gray-700 hover:bg-gray-100 hover:no-underline border border-gray-200 rounded-4xl"
        >
          <span className="font-normal">{tCreateAccountFormComponent("iAlreadyHaveAnAccount")}</span>
          <span className="">{tAuthTerms("logIn")}</span>
        </Link>
      </div>
    </>
  )
}