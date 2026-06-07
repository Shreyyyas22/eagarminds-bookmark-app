import { logout } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { BookMarked, LogOut } from "lucide-react";
import Link from "next/link";

export async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("handle")
        .eq("id", user.id)
        .maybeSingle<{ handle: string }>()
    : { data: null };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold text-stone-950">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <BookMarked className="h-4 w-4" />
          </div>
          EagerMinds
        </Link>

        <nav className="flex items-center gap-1.5 text-sm">
          {user ? (
            <>
              {profile ? (
                <Link
                  href={`/@${profile.handle}`}
                  className="hidden rounded-lg px-3 py-2 font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-950 sm:inline"
                >
                  @{profile.handle}
                </Link>
              ) : null}
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 font-medium text-stone-700 transition hover:bg-stone-100"
              >
                Dashboard
              </Link>
              <form action={logout}>
                <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-stone-200 px-3 font-medium text-stone-700 shadow-sm transition hover:bg-stone-50">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 font-medium text-stone-700 transition hover:bg-stone-100"
              >
                Login
              </Link>
              <Link href="/signup" className="btn-primary h-9 px-4 text-sm">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
