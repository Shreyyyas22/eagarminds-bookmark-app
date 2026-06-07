"use client";

import { updateBookmark } from "@/actions/bookmarks";
import type { ActionState, Bookmark } from "@/lib/types";
import { Globe2, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "./FormSubmitButton";

const initialState: ActionState = {};

type EditBookmarkModalProps = {
  bookmark: Bookmark;
};

type EditBookmarkFormProps = {
  bookmark: Bookmark;
  onClose: () => void;
};

function EditBookmarkForm({ bookmark, onClose }: EditBookmarkFormProps) {
  const updateAction = updateBookmark.bind(null, bookmark.id);
  const [state, formAction] = useFormState(updateAction, initialState);

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  return (
    <>
      <div className="flex items-start justify-between gap-4 border-b border-stone-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-stone-950">Edit bookmark</h2>
          <p className="mt-1 text-sm text-stone-500">Update the title, URL, or visibility.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form action={formAction} className="space-y-5 px-6 py-5">
        <div>
          <label htmlFor={`title-${bookmark.id}`} className="text-sm font-medium text-stone-700">
            Title
          </label>
          <input
            id={`title-${bookmark.id}`}
            name="title"
            type="text"
            defaultValue={bookmark.title}
            maxLength={200}
            required
            className="input-field mt-2"
          />
        </div>

        <div>
          <label htmlFor={`url-${bookmark.id}`} className="text-sm font-medium text-stone-700">
            URL
          </label>
          <input
            id={`url-${bookmark.id}`}
            name="url"
            type="url"
            defaultValue={bookmark.url}
            required
            className="input-field mt-2"
          />
        </div>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <Globe2 className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-stone-800">Public bookmark</span>
          </div>
          <input
            name="is_public"
            type="checkbox"
            defaultChecked={bookmark.is_public}
            className="h-5 w-5 rounded-md border-stone-300 text-indigo-600 focus:ring-indigo-500/20"
          />
        </label>

        {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

        <div className="flex flex-wrap justify-end gap-3 border-t border-stone-100 pt-5">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <FormSubmitButton>Save changes</FormSubmitButton>
        </div>
      </form>
    </>
  );
}

export function EditBookmarkModal({ bookmark }: EditBookmarkModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:border-stone-300 hover:bg-stone-50"
        aria-label={`Edit ${bookmark.title}`}
      >
        <Pencil className="h-4 w-4" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/50 p-4 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="card w-full max-w-lg shadow-elevated sm:p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <EditBookmarkForm bookmark={bookmark} onClose={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
