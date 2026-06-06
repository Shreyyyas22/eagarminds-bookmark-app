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
    primary: "bg-stone-950 text-white hover:bg-stone-800",
    secondary: "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-70 ${classes[variant]}`}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
