"use client";

import { updateBookmark } from "@/actions/bookmarks";
import type { ActionState, Bookmark } from "@/lib/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "./FormSubmitButton";

const initialState: ActionState = {};

type EditBookmarkModalProps = {
  bookmark: Bookmark;
};

export function EditBookmarkModal({ bookmark }: EditBookmarkModalProps) {
  const [open, setOpen] = useState(false);
  const updateAction = updateBookmark.bind(null, bookmark.id);
  const [state, formAction] = useFormState(updateAction, initialState);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-stone-300 text-stone-600 transition hover:bg-stone-50"
        aria-label={`Edit ${bookmark.title}`}
      >
        <Pencil className="h-4 w-4" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-stone-950">Edit bookmark</h2>
                <p className="mt-1 text-sm text-stone-500">Update the title, URL, or visibility.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 text-sm text-stone-500 hover:bg-stone-100"
              >
                Close
              </button>
            </div>

            <form action={formAction} className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-stone-700">Title</span>
                <input
                  name="title"
                  type="text"
                  defaultValue={bookmark.title}
                  maxLength={200}
                  required
                  className="mt-2 h-10 w-full rounded-md border border-stone-300 px-3 text-sm outline-none transition focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-stone-700">URL</span>
                <input
                  name="url"
                  type="url"
                  defaultValue={bookmark.url}
                  required
                  className="mt-2 h-10 w-full rounded-md border border-stone-300 px-3 text-sm outline-none transition focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10"
                />
              </label>

              <label className="flex items-center gap-2 text-sm text-stone-700">
                <input
                  name="is_public"
                  type="checkbox"
                  defaultChecked={bookmark.is_public}
                  className="h-4 w-4 rounded border-stone-300"
                />
                Public bookmark
              </label>

              {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
              {state.success ? <p className="text-sm text-emerald-700">{state.success}</p> : null}

              <div className="flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-10 rounded-md border border-stone-300 px-4 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                >
                  Cancel
                </button>
                <FormSubmitButton>Save changes</FormSubmitButton>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
