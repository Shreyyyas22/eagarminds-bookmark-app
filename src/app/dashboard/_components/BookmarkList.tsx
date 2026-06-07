import type { Bookmark } from "@/lib/types";
import { BookmarkPlus } from "lucide-react";
import { BookmarkCard } from "./BookmarkCard";

type BookmarkListProps = {
  bookmarks: Bookmark[];
};

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center border-dashed px-8 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
          <BookmarkPlus className="h-7 w-7 text-indigo-500" />
        </div>
        <h2 className="mt-5 text-lg font-semibold text-stone-950">No bookmarks yet</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-500">
          Add your first link above. Keep it private for research, or toggle public to show it on your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
