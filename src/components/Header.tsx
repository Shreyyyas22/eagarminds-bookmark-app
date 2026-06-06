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
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-stone-950">
          <BookMarked className="h-5 w-5" />
          EagerMinds
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          {user ? (
            <>
              {profile ? (
                <Link href={`/@${profile.handle}`} className="hidden text-stone-600 hover:text-stone-950 sm:inline">
                  @{profile.handle}
                </Link>
              ) : null}
              <Link
                href="/dashboard"
                className="rounded-md px-3 py-2 font-medium text-stone-700 hover:bg-stone-100"
              >
                Dashboard
              </Link>
              <form action={logout}>
                <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-stone-300 px-3 font-medium text-stone-700 hover:bg-stone-100">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-md px-3 py-2 font-medium text-stone-700 hover:bg-stone-100">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-stone-950 px-3 py-2 font-medium text-white hover:bg-stone-800"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
