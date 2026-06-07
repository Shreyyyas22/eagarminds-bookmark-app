"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type HandleStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export function HandleAvailability() {
  const [status, setStatus] = useState<HandleStatus>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>('input[name="handle"]');
    if (!input) {
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    const onInput = () => {
      window.clearTimeout(timeout);
      const handle = input.value.trim().toLowerCase();

      if (!handle) {
        setStatus("idle");
        setMessage("");
        return;
      }

      setStatus("checking");
      setMessage("Checking handle");

      timeout = setTimeout(async () => {
        const response = await fetch(
          `/api/check-handle?handle=${encodeURIComponent(handle)}`,
        );
        const data = (await response.json()) as {
          available: boolean;
          message?: string;
        };

        if (data.message) {
          setStatus("invalid");
          setMessage(data.message);
          return;
        }

        setStatus(data.available ? "available" : "taken");
        setMessage(data.available ? "Handle is available" : "Handle is taken");
      }, 350);
    };

    input.addEventListener("input", onInput);
    return () => {
      window.clearTimeout(timeout);
      input.removeEventListener("input", onInput);
    };
  }, []);

  if (status === "idle") {
    return null;
  }

  const Icon =
    status === "checking" ? Loader2 : status === "available" ? CheckCircle2 : XCircle;

  return (
    <p
      className={[
        "mt-2 flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium",
        status === "available"
          ? "bg-emerald-50 text-emerald-700"
          : status === "checking"
            ? "bg-stone-50 text-stone-500"
            : "bg-red-50 text-red-600",
      ].join(" ")}
    >
      <Icon className={status === "checking" ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"} />
      {message}
    </p>
  );
}
