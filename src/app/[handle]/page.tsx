import { createClient } from "@/lib/supabase/server";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

type PublicProfilePageProps = {
  params: {
    handle: string;
  };
};

type PublicBookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string | null;
};

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const handle = decodeURIComponent(params.handle).replace(/^@/, "").toLowerCase();
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, handle")
    .eq("handle", handle)
    .single<{ id: string; handle: string }>();

  if (!profile) {
    notFound();
  }

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("id, title, url, created_at")
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .returns<PublicBookmark[]>();

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <header className="border-b border-stone-200 pb-6">
          <a href="/" className="text-sm font-medium text-stone-500 hover:text-stone-950">
            EagerMinds Bookmarks
          </a>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950">
            @{profile.handle}
          </h1>
          <p className="mt-3 text-sm text-stone-600">
            Public bookmarks shared by this user.
          </p>
        </header>

        <section className="mt-6 space-y-3">
          {bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <a
                key={bookmark.id}
                href={bookmark.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:border-stone-300 hover:shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-stone-950">
                      {bookmark.title}
                    </h2>
                    <p className="mt-2 truncate text-sm text-stone-500">
                      {new URL(bookmark.url).host}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-stone-400" />
                </div>
              </a>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center">
              <h2 className="text-base font-semibold text-stone-950">No public bookmarks yet</h2>
              <p className="mt-2 text-sm text-stone-500">
                This profile does not have any shared links.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
