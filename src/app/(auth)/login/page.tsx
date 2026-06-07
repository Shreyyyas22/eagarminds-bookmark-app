"use client";

import { login } from "@/actions/auth";
import { AuthSubmitButton } from "@/components/AuthSubmitButton";
import { AuthCard, AuthError, FormLabel } from "@/components/auth/AuthCard";
import type { ActionState } from "@/lib/types";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

const initialState: ActionState = {};

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Log in to your account"
      subtitle="Access your dashboard and manage your bookmarks."
      footer={
        <>
          Need an account?{" "}
          <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Sign up free
          </Link>
        </>
      }
    >
      <form action={formAction} className="space-y-5">
        <div>
          <FormLabel htmlFor="email">Email</FormLabel>
          <div className="relative mt-2">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <FormLabel htmlFor="password">Password</FormLabel>
          <div className="relative mt-2">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="input-field pl-10"
            />
          </div>
        </div>

        {state.error ? (
          <div className="pt-1">
            <AuthError message={state.error} />
          </div>
        ) : null}

        <div className="pt-1">
          <AuthSubmitButton>Log in</AuthSubmitButton>
        </div>
      </form>
    </AuthCard>
  );
}
