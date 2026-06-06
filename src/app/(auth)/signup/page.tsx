"use client";

import { signUp } from "@/actions/auth";
import { AuthSubmitButton } from "@/components/AuthSubmitButton";
import { HandleAvailability } from "@/components/HandleAvailability";
import type { ActionState } from "@/lib/types";
import { useFormState } from "react-dom";

const initialState: ActionState = {};

export default function SignUpPage() {
  const [state, formAction] = useFormState(signUp, initialState);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-md flex-col justify-center px-6 py-12">
      <div>
        <p className="text-sm font-medium text-stone-500">Start saving links</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
          Create your account
        </h1>
      </div>

      <form action={formAction} className="mt-8 space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-stone-700">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-stone-700">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            className="mt-2 h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-stone-700">Handle</span>
          <div className="mt-2 flex h-11 items-center rounded-md border border-stone-300 bg-white px-3 transition focus-within:border-stone-950 focus-within:ring-2 focus-within:ring-stone-950/10">
            <span className="text-sm text-stone-400">@</span>
            <input
              name="handle"
              type="text"
              autoComplete="username"
              minLength={3}
              maxLength={20}
              required
              className="h-full min-w-0 flex-1 bg-transparent pl-1 text-sm outline-none"
            />
          </div>
          <HandleAvailability />
        </label>

        {state.error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </p>
        ) : null}

        <AuthSubmitButton>Create account</AuthSubmitButton>
      </form>

      <p className="mt-6 text-sm text-stone-600">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-stone-950 underline">
          Log in
        </a>
      </p>
    </main>
  );
}
