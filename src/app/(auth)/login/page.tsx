"use client";

import { login } from "@/actions/auth";
import { AuthSubmitButton } from "@/components/AuthSubmitButton";
import type { ActionState } from "@/lib/types";
import { useFormState } from "react-dom";

const initialState: ActionState = {};

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <main className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-md flex-col justify-center px-6 py-12">
      <div>
        <p className="text-sm font-medium text-stone-500">Welcome back</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
          Log in to EagerMinds
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
            autoComplete="current-password"
            required
            className="mt-2 h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10"
          />
        </label>

        {state.error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </p>
        ) : null}

        <AuthSubmitButton>Log in</AuthSubmitButton>
      </form>

      <p className="mt-6 text-sm text-stone-600">
        Need an account?{" "}
        <a href="/signup" className="font-medium text-stone-950 underline">
          Sign up
        </a>
      </p>
    </main>
  );
}
