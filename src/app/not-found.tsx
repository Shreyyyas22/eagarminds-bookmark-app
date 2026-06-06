import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-stone-50 px-6 py-12">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-stone-500">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          This profile or page does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-stone-950 px-4 text-sm font-medium text-white hover:bg-stone-800"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
