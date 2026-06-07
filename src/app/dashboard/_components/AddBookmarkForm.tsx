"use client";

import { addBookmark } from "@/actions/bookmarks";
import type { ActionState } from "@/lib/types";
import { CheckCircle2, Globe2, Link2, Plus, Type } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { FormSubmitButton } from "./FormSubmitButton";

const initialState: ActionState = {};

export function AddBookmarkForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(addBookmark, initialState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="card overflow-hidden shadow-elevated">
      <div className="border-b border-stone-100 bg-gradient-to-r from-indigo-50/80 to-white px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-stone-950">Add a bookmark</h2>
            <p className="text-sm text-stone-500">Paste a URL and give it a title.</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-stone-700">
              Title
            </label>
            <div className="relative mt-2">
              <Type className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                id="title"
                name="title"
                type="text"
                maxLength={200}
                required
                placeholder="My favourite article"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="url" className="text-sm font-medium text-stone-700">
              URL
            </label>
            <div className="relative mt-2">
              <Link2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                id="url"
                name="url"
                type="url"
                placeholder="https://example.com"
                required
                className="input-field pl-10"
              />
            </div>
          </div>
        </div>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3.5 transition hover:border-stone-300">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
              <Globe2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <span className="text-sm font-medium text-stone-800">Make public</span>
              <p className="text-xs text-stone-500">Visible on your profile page</p>
            </div>
          </div>
          <input
            name="is_public"
            type="checkbox"
            className="h-5 w-5 rounded-md border-stone-300 text-indigo-600 focus:ring-indigo-500/20"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <FormSubmitButton>Add link</FormSubmitButton>
          {state.error ? (
            <p className="text-sm font-medium text-red-600">{state.error}</p>
          ) : null}
          {state.success ? (
            <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              {state.success}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
