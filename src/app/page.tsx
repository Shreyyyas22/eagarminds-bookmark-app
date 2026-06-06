import { createClient } from "@/lib/supabase/server";
import { ArrowRight, Globe2, Lock, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-stone-50 px-6 py-12">
      <section className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1fr_380px] md:items-center">
        <div>
          <p className="text-sm font-medium text-stone-500">Personal bookmarks</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold tracking-tight text-stone-950">
            Save useful links and share the public ones from your handle.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-600">
            Keep private research in your dashboard, mark selected links public, and give people one profile URL for the list you want them to see.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-stone-950 px-5 text-sm font-medium text-white hover:bg-stone-800"
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-md border border-stone-300 bg-white px-5 text-sm font-medium text-stone-800 hover:bg-stone-100"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <p className="text-sm font-medium text-stone-500">@yourhandle</p>
              <h2 className="mt-1 text-lg font-semibold text-stone-950">Bookmark list</h2>
            </div>
            <Plus className="h-5 w-5 text-stone-400" />
          </div>
          <div className="mt-4 space-y-3">
            <div className="rounded-md border border-stone-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-stone-900">Supabase RLS guide</span>
                <Lock className="h-4 w-4 text-stone-400" />
              </div>
              <p className="mt-2 truncate text-sm text-stone-500">Private dashboard link</p>
            </div>
            <div className="rounded-md border border-stone-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-stone-900">Favorite design resources</span>
                <Globe2 className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="mt-2 truncate text-sm text-stone-500">Visible on public profile</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
