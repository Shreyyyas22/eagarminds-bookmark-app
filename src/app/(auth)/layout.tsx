import { BookMarked, Globe2, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-gradient min-h-[calc(100vh-4rem)] lg:grid lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden border-r border-stone-200/60 bg-stone-950 px-12 py-16 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.15),transparent_50%)]" />

        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2.5 text-white/90 transition hover:text-white">
            <BookMarked className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-tight">EagerMinds</span>
          </Link>
        </div>

        <div className="relative space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-200">
              <Sparkles className="h-3.5 w-3.5" />
              Your personal link library
            </div>
            <h2 className="mt-6 max-w-sm text-3xl font-semibold leading-tight tracking-tight text-white">
              Save links privately. Share the best ones publicly.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              Claim a unique handle, curate your bookmarks, and give people one clean profile URL for the links you want to share.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20">
                <Lock className="h-4 w-4 text-indigo-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Private by default</p>
                <p className="mt-0.5 text-xs leading-relaxed text-stone-400">
                  Research, drafts, and personal links stay on your dashboard.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
                <Globe2 className="h-4 w-4 text-emerald-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Share with a handle</p>
                <p className="mt-0.5 text-xs leading-relaxed text-stone-400">
                  Mark any bookmark public and it appears on your profile page.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-stone-500">
          Built for people who collect more links than they can remember.
        </p>
      </aside>

      <div className="flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
