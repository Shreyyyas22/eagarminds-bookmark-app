import { logout } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";
import type { Bookmark, Profile } from "@/lib/types";
import { LogOut } from "lucide-react";
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
    <main className="min-h-screen bg-stone-50 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-4 border-b border-stone-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
              {profile ? `@${profile.handle}` : user.email}
            </h1>
            {profile ? (
              <a href={`/@${profile.handle}`} className="mt-2 inline-block text-sm text-stone-600 underline">
                View public profile
              </a>
            ) : null}
          </div>

          <form action={logout}>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-4 text-sm font-medium text-stone-700 transition hover:bg-stone-100">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </form>
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
