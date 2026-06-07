"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

export function FormSubmitButton({
  children,
  variant = "primary",
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  const classes = {
    primary: "btn-primary h-10 px-4",
    secondary: "btn-secondary",
    danger: "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70",
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${classes[variant]} disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
