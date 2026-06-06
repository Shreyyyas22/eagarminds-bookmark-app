import { createClient } from "@/lib/supabase/server";
import type { Bookmark, Profile } from "@/lib/types";
import { redirect } from "next/navigation";
import { AddBookmarkForm } from "./_components/AddBookmarkForm";
import { BookmarkList } from "./_components/BookmarkList";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { data: bookmarks }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, handle, created_at")
      .eq("id", user.id)
      .single<Profile>(),
    supabase
      .from("bookmarks")
      .select("id, user_id, title, url, is_public, created_at, updated_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .returns<Bookmark[]>(),
  ]);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-stone-200 pb-6">
          <p className="text-sm font-medium text-stone-500">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
            {profile ? `@${profile.handle}` : user.email}
          </h1>
          {profile ? (
            <a href={`/@${profile.handle}`} className="mt-2 inline-block text-sm text-stone-600 underline">
              View public profile
            </a>
          ) : null}
        </header>

        <section className="mt-8">
          <AddBookmarkForm />
        </section>

        <section className="mt-6">
          <BookmarkList bookmarks={bookmarks ?? []} />
        </section>
      </div>
    </main>
  );
}
