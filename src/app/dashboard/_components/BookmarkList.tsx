import type { Bookmark } from "@/lib/types";
import { BookmarkCard } from "./BookmarkCard";

type BookmarkListProps = {
  bookmarks: Bookmark[];
};

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center">
        <h2 className="text-base font-semibold text-stone-950">No bookmarks yet</h2>
        <p className="mt-2 text-sm text-stone-500">Add your first link to start building your list.</p>
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
