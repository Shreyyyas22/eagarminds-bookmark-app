import { createClient } from "@/lib/supabase/server";
import {
  ArrowRight,
  Bookmark,
  Globe2,
  Link2,
  Lock,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const features = [
  {
    icon: Lock,
    title: "Private by default",
    description:
      "Save research, drafts, and personal links on your dashboard. Only you can see them.",
    accent: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Globe2,
    title: "Share with a handle",
    description:
      "Claim a unique @handle and mark selected bookmarks public for one clean profile URL.",
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Fast and simple",
    description:
      "Add a title and URL, toggle public or private, and you're done. No clutter.",
    accent: "bg-amber-50 text-amber-600",
  },
];

const steps = [
  { number: "1", title: "Create your account", description: "Pick a handle and sign up in seconds." },
  { number: "2", title: "Save your links", description: "Add bookmarks from your dashboard anytime." },
  { number: "3", title: "Share what matters", description: "Toggle public on the links you want the world to see." },
];

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <section className="auth-gradient relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(99,102,241,0.15),transparent)]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700">
                <Sparkles className="h-3.5 w-3.5" />
                Personal bookmarks, one profile
              </div>

              <h1 className="mt-6 max-w-xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-stone-950 sm:text-5xl lg:text-[3.25rem]">
                Save useful links. Share the best ones from your handle.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-600 sm:text-lg">
                Keep private research in your dashboard, mark selected links public, and give people
                one profile URL for the list you want them to see.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/signup" className="btn-primary h-12 px-6">
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/login" className="btn-secondary h-12 px-6">
                  Log in
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-6 border-t border-stone-200/80 pt-8">
                <div>
                  <p className="text-2xl font-semibold tabular-nums text-stone-950">@handle</p>
                  <p className="mt-0.5 text-xs text-stone-500">Your public profile URL</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tabular-nums text-stone-950">Free</p>
                  <p className="mt-0.5 text-xs text-stone-500">No credit card needed</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tabular-nums text-stone-950">RLS</p>
                  <p className="mt-0.5 text-xs text-stone-500">Secure by design</p>
                </div>
              </div>
            </div>

            <div className="relative lg:justify-self-end">
              <div className="absolute -inset-4 rounded-3xl bg-indigo-500/10 blur-2xl" />
              <div className="card relative overflow-hidden shadow-elevated">
                <div className="border-b border-stone-100 bg-gradient-to-r from-indigo-50/80 to-white px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-indigo-600">@yourhandle</p>
                      <h2 className="mt-0.5 text-base font-semibold text-stone-950">
                        Public profile
                      </h2>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                      <Share2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 p-4">
                  <div className="flex items-center gap-3 rounded-xl border border-stone-100 bg-stone-50/50 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-200/80 text-xs font-semibold text-stone-600">
                      SR
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-stone-900">
                          Supabase RLS guide
                        </p>
                        <Lock className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-stone-500">Private · dashboard only</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-xs font-semibold text-emerald-700">
                      FD
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-stone-900">
                          Favorite design resources
                        </p>
                        <Globe2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-emerald-700/80">
                        Public · visible on profile
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-semibold text-indigo-700">
                      NC
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-stone-900">
                          Next.js docs
                        </p>
                        <Globe2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-stone-500">nextjs.org</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-100 bg-stone-50/50 px-4 py-3">
                  <p className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Link2 className="h-3.5 w-3.5" />
                    eagerminds.app/@yourhandle
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Features
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
              Everything you need to collect and share links
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-500 sm:text-base">
              A focused bookmark manager — not another bloated read-it-later app.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description, accent }) => (
              <article key={title} className="card p-6 transition hover:border-stone-300 hover:shadow-elevated">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-stone-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200/80 bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              How it works
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
              Up and running in three steps
            </h2>
          </div>

          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map(({ number, title, description }) => (
              <li key={number} className="relative text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-semibold text-white shadow-sm">
                  {number}
                </div>
                <h3 className="mt-4 text-base font-semibold text-stone-950">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-stone-200/80 bg-stone-950 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600">
            <Bookmark className="h-7 w-7 text-white" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Start building your link library
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
            Claim your handle, save your first bookmark, and share the links worth showing off.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="btn-primary h-12 px-6">
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-medium text-white transition hover:bg-white/10"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
