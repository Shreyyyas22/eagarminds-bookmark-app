import type { Bookmark } from "@/lib/types";
import { ExternalLink, Globe2, Lock } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import { EditBookmarkModal } from "./EditBookmarkModal";

type BookmarkCardProps = {
  bookmark: Bookmark;
};

function getInitials(title: string) {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const host = new URL(bookmark.url).host.replace(/^www\./, "");

  return (
    <article className="group card p-4 transition hover:border-stone-300 hover:shadow-elevated sm:p-5">
      <div className="flex items-start gap-4">
        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
            bookmark.is_public
              ? "bg-emerald-50 text-emerald-700"
              : "bg-stone-100 text-stone-600",
          ].join(" ")}
        >
          {getInitials(bookmark.title)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-stone-950">{bookmark.title}</h3>
            <span
              className={[
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                bookmark.is_public
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-stone-100 text-stone-600",
              ].join(" ")}
            >
              {bookmark.is_public ? (
                <Globe2 className="h-3 w-3" />
              ) : (
                <Lock className="h-3 w-3" />
              )}
              {bookmark.is_public ? "Public" : "Private"}
            </span>
          </div>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="mt-1.5 inline-flex max-w-full items-center gap-1.5 truncate text-sm text-stone-500 transition group-hover:text-indigo-600"
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{host}</span>
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 opacity-100 sm:opacity-70 sm:transition sm:group-hover:opacity-100">
          <EditBookmarkModal bookmark={bookmark} />
          <DeleteButton id={bookmark.id} title={bookmark.title} />
        </div>
      </div>
    </article>
  );
}
