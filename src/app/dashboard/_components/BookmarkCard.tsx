import type { Bookmark } from "@/lib/types";
import { ExternalLink, Globe2, Lock } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import { EditBookmarkModal } from "./EditBookmarkModal";

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const host = new URL(bookmark.url).host;

  return (
    <article className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-stone-950">{bookmark.title}</h3>
            <span className="inline-flex items-center gap-1 rounded-md border border-stone-200 px-2 py-1 text-xs font-medium text-stone-600">
              {bookmark.is_public ? <Globe2 className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              {bookmark.is_public ? "Public" : "Private"}
            </span>
          </div>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex max-w-full items-center gap-2 truncate text-sm text-stone-600 hover:text-stone-950"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            <span className="truncate">{host}</span>
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <EditBookmarkModal bookmark={bookmark} />
          <DeleteButton id={bookmark.id} title={bookmark.title} />
        </div>
      </div>
    </article>
  );
}
