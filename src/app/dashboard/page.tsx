import { createClient } from "@/lib/supabase/server";
import type { Bookmark, Profile } from "@/lib/types";
import { ExternalLink, Globe2, Link2, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
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

  const list = bookmarks ?? [];
  const publicCount = list.filter((b) => b.is_public).length;
  const privateCount = list.length - publicCount;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-stone-50">
      <div className="border-b border-stone-200/80 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                <Sparkles className="h-3.5 w-3.5" />
                Dashboard
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                {profile ? (
                  <>
                    <span className="text-stone-400">@</span>
                    {profile.handle}
                  </>
                ) : (
                  "Your bookmarks"
                )}
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone-500">
                Save links privately, mark the best ones public, and share them from your profile.
              </p>
            </div>

            {profile ? (
              <Link
                href={`/@${profile.handle}`}
                className="btn-secondary shrink-0 self-start"
              >
                <ExternalLink className="h-4 w-4" />
                View public profile
              </Link>
            ) : null}
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-3 sm:max-w-lg sm:gap-4">
            <div className="card px-4 py-3.5">
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <Link2 className="h-3.5 w-3.5" />
                Total
              </dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-stone-950">
                {list.length}
              </dd>
            </div>
            <div className="card px-4 py-3.5">
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <Globe2 className="h-3.5 w-3.5 text-emerald-600" />
                Public
              </dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-emerald-700">
                {publicCount}
              </dd>
            </div>
            <div className="card px-4 py-3.5">
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <Lock className="h-3.5 w-3.5" />
                Private
              </dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-stone-950">
                {privateCount}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <section>
          <AddBookmarkForm />
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-950">Your bookmarks</h2>
            {list.length > 0 ? (
              <span className="text-xs text-stone-400">
                {list.length} {list.length === 1 ? "link" : "links"}
              </span>
            ) : null}
          </div>
          <BookmarkList bookmarks={list} />
        </section>
      </div>
    </main>
  );
}
