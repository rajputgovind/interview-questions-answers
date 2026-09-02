import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-slate-400 mb-8">Page not found</p>
      <Link
        href="/"
        className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
