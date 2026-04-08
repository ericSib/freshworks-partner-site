"use client";

import { Link } from "@/i18n/navigation";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-surface mb-3">
          Oups, quelque chose a mal tourné
        </h2>
        <p className="text-slate-400 mb-8">
          Une erreur est survenue. Vous pouvez réessayer ou revenir à
          l&apos;accueil.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-accent text-deep rounded-xl font-semibold hover:bg-accent-light transition-colors shadow-[var(--shadow-accent-md)]"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-white/10 text-surface rounded-xl font-semibold hover:bg-white/5 transition-colors"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
