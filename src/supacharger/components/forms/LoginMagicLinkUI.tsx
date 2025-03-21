"use client";

/** ==========
 *
 * Supacharger - Login with Magic Link Component.
 *
 * ========== */

import { FormEvent, useState } from "react";
import { signInWithEmail } from "../../../app/(supacharger)/auth-actions";
import { toast } from "react-toastify";

export function LoginMagicLinkUI() {
  const [pending, setPending] = useState(false);
  const [emailFormOpen, setEmailFormOpen] = useState(false);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = event.target as HTMLFormElement;
    const email = form["email"].value;
    const response = await signInWithEmail(email);

    if (response?.error) {
      toast.error("FAIL");
    } else {
      toast.success("worked");
    }

    form.reset();
    setPending(false);
  }
  return (
    <form onSubmit={handleEmailSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        aria-label="Enter your email"
        autoFocus
        className="input"
      />
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="btn bg-gray-500"
          onClick={() => setEmailFormOpen(false)}
        >
          Cancel
        </button>
        <button className="btn bg-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}