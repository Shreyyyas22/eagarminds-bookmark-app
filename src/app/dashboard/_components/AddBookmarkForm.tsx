"use client";

import { addBookmark } from "@/actions/bookmarks";
import type { ActionState } from "@/lib/types";
import { Plus } from "lucide-react";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "./FormSubmitButton";

const initialState: ActionState = {};

export function AddBookmarkForm() {
  const [state, formAction] = useFormState(addBookmark, initialState);

  return (
    <form action={formAction} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Plus className="h-5 w-5 text-stone-500" />
        <h2 className="text-base font-semibold text-stone-950">Add bookmark</h2>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1.4fr_auto] md:items-end">
        <label className="block">
          <span className="text-sm font-medium text-stone-700">Title</span>
          <input
            name="title"
            type="text"
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
            placeholder="https://example.com"
            required
            className="mt-2 h-10 w-full rounded-md border border-stone-300 px-3 text-sm outline-none transition focus:border-stone-950 focus:ring-2 focus:ring-stone-950/10"
          />
        </label>

        <label className="flex h-10 items-center gap-2 rounded-md border border-stone-300 px-3 text-sm text-stone-700">
          <input name="is_public" type="checkbox" className="h-4 w-4 rounded border-stone-300" />
          Public
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <FormSubmitButton>Add link</FormSubmitButton>
        {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
        {state.success ? <p className="text-sm text-emerald-700">{state.success}</p> : null}
      </div>
    </form>
  );
}
