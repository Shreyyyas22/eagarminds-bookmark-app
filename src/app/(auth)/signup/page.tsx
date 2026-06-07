"use client";

import { signUp } from "@/actions/auth";
import { AuthSubmitButton } from "@/components/AuthSubmitButton";
import { AuthCard, AuthError, FormLabel } from "@/components/auth/AuthCard";
import { HandleAvailability } from "@/components/HandleAvailability";
import type { ActionState } from "@/lib/types";
import { AtSign, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

const initialState: ActionState = {};

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <AuthCard
      eyebrow="Get started"
      title="Create your account"
      subtitle="Pick a handle, save your links, and share the public ones from one profile URL."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Log in
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
          <FormLabel htmlFor="password" hint="At least 8 characters">
            Password
          </FormLabel>
          <div className="relative mt-2">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="••••••••"
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <FormLabel htmlFor="handle" hint="Lowercase letters, numbers, and underscores">
            Handle
          </FormLabel>
          <div className="relative mt-2">
            <AtSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              id="handle"
              name="handle"
              type="text"
              autoComplete="username"
              minLength={3}
              maxLength={20}
              required
              placeholder="yourname"
              className="input-field pl-10"
            />
          </div>
          <HandleAvailability />
        </div>

        {state.error ? (
          <div className="pt-1">
            <AuthError message={state.error} />
          </div>
        ) : null}

        <div className="pt-1">
          <AuthSubmitButton>Create account</AuthSubmitButton>
        </div>
      </form>
    </AuthCard>
  );
}
