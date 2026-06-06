"use server";

import { sendWelcomeEmail } from "@/lib/email";
import { createAdminClient, createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/types";
import { loginSchema, signUpSchema } from "@/lib/validations";
import { redirect } from "next/navigation";

export async function signUp(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    handle: formData.get("handle"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details" };
  }

  const { email, password, handle } = parsed.data;
  const supabase = createClient();

  const { data: existingHandle } = await supabase
    .from("profiles")
    .select("handle")
    .eq("handle", handle)
    .maybeSingle();

  if (existingHandle) {
    return { error: "Handle already taken" };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${appUrl}/auth/callback`,
    },
  });

  if (error || !data.user) {
    return { error: "Could not create account" };
  }

  const admin = createAdminClient();
  const { error: profileError } = await admin
    .from("profiles")
    .insert({ id: data.user.id, handle });

  if (profileError) {
    await admin.auth.admin.deleteUser(data.user.id);
    return { error: "Handle already taken" };
  }

  await sendWelcomeEmail(email, handle);
  redirect("/dashboard");
}

export async function login(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details" };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: "Invalid email or password" };
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
