"use client";

import { deleteBookmark } from "@/actions/bookmarks";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

type DeleteButtonProps = {
  id: string;
  title: string;
};

export function DeleteButton({ id, title }: DeleteButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(`Delete "${title}"?`)) {
          startTransition(async () => {
            await deleteBookmark(id);
          });
        }
      }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-200 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
      aria-label={`Delete ${title}`}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
