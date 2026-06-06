"use server";

import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/types";
import { bookmarkSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

function parseBookmark(formData: FormData) {
  return bookmarkSchema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
    is_public: formData.get("is_public") === "on",
  });
}

export async function addBookmark(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseBookmark(formData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the bookmark" };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    ...parsed.data,
  });

  if (error) {
    return { error: "Could not add bookmark" };
  }

  revalidatePath("/dashboard");
  return { success: "Bookmark added" };
}

export async function updateBookmark(
  id: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseBookmark(formData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the bookmark" };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("bookmarks")
    .update({
      ...parsed.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Could not update bookmark" };
  }

  revalidatePath("/dashboard");
  return { success: "Bookmark updated" };
}

export async function deleteBookmark(id: string): Promise<ActionState> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Could not delete bookmark" };
  }

  revalidatePath("/dashboard");
  return { success: "Bookmark deleted" };
}
