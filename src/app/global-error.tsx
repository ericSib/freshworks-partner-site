"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex items-center justify-center bg-deep p-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-surface mb-4">
            Erreur inattendue
          </h1>
          <p className="text-slate-400 mb-8">
            Une erreur critique est survenue. Veuillez rafraichir la page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-accent text-deep rounded-xl font-semibold hover:bg-accent-light transition-colors"
          >
            Rafraichir
          </button>
        </div>
      </body>
    </html>
  );
}
