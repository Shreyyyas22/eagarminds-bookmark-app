import { AlertCircle } from "lucide-react";
import Link from "next/link";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthCard({ eyebrow, title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="card p-8 shadow-elevated sm:p-10">
      <div className="lg:hidden">
        <Link href="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          ← EagerMinds
        </Link>
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-indigo-600 lg:mt-0">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-stone-500">{subtitle}</p>
      ) : null}

      <div className="mt-8">{children}</div>

      <div className="mt-8 border-t border-stone-100 pt-6 text-center text-sm text-stone-600">
        {footer}
      </div>
    </div>
  );
}

type AuthErrorProps = {
  message: string;
};

export function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

type FormLabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
};

export function FormLabel({ htmlFor, children, hint }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-sm font-medium text-stone-700">{children}</span>
      {hint ? <span className="mt-0.5 block text-xs text-stone-400">{hint}</span> : null}
    </label>
  );
}
